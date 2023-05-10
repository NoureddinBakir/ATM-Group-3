import styles from "../styles/Home.module.css";
import Head from "next/head";
import Button from "../components/button";
import React, {useState} from "react";
import {useUser} from "@supabase/auth-helpers-react";
import Index from "./index";
import { useRouter } from "next/router";
import {Table} from "@nextui-org/react";
import { Dropdown } from "@nextui-org/react";

export default function ManageAccounts() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [dataRefresh, setDataRefresh] = useState(true);

    const [selected, setSelected] = useState(new Set(["Choose an Account"]));
    const selectedValue = React.useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );

    const [dropSelected, setDropSelected] = useState(new Set(["Choose an Account Type"]));
    const dropSelectedValue = React.useMemo(() => Array.from(dropSelected).join(", ").replaceAll("_", " "),
        [dropSelected]
    );

    if(useUser() == null) {
        return <Index/>;
    }

    const fetchData = async () => {
        let user = useUser().id;
        let url = "/api/user/?id=" + user;
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

    let rowsA = [];
    let dropdownAccounts = [];
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
            dropdownAccounts.push({
                key: `${account.type} Account (${formattedID})`,
                name: `${account.type} (${formattedID})`,
            })
        })
        if(rowsA === []) {
            rowsA = [{
                key: "1",
                name: "No Accounts Found!",
                balance: null,
            }]
        }
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

    const user = useUser().id;

    async function createNewAccount(type, id) {
        let url = "/api/user/?id=" + id;
        let userData = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                type: type,
                balance: 0,
            })
        })
    }

    async function deleteAccount(selectedAccount) {
        const foundAccount = rowsA.find((row) => row.name.includes(selectedAccount));
        if (parseFloat(foundAccount.apiBal) > 0) {
            alert("Please empty the account before deleting it! Press esc to continue.");
            return;
        } else {
            let url = "/api/user";
            let userData = await fetch(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: foundAccount.apiKey,
                })
            })
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>BBB Manage Accounts</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>

            <div>
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
            </div>

            <div>
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
                    <Button type={"primary"} text={"Delete"} onClick={() => {
                        deleteAccount(selectedValue).then(result => {router.push("/")});
                    }}/>
                </div>

                <div>
                    <Dropdown>
                        <Dropdown.Button flat style={{zIndex: "10"}}>
                            {dropSelectedValue}
                        </Dropdown.Button>
                        <Dropdown.Menu
                            aria-label="Account Types"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={dropSelected}
                            onSelectionChange={setDropSelected}
                        >
                            <Dropdown.Item key="Checkings">Checkings</Dropdown.Item>
                            <Dropdown.Item key="Savings">Savings</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button type={"primary"} text={"Create Account"} onClick={() => {
                        createNewAccount(dropSelectedValue, user).then(result => {router.push("/")});
                    }}/>
                </div>

            </div>
        </div>
    )
}