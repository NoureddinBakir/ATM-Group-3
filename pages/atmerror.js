import styles from "../styles/Home.module.css";
import Head from "next/head";
import Button from "../components/button";
import React from "react";
import {useRouter} from "next/router";

export default function ATMError() {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <Head>
                <title>BBB ATM</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>

            <div className={styles.pageContainer}>
                <div className={styles.paddingCard}>
                    <div className={styles.contentCard}>
                        <h2 className={styles.sectionTitle}>You don&apos;t have a checkings account!</h2>
                        <h2 className={styles.helperText}>Please create a checkings account on our website</h2>
                        <Button type={"primary"} text={"Logout"} onClick={() => {
                            router.push("/logout");
                        }}/>
                    </div>
                </div>
            </div>

        </div>
    )
}