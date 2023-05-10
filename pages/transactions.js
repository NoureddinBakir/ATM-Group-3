import { Table } from '@nextui-org/react'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import React, {useState} from "react";
import {useUser} from "@supabase/auth-helpers-react";
import Index from "./index";

// TODO data fetch from API
// TODO create transactions array/json in DB

export default function Transactions() {
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

    let checkings_acc = null;
    let savings_acc = null;
    if(data) {
        checkings_acc = data.checkings_num;
        savings_acc = data.savings_num;
        if(checkings_acc == null) {
            checkings_acc = "N/A";
        }
        else {
            checkings_acc = data.checkings_num.toString().slice(-4);
        }

        if(savings_acc == null) {
            savings_acc = "N/A";
        }
        else {
            savings_acc = data.savings_num.toString().slice(-4);
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Transactions</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>



            <div className={styles.sectionTitle}>
                <h2>
                    Checkings ({checkings_acc})
                </h2>
            </div>

            <Table
                aria-label="Example table with dynamic content"
                css={{
                    height: "auto",
                    minWidth: "100%",
                    zIndex: "10",
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

            <div className={styles.sectionTitle}>
                <h2>
                    Savings ({savings_acc})
                </h2>
            </div>

            <Table
                aria-label="Example table with dynamic content"
                css={{
                    height: "auto",
                    minWidth: "100%",
                    zIndex: "10",
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
        </div>
    );
}