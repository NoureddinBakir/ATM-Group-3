import Button from "../components/button";
import styles from '../styles/Home.module.css';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Head from "next/head";
import React from "react";

// TODO implement login logic for ATM specifically

export default function ATMLogin() {
    const supabase = useSupabaseClient();
    function verifyPIN() {
        // Figure out different method to login to ATM
        // Magic link always redirects to website specifically
        // Just have them input PIN and fake ask to put in ATM card?
        // would have to manually query server from that page, or refactor API
        document.getElementById("email").value
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
                        <h2 className={styles.sectionTitle}>Enter your email</h2>
                        <label>
                            <input name="email" id="email" className={styles.inputUnderlined} placeholder={"Enter Your Email"}/>
                        </label>
                        <Button type={"primary"} text={"Send OTP"} onClick={() => {
                            verifyPIN();
                        }}/>
                        <h5 className={styles.helperText}>Look out for your One Time Password OTP</h5>
                    </div>
                </div>
            </div>

        </div>
    )
}
