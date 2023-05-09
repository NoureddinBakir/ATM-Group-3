import styles from "../styles/Home.module.css";
import {useUser} from "@supabase/auth-helpers-react";
import React, {useState} from "react";
import { v4 as uuidv4 } from "uuid";
import {createClient} from "@supabase/supabase-js";
import Head from "next/head";
import Button from "../components/button";

export default function Deposit() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const [fileSelected, setFileSelected] = useState(false);
    const [file, setFile] = useState([]);
    const [check, setCheck] = useState(null);
    const [oldCheckURL, setOldCheckURL] = useState(null);
    const user = useUser();

    const [data, setData] = useState(null);
    const [dataRefresh, setDataRefresh] = useState(true);
    // Fetch the user data, can be copied to each page that accesses user data
    const fetchData = async () => {
        let url = "/api/user/?id=" + user.id;
        let userData = await fetch(url)
        return userData.json();
    };

    // Changed bandaid data format
    // Declare hook at beginning of function, and check if null. Then do data load once we have a valid user.
    if(dataRefresh && user != null) {
        const refreshData = async () => {
            fetchData().then(result => {
                setData(result[0]);
            }).catch(error => {
                console.error(error);
            });
            setDataRefresh(false);
        };
        refreshData();
    }

    let oldCheck = null;
    let checkings_bal = null;
    if(data) {
        oldCheck = data.check_url;
        checkings_bal = data.checkings_bal;
    }

    const handleSubmit = async (e) => {
        if(!fileSelected) {
            alert("Please upload a check! Click esc to continue.");
            return;
        }
        if(document.getElementById("checkAmount").value <= 0) {
            alert("Please enter a valid amount! Click esc to continue.");
            return;
        }

        e.preventDefault();
        const filename = `${uuidv4()}-${file.name}`;
        const { data, error} = await supabase.storage
            .from("checks")
            .upload(filename, file, {
                cacheControl: "3600",
                upsert: false,
            });

        let filepath = null;
        if(error) {
            console.log(error);
            return;
        }
        else {
            filepath = data.path;
            updateImg(filepath);
        }

        let new_bal = parseFloat(document.getElementById("checkAmount").value) + parseFloat(checkings_bal);

        let url = "/api/user/?id=" + user.id;
        let userData = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                checkings_bal: new_bal,
                check_url: filepath,
            }),
        });
    };

    const handleFileSelected = (e) => {
        setFileSelected(true);
        setFile(e.target.files[0]);
    };

    function updateImg(filepath) {
        const { data } = supabase.storage
            .from('checks')
            .getPublicUrl(`${filepath}`);
        setCheck(data.publicUrl);
    }

    function loadOldCheck() {
        const { data } = supabase.storage
            .from('checks')
            .getPublicUrl(`${oldCheck}`);
        setOldCheckURL(data.publicUrl);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>BBB Deposit Check</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>
            <form>
                <text><br />Enter amount on check: $</text>
                <input type="number" id="checkAmount"/>
                <text><br /><br /></text>
            </form>
            <form onSubmit={handleSubmit}>
                <input type={"file"} name={"image"} onChange={handleFileSelected}/>
                <button type={"submit"}>Upload image</button>
                <div>
                    {check ? (
                        <img
                            src={check}
                            alt="Uploaded Check"
                            className="avatar image"
                            style={{ height: 200, width: 500 }}
                        />
                    ) : (
                        <div className="uploaded check no-image" style={{ height: 200, width: 800 }} />
                    )}
                </div>
            </form>
            <div>
                <Button type={"primary"} text={"Show Most Recent Check"} onClick={() => {
                    loadOldCheck();
                }}/>
            </div>
            <div>
                {oldCheckURL ? (
                    <img
                        src={oldCheckURL}
                        alt="No previous check found!"
                        className="avatar image"
                        style={{ height: 200, width: 500 }}
                    />
                ) : (
                    <div className="old check no-image" style={{ height: 200, width: 800 }} />
                )}
            </div>
        </div>
        )
}