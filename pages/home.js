import styles from "../styles/Home.module.css";
import Head from "next/head";
import React, {useState} from "react";
import {useUser} from "@supabase/auth-helpers-react";
import Index from "./index";
import { useRouter } from "next/router";
import { Table } from '@nextui-org/react';

// TODO: implement actual transactions. Look at nextui tables documentation for dynamic table info
// look into infinity pagination for actual transactions page?

export default function Home() {
    const router = useRouter();
    let user = useUser()
    const [data, setData] = useState(null);
    const [dataRefresh, setDataRefresh] = useState(true);
    const [userData, setUserData] = useState(null);
    const [userDataRefresh, setUserDataRefresh] = useState(true);

    // Check if user signed in
    if(user == null) {
        return <Index/>;
    }

    // Fetch user accounts
    const fetchData = async () => {
        let url = "/api/user/?id=" + user.id;
        let userData = await fetch(url)
        return userData.json();
    };

    // Prevent constant fetching of data
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

    // Fetch user data
    const fetchUserData = async () => {
        let url = "/api/userData/?id=" + user.id;
        let userData = await fetch(url)
        return userData.json();
    };

    // Prevent constant fetching of user data
    if(userDataRefresh) {
        const refreshUserData = async () => {
            fetchUserData().then(result => {
                setUserData(result[0]);
            }).catch(error => {
                console.error(error);
            });
            setUserDataRefresh(false);
        };
        refreshUserData();
    }

    // Initialize table data
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

    // Initialize account data
    let rowsA = [];
    if(data) {
        data.forEach((account, index) => {
            const formattedID = account.id.toString().padStart(4, '0');
            rowsA.push({
                key: (index + 1).toString(),
                name: `${account.type} Account (${formattedID})`,
                balance: `$${account.balance}` ,
            });
        })
        if(rowsA === []) {
            rowsA = [{
                key: "1",
                name: "No Accounts Found!",
                balance: null,
            }]
        }
    }

    // Initialize user data
    let name = null;
    let new_user = null;
    if(userData) {
        name = userData.full_name;
        new_user = userData.new_user;
        if(new_user === true) {
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

            </main>
        </div>
    );
}