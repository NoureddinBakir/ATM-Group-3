import styles from "../styles/Home.module.css";
import Head from "next/head";
import React from "react";
import Button from "../components/button";
import { useRouter } from "next/router";
export default function Redirect() {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <Head>
                <title>BBB Redirect</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>

            <div className={styles.pageContainer}>
                <div className={styles.paddingCard}>
                    <div className={styles.contentCard}>
                        <h2 className={styles.sectionTitle}>What Page Are You Going To?</h2>
                        <Button type={"primary"} text={"Bank"} onClick={() => {
                            router.push("/");
                        }}/>
                        <Button type={"primary"} text={"ATM"} onClick={() => {
                            router.push("/atmhome");
                        }}/>
                    </div>
                </div>
            </div>

        </div>
    )
}