import styles from "../styles/Home.module.css";
import Head from "next/head";
import React, {useState} from "react";
import Button from "../components/button";
import { useRouter } from "next/router";
import {useUser} from "@supabase/auth-helpers-react";

// TODO reference API & withdraw logic
// TODO create error page

export default function ATMWithdraw() {
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

    function validateBal(amount) {
        if(accBal - amount >= 0) {
            // Update balance in API
            updateDB(accBal - amount)
        }
        else {
            alert("You don't have the proper funds to withdraw this amount! Click esc to continue.");
        }
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
                        <h2 className={styles.sectionTitle}>Comes From Checkings</h2>
                        <h2 className={styles.sectionTitle}>Select Amount</h2>
                        <div>
                            <Button type={"primary"} text={"$20"} onClick={() => {
                                validateBal(20);
                            }}/>
                            <Button type={"primary"} text={"$40"} onClick={() => {
                                validateBal(40);
                            }}/>
                            <Button type={"primary"} text={"$60"} onClick={() => {
                                validateBal(60);
                            }}/>
                        </div>
                        <div>
                            <Button type={"primary"} text={"$80"} onClick={() => {
                                validateBal(80);
                            }}/>
                            <Button type={"primary"} text={"$100"} onClick={() => {
                                validateBal(100);
                            }}/>
                            <Button type={"primary"} text={"Cancel"} onClick={() => {
                                router.push("/atmhome");
                            }}/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}