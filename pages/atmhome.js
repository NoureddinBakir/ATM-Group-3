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
    const user = useUser();

    // Fetch the user data, can be copied to each page that accesses user data
    const fetchData = async () => {
        let url = "/api/userData/?id=" + user.id;
        let userData = await fetch(url)

        return userData.json();
    };

    // Refresh accounts
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

    let name = null;
    if(data) {
        name = data.full_name;
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
                        <h2 className={styles.sectionTitle}>Welcome, {name}</h2>
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