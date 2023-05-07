import { Table } from '@nextui-org/react'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Button from "../components/button";

// TODO data fetch from API
// TODO create transactions array/json in DB

export default function Transactions() {
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

    return (
        <div className={styles.container}>
            <Head>
                <title>Transactions</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>



            <div className={styles.sectionTitle}>
                <h2>
                    Checkings
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

            <div className={styles.sectionTitle}>
                <h2>
                    Savings
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