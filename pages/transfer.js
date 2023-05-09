import styles from '../styles/Home.module.css'
import Head from 'next/head'
import React, {useState} from 'react'
import { Dropdown } from "@nextui-org/react";
import 'react-js-dropdavn/dist/index.css'
import {useUser} from "@supabase/auth-helpers-react";
import Index from "./index";
import Button from "../components/button";
import {useRouter} from "next/router";



// TODO change "data" const to pull checkings and savings from db
// TODO add functionality to transfer button
export default function Transfer() {
    // Used for dropdown menu
    const [selected, setSelected] = useState(new Set(["Select Account"]));
    const selectedValue = React.useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );


    const [data, setData] = useState(null);
    const [dataRefresh, setDataRefresh] = useState(true);

    if(useUser() == null) {
        return <Index/>;
    }
    const user = useUser().id;
    const router = useRouter();

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

    let checkings_acc = null;
    let checkings_bal = null;
    let savings_acc = null;
    let savings_bal = null;
    if(data) {
        checkings_acc = data.checkings_num;
        checkings_bal = data.checkings_bal;
        savings_acc = data.savings_num;
        savings_bal = data.savings_bal;
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

    async function updateDB(newCheckingsBal, newSavingsBal) {
        let url = "/api/user/?id=" + user;

        let userData = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                checkings_bal: newCheckingsBal,
                savings_bal: newSavingsBal,
            }),
        });

        if (userData.ok) {
            // Request was successful, send to home page
            router.push('/home');
        }
    }

    function updateBal() {
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


        let newCheckingsBal = 0;
        let newSavingsBal = 0;
        if(selectedValue === "Checking Account") {
            newCheckingsBal = parseFloat(checkings_bal) - parseFloat(document.getElementById("transferAmount").value);
            newSavingsBal = parseFloat(savings_bal) + parseFloat(document.getElementById("transferAmount").value);
        }
        else if(selectedValue === "Savings Account") {
            newSavingsBal = parseFloat(savings_bal) - parseFloat(document.getElementById("transferAmount").value);
            newCheckingsBal = parseFloat(checkings_bal) + parseFloat(document.getElementById("transferAmount").value);
        }
        else {
            alert("Please select an account to transfer from!");
            return;
        }

        if(newCheckingsBal < 0 || newSavingsBal < 0 ) {
            alert("You don't have enough funds to do this! Click esc to continue.");
            return;
        }

        updateDB(newCheckingsBal, newSavingsBal);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Transfer Money</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>

            <div className={styles.sectionTitle}>
            </div>
            <main className={styles.main}>
                <h2>Transfer money between accounts</h2>
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
                </div>
                <Button type={"primary"} text={"Transfer"} onClick={() => {
                    updateBal();
                }}/>
            </main>

        </div>
    );
}