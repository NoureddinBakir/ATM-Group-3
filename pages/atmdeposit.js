import styles from "../styles/Home.module.css";
import Head from "next/head";
import React, {useState} from "react";
import {useRouter} from "next/router";
import Button from "../components/button";
import {useUser} from "@supabase/auth-helpers-react";
import {Dropdown} from "@nextui-org/react";

// TODO reference API & update balance function

export default function ATMDeposit() {
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


    function updateBal(dollarInput) {
        const depositAmount = dropdownAccounts.find((row) => row.key.includes(selectedValue));
        if(depositAmount == null) {
            alert("Please select an account! Press esc to continue.");
            return;
        }
        if(parseFloat(dollarInput) > 1000) {
            alert("You can not deposit more than $1,000! Press esc to continue.");
            return;
        }
        let newBal = parseFloat(depositAmount.apiBal) + parseFloat(dollarInput);
        updateDB(newBal.toFixed(2), depositAmount.apiKey).then(res => router.push('/atmexit'));
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
                        <h2 className={styles.sectionTitle}>Input Bills, Specify Amount, Click Done</h2>
                        <div>
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
                            <label>
                                <input name="dollarInput" id="dollarInput" className={styles.inputUnderlined} placeholder={"Enter Amount"}/>
                            </label>
                            <Button type={"primary"} text={"Done"} onClick={() => {
                                if(document.getElementById("dollarInput").value > 0) {
                                    updateBal(document.getElementById("dollarInput").value);
                                }
                                else {
                                    alert("Please enter a valid amount! Press esc to continue.");
                                }
                            }}/>
                            <div>
                                <Button type={"primary"} text={"Cancel"} onClick={() => {
                                    router.push("/atmhome");
                                }}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}