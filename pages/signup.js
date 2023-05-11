import styles from "../styles/Home.module.css";
import Head from "next/head";
import React from "react";
import Button from "../components/button";
import {useUser} from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function Signup() {
    const router = useRouter();
    const user = useUser();

    async function updateDB() {
        let url = "/api/userData/?id=" + user.id;

        let userData = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                full_name: document.getElementById("fullName").value,
                new_user: false,
            }),
        });

        url = "/api/user/?id=" + user.id;
        let createCheckings = await fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                type: "Checkings",
                balance: 0,
            }),
        });

        let createSavings = await fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                type: "Savings",
                balance: 0,
            }),
        });

        if (createSavings.ok && createCheckings.ok) {
            // Request was successful, send to home page
            router.push('/home');
        }
    }

    return (
        <div className={styles.container} >
            <Head>
                <title>BBB Account Home</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>
            <main>
                <div className={styles.pageContainer}>
                    <div className={styles.paddingCard}>
                        <div className={styles.contentCard}>
                            <h2 className={styles.sectionTitle}>Welcome!</h2>
                            <h5 className={styles.helperText}>
                                Since this is your first time with us,
                                <br /> please enter your name below.
                            </h5>
                            <h5 className={styles.helperText}>
                                We will automatically create a savings
                                <br /> and checkings account for you.
                            </h5>
                            <label>
                                <input name="fullName" id="fullName" className={styles.inputUnderlined} placeholder={"Full Name"}/>
                            </label>
                            <Button type={"primary"} text={"Done"} onClick={() => {
                                if(document.getElementById("fullName").value === "") {
                                    alert("Please fill out all fields! Click esc to continue.");
                                }
                                else {
                                    updateDB();
                                }
                            }}/>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}