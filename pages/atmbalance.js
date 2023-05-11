import styles from "../styles/Home.module.css";
import Head from "next/head";
import React, {useState} from "react";
import Button from "../components/button";
import {useRouter} from "next/router";
import {useUser} from "@supabase/auth-helpers-react";
import Index from "./index";
import {Table} from "@nextui-org/react";

// TODO reference API & reflect on page

export default function ATMBalance() {
    let router = useRouter();
    let user = useUser();
    const [data, setData] = useState(null);
    const [dataRefresh, setDataRefresh] = useState(true);
    if(useUser() == null) {
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
                setData(result);
            }).catch(error => {
                console.error(error);
            });
            setDataRefresh(false);
        };

        refreshData();
    }

    let rowsA = [];
    if(data) {
        data.forEach((account, index) => {
            const formattedID = account.id.toString().padStart(4, '0');
            rowsA.push({
                key: (index + 1).toString(),
                name: `${account.type} Account (${formattedID})`,
                balance: `$${account.balance}` ,
                apiBal: account.balance,
                apiKey: account.id,
            });
        })
    }


    const columnsA = [
        {
            key: "name",
            label: "Account Name",
        },
        {
            key: "balance",
            label: "Balance",
        },
    ]

    return (
        <div className={styles.container}>
            <Head>
                <title>BBB ATM</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>
            <div className={styles.pageContainer}>
                <div className={styles.paddingCard}>
                    <div className={styles.contentCard}>
                        <h2 className={styles.sectionTitle}>Accounts</h2>
                        <Table
                            aria-label="Example table with dynamic content"
                            css={{
                                height: "auto",
                                minWidth: "100%",
                                zIndex: "10",
                            }}
                        >
                            <Table.Header columns={columnsA}>
                                {(column) => (
                                    <Table.Column key={column.key}>{column.label}</Table.Column>
                                )}
                            </Table.Header>
                            <Table.Body items={rowsA}>
                                {(item) => (
                                    <Table.Row key={item.key}>
                                        {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                        <Button type={"primary"} text={"Done"} onClick={() => {
                            router.push("/atmexit");
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}