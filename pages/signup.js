import styles from "../styles/Home.module.css";
import Head from "next/head";
import React from "react";
import Button from "../components/button";
import {useUser} from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function Signup() {
    const router = useRouter();
    const user = useUser().id;
    // acc nums should be between 100000000000 - 999999999999 (12 digits long)
    function generateAccNum() {
        return Math.floor(Math.random() * 899999999999);
    }

    async function updateDB() {
        let url = "/api/user/?id=" + user;
        let checkings_num = generateAccNum();
        let savings_num = generateAccNum();

        let userData = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                full_name: document.getElementById("fullName").value,
                checkings_num: checkings_num,
                checkings_bal: 0.0,
                savings_num: savings_num,
                savings_bal: 0.0,
            }),
        });

        if (userData.ok) {
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