import styles from '../styles/Home.module.css';
import Head from "next/head";
import React from "react";
import Button from "../components/button";
import { useRouter } from "next/router";

// TODO reference API for name?

export default function ATMHome() {
    const router = useRouter();
    let user = "User";



    return (
        <div className={styles.container}>
            <Head>
                <title>BBB ATM</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>

            <div className={styles.pageContainer}>
                <div className={styles.paddingCard}>
                    <div className={styles.contentCard}>
                        <h2 className={styles.sectionTitle}>Welcome, {user}</h2>
                        <Button type={"primary"} text={"Withdraw"} onClick={() => {
                            router.push("/atmwithdraw");
                        }}/>
                        <Button type={"primary"} text={"Deposit"} onClick={() => {
                            router.push("/atmdeposit");
                        }}/>
                        <Button type={"primary"} text={"Check Balance"} onClick={() => {
                            router.push("/atmbalance");
                        }}/>
                    </div>
                </div>
            </div>

        </div>
    )
}