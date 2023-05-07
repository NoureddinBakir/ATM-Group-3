import styles from '../styles/Home.module.css';
import Head from "next/head";
import React, {useState} from "react";
import Button from "../components/button";
import { useRouter } from "next/router";
import {useUser} from "@supabase/auth-helpers-react";

// TODO reference API for name?

export default function ATMHome() {
    const router = useRouter();
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

    let user = null;
    if(data) {
        user = data.full_name;
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