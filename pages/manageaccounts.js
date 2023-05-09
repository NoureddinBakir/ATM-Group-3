import styles from "../styles/Home.module.css";
import Head from "next/head";
import Button from "../components/button";
import React, {useState} from "react";
import {useUser} from "@supabase/auth-helpers-react";
import Index from "./index";
import { useRouter } from "next/router";

export default function ManageAccounts() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [dataRefresh, setDataRefresh] = useState(true);

    if(useUser() == null) {
        return <Index/>;
    }

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

    let checkings_num = null;
    let checkings_bal = null;
    let checkings_button = null;
    let savings_num = null;
    let savings_bal = null;
    let savings_button = null;
    if(data) {
        checkings_num = data.checkings_num;
        checkings_bal = data.checkings_bal.toFixed(2);
        checkings_button = "Create";
        savings_num = data.savings_num;
        savings_bal = data.savings_bal.toFixed(2);
        savings_button = "Create";
        if(checkings_num != null) {
            checkings_button = "Delete";
            checkings_num = data.checkings_num.toString().slice(-4);
        }
        if(savings_num != null) {
            savings_button = "Delete";
            savings_num = data.savings_num.toString().slice(-4);
        }
    }

    const user = useUser().id;
    async function updateDBCheckings(newNum) {
        let url = "/api/user/?id=" + user;

        let userData = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                checkings_num: newNum,
                checkings_bal: 0.0,
            }),
        });
        if (userData.ok) {
            // Request was successful, send to home page
            router.push('/home');
        }
    }

    function manageCheckings(button_text) {
        if(button_text === "Create") {
            let newNum = Math.floor(Math.random() * 899999999999);
            updateDBCheckings(newNum);
        }
        else if (button_text === "Delete" && checkings_bal == 0) {
            let newNum = null;
            updateDBCheckings(newNum);
        }
        else {
            alert("Please empty your checkings account before deleting it! Click esc to continue.");
        }
    }

    async function updateDBSavings(newNum) {
        let url = "/api/user/?id=" + user;

        let userData = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                savings_num: newNum,
                savings_bal: 0.0,
            }),
        });
        if (userData.ok) {
            // Request was successful, send to home page
            router.push('/home');
        }
    }

    function manageSavings(button_text) {
        if(button_text === "Create") {
            let newNum = Math.floor(Math.random() * 899999999999);
            updateDBSavings(newNum);
        }
        else if (button_text === "Delete" && savings_bal == 0) {
            let newNum = null;
            updateDBSavings(newNum);
        }
        else {
            alert("Please empty your savings account before deleting it! Click esc to continue.")
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>BBB Manage Accounts</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>

            <div className={styles.pageContainer}>
                <div>
                    <label style={{padding: "40px"}}>
                        Checking Account ({checkings_num}) <br/>
                        ${checkings_bal}
                    </label>

                    <Button type={"primary"} text={checkings_button} onClick={() => {
                        manageCheckings(checkings_button);
                    }}/>
                </div>
                <div>
                    <label style={{padding: "40px"}}>
                        Savings Account ({savings_num}) <br/>
                        ${savings_bal}
                    </label>
                    <Button type={"primary"} text={savings_button} onClick={() => {
                        manageSavings(savings_button);
                    }}/>
                </div>
            </div>

        </div>
    )
}