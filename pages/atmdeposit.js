import styles from "../styles/Home.module.css";
import Head from "next/head";
import React, {useState} from "react";
import {useRouter} from "next/router";
import Button from "../components/button";
import {useUser} from "@supabase/auth-helpers-react";

// TODO reference API & update balance function

export default function ATMDeposit() {
    const router = useRouter();
    const user = useUser().id;
    const [data, setData] = useState(null);
    const [dataRefresh, setDataRefresh] = useState(true);

    // Fetch the user data, can be copied to each page that accesses user data
    const fetchData = async () => {
        let user = useUser().id;
        let url = "/api/user/?id=" + user;
        let userData = await fetch(url)
        return userData.json();
    };


    // Forces a data refresh only a few times; boolean can be changed when needed.
    // Explanation: Without this, the website would constantly call the API every time the page is rendered.
    // This is very problematic as it causes thousands of API calls, and may have the potential to slow down
    // the website.
    if(dataRefresh) {
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

    let accBal = null;
    if(data) {
        accBal = data.checkings_bal;
    }

    async function updateDB(newBal) {
        let url = "/api/user/?id=" + user;

        let userData = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                checkings_bal: newBal,
            }),
        });

        if (userData.ok) {
            // Request was successful, send to home page
            router.push('/atmexit');
        }
    }

    function updateBal(dollarInput) {
        let newBal = accBal.toFixed(2) + parseInt(dollarInput);
        updateDB(newBal.toFixed(2)).then(res => router.push('/atmexit'));
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>BBB ATM</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>

            <div className={styles.pageContainer}>
                <div className={styles.paddingCard}>
                    <div className={styles.contentCard}>
                        <h2 className={styles.sectionTitle}>Input Bills, Specify Amount, Click Done</h2>
                        <div>
                            <label>
                                <input name="dollarInput" id="dollarInput" className={styles.inputUnderlined} placeholder={"Enter Amount"}/>
                            </label>
                            <Button type={"primary"} text={"Done"} onClick={() => {
                                if(document.getElementById("dollarInput").value > 0) {
                                    updateBal(document.getElementById("dollarInput").value);
                                }
                                else {
                                    alert("Please enter a valid amount! Press esc to continue.");
                                }
                            }}/>
                            <div>
                                <Button type={"primary"} text={"Cancel"} onClick={() => {
                                    router.push("/atmhome");
                                }}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}