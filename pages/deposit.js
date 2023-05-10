import styles from "../styles/Home.module.css";
import {useUser} from "@supabase/auth-helpers-react";
import React, {useState} from "react";
import { v4 as uuidv4 } from "uuid";
import {createClient} from "@supabase/supabase-js";
import Head from "next/head";
import Button from "../components/button";
import Index from "./index";
import {Dropdown} from "@nextui-org/react";

export default function Deposit() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const [fileSelected, setFileSelected] = useState(false);
    const [file, setFile] = useState([]);
    const [check, setCheck] = useState(null);
    const [oldCheckURL, setOldCheckURL] = useState(null);
    const user = useUser();

    const [userData, setUserData] = useState(null);
    const [userDataRefresh, setUserDataRefresh] = useState(true);

    const [data, setData] = useState(null);
    const [dataRefresh, setDataRefresh] = useState(true);

    const [selected, setSelected] = useState(new Set(["Choose an Account"]));
    const selectedValue = React.useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );

    // Fetch the user accounts
    const fetchData = async () => {
        let url = "/api/user/?id=" + user.id;
        let userData = await fetch(url)
        return userData.json();
    };

    // Fetch user data
    const fetchUserData = async () => {
        let url = "/api/userData/?id=" + user.id;
        let userData = await fetch(url)
        return userData.json();
    }

    if(useUser() == null) {
        return <Index/>;
    }

    // Refresh user accounts
    if(dataRefresh && user != null) {
        const refreshData = async () => {
            fetchData().then(result => {
                setData(result);
            }).catch(error => {
                console.error(error);
            });
            setDataRefresh(false);
        };
        refreshData();
    }

    // Refresh user data
    if(userDataRefresh && user != null) {
        const refreshUserData = async () => {
            fetchUserData().then(result => {
                setUserData(result[0]);
            }).catch(error => {
                console.error(error);
            });
            setUserDataRefresh(false);
        }
        refreshUserData();
    }

    // Initialize accounts
    let dropdownAccounts = [];
    if(data) {
        data.forEach((account) => {
            const formattedID = account.id.toString().padStart(4, '0');
            dropdownAccounts.push({
                key: `${account.type} Account (${formattedID})`,
                name: `${account.type} (${formattedID})`,
                apiKey: account.id,
                apiBal: account.balance,
            })
        })
    }

    // Initialize user data
    let oldCheck = null;
    if(userData) {
        oldCheck = userData.check_url;
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

        // Search the set for the proper account
        const foundAccount = dropdownAccounts.find((row) => row.key.includes(selectedValue));
        console.log(foundAccount);

        let new_bal = parseFloat(document.getElementById("checkAmount").value) + parseFloat(foundAccount.apiBal);

        // Update userData with the new check url
        let url = "/api/userData/?id=" + user.id;
        let userData = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                check_url: filepath,
            }),
        });

        // Update account balance with the new balance
        let accUrl = "/api/user/?id=" + foundAccount.apiKey;
        let updateBal = await fetch(accUrl, {
            // Update the user's balance on the corresponding account
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                balance: new_bal.toFixed(2),
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
            <Dropdown>
                <Dropdown.Button flat style={{zIndex: "10"}}>
                    {selectedValue}
                </Dropdown.Button>
                <Dropdown.Menu
                    aria-label="Accounts"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selected}
                    onSelectionChange={setSelected}
                    items={dropdownAccounts}
                >
                    {(item) => (
                        <Dropdown.Item key={item.key}>
                            {item.name}
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
            <form>
                <text><br />Enter amount on check: $</text>
                <input type="number" id="checkAmount"/>
                <text><br /><br /></text>
            </form>
            <form onSubmit={handleSubmit}>
                <input type={"file"} name={"image"} onChange={handleFileSelected}/>
                <button type={"submit"}>Upload Check</button>
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