import styles from '../styles/Home.module.css'
import Head from 'next/head'
import React, {useState} from 'react'
import { Dropdown } from "@nextui-org/react";
import 'react-js-dropdavn/dist/index.css'
import {useUser} from "@supabase/auth-helpers-react";
import Index from "./index";
import Button from "../components/button";
import {useRouter} from "next/router";

export default function Transfer() {
    // Used for dropdown menu
    const [selected, setSelected] = useState(new Set(["Select Account"]));
    const selectedValue = React.useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );
    const [secondSelected, setSecondSelected] = useState(new Set(["Select Account"]));
    const secondSelectedValue = React.useMemo(
        () => Array.from(secondSelected).join(", ").replaceAll("_", " "),
        [secondSelected]
    );

    const [data, setData] = useState(null);
    const [dataRefresh, setDataRefresh] = useState(true);


    const user = useUser();
    const router = useRouter();
    if(user == null) {
        return <Index/>;
    }



    // Fetch the user accounts
    const fetchData = async () => {
        let url = "/api/user/?id=" + user.id;
        let userData = await fetch(url)
        return userData.json();
    };

    if(dataRefresh) {
        const refreshData = async () => {
            fetchData().then(result => {
                setData(result);
            }).catch(error => {
                console.error(error);
            });
            setDataRefresh(false);
        };

        refreshData();
    }

    // Initialize user accounts, used in drop down menu
    let dropdownAccounts = [];
    if(data) {
        data.forEach((account) => {
            const formattedID = account.id.toString().padStart(4, '0');
            dropdownAccounts.push({
                key: `${account.type} Account (${formattedID})`,
                name: `${account.type} (${formattedID})`,
                apiKey: account.id,
                apiBal: account.balance,
            })
        });
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




        const senderAccount = dropdownAccounts.find((row) => row.key.includes(selectedValue));
        const recipAccount = dropdownAccounts.find((row) => row.key.includes(secondSelectedValue));

        if(senderAccount === null || recipAccount === null) {
            alert("Please select an account to transfer from!");
            return;
        }

        let newSenderBal = parseFloat(senderAccount.apiBal) - parseFloat(document.getElementById("transferAmount").value);
        let newRecipBal = parseFloat(recipAccount.apiBal) + parseFloat(document.getElementById("transferAmount").value);

        if(newSenderBal < 0) {
            alert("You don't have enough funds to do this! Click esc to continue.");
            return;
        }

        updateDB(senderAccount.apiKey, newSenderBal, recipAccount.apiKey, newRecipBal);
    }

    async function updateDB(senderKey, newSenderBal, recipKey, newRecipBal) {
        let senderUrl = "/api/user/?id=" + senderKey;

        let senderData = await fetch(senderUrl, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                balance: newSenderBal,
            }),
        });

        let recipUrl = "/api/user/?id=" + recipKey;
        let recipData = await fetch(recipUrl, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                balance: newRecipBal,
            })
        })

        if (recipData.ok) {
            // Request was successful, send to home page
            router.push('/home');
        }
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
                                onSelectionChange={setSelected}
                                items={dropdownAccounts}>
                                {(item) => (
                                    <Dropdown.Item key={item.key}>
                                        {item.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <form>
                            <text><br />$ </text>
                            <input type="number" id="transferAmount"/>
                            <text><br /><br /></text>
                        </form>
                    </a>
                    <a className={styles.card}>
                        <h3>To </h3>
                        <h4> Select Account: </h4>
                        <Dropdown>
                            <Dropdown.Button flat>{secondSelectedValue}</Dropdown.Button>
                            <Dropdown.Menu
                                aria-label="Static Actions"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={secondSelected}
                                onSelectionChange={setSecondSelected}
                                items={dropdownAccounts}>
                                {(item) => (
                                    <Dropdown.Item key={item.key}>
                                        {item.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <form>
                            <text><br /> </text>
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