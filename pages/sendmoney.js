import styles from '../styles/Home.module.css';
import Head from 'next/head';
import React, {useState} from 'react';
import 'react-js-dropdavn/dist/index.css';
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import Index from "./index";
import {useRouter} from "next/router";
import {Dropdown} from "@nextui-org/react";
import Button from "../components/button";
import {createClient} from "@supabase/supabase-js";

const data = [
    {label: 'Checking', value: 1},
    {label: 'Savings', value: 2},
]

// TODO change "data" const to pull checkings and savings from db
// TODO add functionality to send button

export default function Transfermoney() {
    // Used for dropdown menu
    const [selected, setSelected] = useState(new Set(["Select Account"]));
    const selectedValue = React.useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );

    const [recipData, setRecipData] = useState(null);

    const [searchingRep, setSearchingRep] = useState(true);
    const [data, setData] = useState(null);
    const [dataRefresh, setDataRefresh] = useState(true);

    const router = useRouter();
    const user = useUser();
    const supabase = useSupabaseClient();

    if(user == null) {
        return <Index/>;
    }





    // Fetch the user data, can be copied to each page that accesses user data
    const fetchData = async () => {
        let url = "/api/user/?id=" + user.id;
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

    if(true) {
        router.push("/");
    }

    let myID = null;
    let checkings_acc = null;
    let checkings_bal = null;
    let savings_acc = null;
    let savings_bal = null;
    if(data) {
        checkings_acc = data.checkings_num;
        checkings_bal = data.checkings_bal;
        savings_acc = data.savings_num;
        savings_bal = data.savings_bal;
        myID = data.id;
        if(checkings_acc == null) {
            checkings_acc = "N/A";
            checkings_bal = "N/A";
        }
        else {
            checkings_acc = data.checkings_num.toString().slice(-4);
            checkings_bal = data.checkings_bal.toFixed(2);
        }

        if(savings_acc == null) {
            savings_acc = "N/A";
            savings_bal = "N/A";
        }
        else {
            savings_acc = data.savings_num.toString().slice(-4);
            savings_bal = data.savings_bal.toFixed(2);
        }
    }



    let recipID = null;
    let recipCheckBal = null;
    let recipSaveBal = null;
    function verifyEmail() {
        async function getData() {
            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('email', document.getElementById("recipEmail").value);
            return data;
        }

        getData().then(result => {setRecipData(result[0]);})
            .catch(error => {console.error(error)});


        if(recipData) {
            recipID = recipData.id;
            recipCheckBal = recipData.checkings_bal;
            recipSaveBal = recipData.savings_bal;
        }
        if(recipID == null && searchingRep) {
            alert("Searching for user. Please click transfer again!");
            setSearchingRep(false);
            return;
        }
        else if(recipID == null) {
            alert("User not found! Please double check the email.");
            return;
        }

        transferMoney(myID, recipID, recipCheckBal, recipSaveBal);
    }

    function transferMoney(myID, recipID, recipCheckBal, recipSaveBal) {
        if(document.getElementById("transferAmount").value < 0) {
            alert("Please enter a valid number! Click esc to continue.");
            return;
        }
        try {
            if(document.getElementById("transferAmount").value.toString().split('.')[1].length > 2) {
                alert("Please enter a valid number! Click esc to continue.");
                return;
            }
        } catch {}


        let myCheckBal = 0;
        let mySaveBal = 0;
        if(selectedValue === "Checking Account") {
            myCheckBal = parseFloat(checkings_bal) - parseFloat(document.getElementById("transferAmount").value);
            mySaveBal = parseFloat(savings_bal);
        }
        else if(selectedValue === "Savings Account") {
            mySaveBal = parseFloat(savings_bal) - parseFloat(document.getElementById("transferAmount").value);
            myCheckBal = parseFloat(checkings_bal);
        }
        else {
            alert("Please select an account to transfer from!");
            return;
        }

        if(myCheckBal < 0 || mySaveBal < 0 ) {
            alert("You don't have enough funds to do this! Click esc to continue.");
            return;
        }

        // update with my new bal, pass through new bals and myID
        updateDB(myID, myCheckBal, mySaveBal);
        console.log("My UUID: " + myID);
        console.log("My Checkings Bal: " + myCheckBal);
        console.log("My Savings Bal: " + mySaveBal);
        let newRecipCheckBal = recipCheckBal + parseFloat(document.getElementById("transferAmount").value);
        console.log("Recipient UUID: " + recipID);
        console.log("Recipient Checkings Bal: " + newRecipCheckBal);
        console.log("Recipient Savings Bal: " + recipSaveBal);
        // update with recip new bal, pass through new bal and recipID

        updateDB(recipID, newRecipCheckBal, recipSaveBal).then(result => {});
    }


    async function updateDB(id, checkBal, saveBal) {
        try {
            let url = "/api/user/?id=" + id;
            console.log(url);
            let userData = await fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    checkings_bal: checkBal,
                    savings_bal: saveBal,
                }),
            });
            if (!userData.ok) {
                const error = await userData.json();
                throw new Error(error.message);
            }
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update user data.");
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Send Money</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>

            <div className={styles.sectionTitle}>
                <h1>
                    Send money to someone you know
                </h1>

            </div>
            <main className={styles.main}>
                <div className={styles.grid}>
                    <a className={styles.card}>
                        <h3>From</h3>
                        <h4> Select Account: </h4>
                        <Dropdown>
                            <Dropdown.Button flat>{selectedValue}</Dropdown.Button>
                            <Dropdown.Menu
                                aria-label="Static Actions"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selected}
                                onSelectionChange={setSelected}>
                                <Dropdown.Item key={"Checking Account"}>Checking Account ({checkings_acc})</Dropdown.Item>
                                <Dropdown.Item key={"Savings Account"}>Savings Account ({savings_acc})</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <form>
                            <text><br />$ </text>
                            <input type="number" id="transferAmount"/>
                            <text><br /><br /></text>
                        </form>
                    </a>

                    <a className={styles.card}>
                        <h3>Recipient</h3>
                        <text><br/><br/></text>
                        <h4> Email: </h4>
                        <form>
                            <text><br /></text>
                            <input type="email" id="recipEmail"/>
                            <text><br /><br /></text>
                        </form>
                    </a>
                </div>
                <Button type={"primary"} text={"Send Money"} onClick={() => {
                    verifyEmail();
                }}/>
            </main>

        </div>
    );
}