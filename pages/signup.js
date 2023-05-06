import styles from "../styles/Home.module.css";
import Head from "next/head";
import React from "react";
import Button from "../components/button";

export default function Signup() {
    // acc nums should be between 100000000000 - 999999999999 (12 digits long)
    function generateAccNum() {
        return Math.floor(Math.random() * 899999999999) + 100000000000;
    }

    async function updateDB() {

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
                            <h5 className={styles.helperText}>Since this is your first time with us,<br /> please enter the information below</h5>
                            <label>
                                <input name="fullName" id="fullName" className={styles.inputUnderlined} placeholder={"Full Name"}/>
                            </label>
                            <label>
                                <input name="atmPIN" id="atmPIN" className={styles.inputUnderlined} placeholder={"Desired PIN (4-8 digits)"}/>
                            </label>
                            <Button type={"primary"} text={"Done"} onClick={() => {
                                if(document.getElementById("fullName").value === ""
                                    || document.getElementById("atmPIN").value === "") {
                                    alert("Please fill out all fields! Click esc to continue.");
                                }
                                else if(document.getElementById("atmPIN").value.length < 4
                                    || document.getElementById("atmPIN").value.length > 8) {
                                    alert("PIN must be between 4-8 digits! Click esc to continue.");
                                }
                                else {
                                    // Forward new information to DB, generate random acc numbers, initialize bal to 0
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