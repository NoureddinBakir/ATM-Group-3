import styles from "../styles/Home.module.css";
import Head from "next/head";
import React, {useState} from "react";
import {useUser} from "@supabase/auth-helpers-react";
import Index from "./index";
import { useRouter } from "next/router";
import { Table } from '@nextui-org/react';

// TODO bugs: table labels rendering over navBar

export default function Home() {
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
    const columnsB =[
        {
            key: "description",
            label: "Description",
        },
        {
            key: "amount",
            label: "Amount",
        },
        {
            key: "date",
            label: "Date",
        },

    ];
    const rowsA = [
        {
            key: "1",
            name: "Checking Account",
            balance: "$1,295.39",
        },
        {
            key: "2",
            name: "Savings Account",
            balance: "$0.01",
        },
    ];
    const rowsB = [
        {
            key: "1",
            description: "Deposit",
            amount: "$1,295.39",
            date: "12-1-22",
        },
        {
            key: "2",
            description: "Transfer",
            amount: "$0.01",
            date: "11-2-22",
        },
        {
            key: "3",
            description: "Withdrawal",
            amount: "$27.34",
            date: "10-10-22",
        },
        {
            key: "4",
            description: "Transfer",
            amount: "$1,000.01",
            date: "10-1-22",
        },
    ];

    // Very band-aid solution.
    // Explanation: On render, fetchData has not finished yet, so the attempt to reference data.full_name
    // causes an error that will not render the page. To work around this, must make any variable reference to data
    // as null, then update the variable after the data has been fetched.
    let name = null;
    if(data) {
        name = data.full_name;
        if(data.checkings_num == null) {
            // When a user signs up, this value will automatically be null and thus send them to the
            // page to fill out all of their information
            router.push('/signup');
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>BBB Home</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>

            <div className={styles.sectionTitle}>
                <h1>
                    Good day, {name}!
                    <br /><br />
                </h1>
            </div>
            <main>
                <div className={styles.sectionTitle}>
                    <h2>
                        Accounts Table
                    </h2>
                </div>

                <Table
                    aria-label="Example table with dynamic content"
                    css={{
                        height: "auto",
                        minWidth: "100%",
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

                <div className={styles.sectionTitle}>
                    <h2>
                        Latest Transactions
                    </h2>
                </div>

                <Table
                    aria-label="Example table with dynamic content"
                    css={{
                        height: "auto",
                        minWidth: "100%",
                    }}
                >
                    <Table.Header columns={columnsB}>
                        {(column) => (
                            <Table.Column key={column.key}>{column.label}</Table.Column>
                        )}
                    </Table.Header>
                    <Table.Body items={rowsB}>
                        {(item) => (
                            <Table.Row key={item.key}>
                                {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </main>
        </div>
    );
}