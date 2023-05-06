import styles from "../styles/Home.module.css";
import Head from "next/head";
import React from "react";
import Button from "../components/button";
import { useRouter } from "next/router";

// TODO reference API & withdraw logic
// TODO create error page

export default function ATMWithdraw() {
    function validateBal(amount) {
        // Get current balance of Checkings from API
        // Takes amount to withdraw as arg
        // If amount is valid to take, update bal in API then push to /atmexit
        // Else, push to /atmerror

        // let accBal = data.checkings_bal;
        // if(accBal - amount >= 0) {
        //     // Update balance in API
        //     router.push("/atmexit");
        // }
        // else {
        //     router.push("/atmerror");
        // }
    }

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
                        <h2 className={styles.sectionTitle}>Comes From Checkings</h2>
                        <h2 className={styles.sectionTitle}>Select Amount</h2>
                        <div>
                            <Button type={"primary"} text={"$20"} onClick={() => {
                                router.push("/atmexit");
                            }}/>
                            <Button type={"primary"} text={"$40"} onClick={() => {
                                router.push("/atmexit");
                            }}/>
                            <Button type={"primary"} text={"$60"} onClick={() => {
                                router.push("/atmexit");
                            }}/>
                        </div>
                        <div>
                            <Button type={"primary"} text={"$80"} onClick={() => {
                                router.push("/atmexit");
                            }}/>
                            <Button type={"primary"} text={"$100"} onClick={() => {
                                router.push("/atmexit");
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