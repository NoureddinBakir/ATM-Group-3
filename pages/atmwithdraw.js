import styles from "../styles/Home.module.css";
import Head from "next/head";
import React, {useState} from "react";
import Button from "../components/button";
import { useRouter } from "next/router";
import {useUser} from "@supabase/auth-helpers-react";
import {Dropdown} from "@nextui-org/react";

// TODO reference API & withdraw logic
// TODO create error page

export default function ATMWithdraw() {
    const router = useRouter();
    const user = useUser();
    const [data, setData] = useState(null);
    const [dataRefresh, setDataRefresh] = useState(true);
    const [selected, setSelected] = useState(new Set(["Choose an Account"]));
    const selectedValue = React.useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );

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
    if(dataRefresh && user != null) {
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

    let dropdownAccounts = [];
    if(data) {
        data.forEach((account) => {
            const formattedID = account.id.toString().padStart(4, '0');
            dropdownAccounts.push({
                key: `${account.type} Account (${formattedID})`,
                name: `${account.type} (${formattedID})`,
                apiBal: account.balance,
                apiKey: account.id,
            })
        })
    }

    async function updateDB(newBal, id) {
        let url = "/api/user/?id=" + id;

        let userData = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                balance: newBal,
            }),
        });

        if (userData.ok) {
            // Request was successful, send to home page
            router.push('/atmexit');
        }
    }

    function validateBal(amount) {
        const withdrawAmount = dropdownAccounts.find((row) => row.key.includes(selectedValue));
        if(withdrawAmount == null) {
            alert("Please select an account! Press esc to continue.");
            return;
        }
        if(parseFloat(amount) > 1000) {
            alert("You can not withdraw more than $1,000! Press esc to continue.");
            return;
        }

        let newBal = parseFloat(withdrawAmount.apiBal) - parseFloat(amount);
        if(newBal >= 0) {
            // Update balance in API
            updateDB(newBal.toFixed(2), withdrawAmount.apiKey)
        }
        else {
            alert("You don't have the proper funds to withdraw this amount! Click esc to continue.");
        }
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
                        <h2 className={styles.sectionTitle}>
                            <Dropdown>
                                <Dropdown.Button flat style={{zIndex: "10"}}>
                                    {selectedValue}
                                </Dropdown.Button>
                                <Dropdown.Menu
                                    aria-label="Accounts"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selected}
                                    onSelectionChange={setSelected}
                                    items={dropdownAccounts}
                                >
                                    {(item) => (
                                        <Dropdown.Item key={item.key}>
                                            {item.name}
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </h2>
                        <h2 className={styles.sectionTitle}>Select Amount</h2>
                        <div>
                            <Button type={"primary"} text={"$20"} onClick={() => {
                                validateBal(20);
                            }}/>
                            <Button type={"primary"} text={"$40"} onClick={() => {
                                validateBal(40);
                            }}/>
                            <Button type={"primary"} text={"$60"} onClick={() => {
                                validateBal(60);
                            }}/>
                        </div>
                        <div>
                            <Button type={"primary"} text={"$80"} onClick={() => {
                                validateBal(80);
                            }}/>
                            <Button type={"primary"} text={"$100"} onClick={() => {
                                validateBal(100);
                            }}/>
                            <Button type={"primary"} text={"Cancel"} onClick={() => {
                                router.push("/atmhome");
                            }}/>
                        </div>
                        <div>
                            <label>
                                <input name="dollarInput" id="dollarInput" className={styles.inputUnderlined} placeholder={"Enter Amount"}/>
                            </label>
                            <Button type={"primary"} text={"Done"} onClick={() => {
                                if(document.getElementById("dollarInput").value > 0) {
                                    validateBal(document.getElementById("dollarInput").value);
                                }
                                else {
                                    alert("Please enter a valid amount! Press esc to continue.");
                                }
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}