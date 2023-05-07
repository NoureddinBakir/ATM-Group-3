import styles from "../styles/Home.module.css";
import Head from "next/head";
import React from "react";
import {useRouter} from "next/router";
import Button from "../components/button";

// TODO reference API & update balance function

export default function ATMDeposit() {
    const router = useRouter();

    function updateBal() {
        // Get current balance of Checkings from API
        // Add document.getElementById("dollarInput").value to curBal
        // Update balance in API
        // After, router.push("/atmexit");

        // newBal = data.checkings_bal + document.getElementById("dollarInput").value;
        // // Update balance in API
        // router.push("/atmexit");
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
                                router.push("/atmexit");
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