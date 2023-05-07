import styles from "../styles/Home.module.css";
import Head from "next/head";
import React from "react";
import Button from "../components/button";
import {useRouter} from "next/router";

// TODO reference API & reflect on page

export default function ATMBalance() {
    let router = useRouter();

    let checkBal = 0;
    let saveBal = 0;

    // Implement API call and update the balances, useState hooks?
    // Show account nums as well?



    return (
        <div className={styles.container}>
            <Head>
                <title>BBB ATM</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>
            <div className={styles.pageContainer}>
                <div className={styles.paddingCard}>
                    <div className={styles.contentCard}>
                        <h2 className={styles.sectionTitle}>Accounts</h2>
                        <h3>Checkings account: ${checkBal}</h3>
                        <h3>Savings account: ${saveBal}</h3>
                        <Button type={"primary"} text={"Done"} onClick={() => {
                            router.push("/atmexit");
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}