import { Table } from '@nextui-org/react'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Button from "../components/button";

export default function accdetails() {


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
        {
            key: "3",
            name: "Checking Account",
            balance: "$27.34",
        },
        {
            key: "4",
            name: "Savings Account",
            balance: "$1,000.01",
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
    
    return (
        <div className={styles.container}>
            <Head>
                <title>User Dashboard</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>

            <div className={styles.sectionTitle}>
                <h1>
                    Good day, coolguy38842!
                    <br /><br />
                </h1>
            </div>
            <main className={styles.grid}>
                 <a href= "/transfermoney" className={styles.card}>
                <h3>Transfer Money</h3>
                </a>

                <a href= "/sendmoney" className={styles.card}>
                    <h3>Send Money</h3>
                </a>
            </main>


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
        </div>
    );
}
