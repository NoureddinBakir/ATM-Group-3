import {useRouter} from "next/router";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Button from "../components/button";
import React from "react";

export default function ATMExit() {
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
                        <h2 className={styles.sectionTitle}>Transaction Success!</h2>
                        <div>
                            <Button type={"primary"} text={"More Transactions"} onClick={() => {
                                router.push("/atmhome");
                            }}/>
                            <div>
                                <Button type={"primary"} text={"Finished"} onClick={() => {
                                    // TODO sign out logic
                                    router.push("/atmlogin");
                                }}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}