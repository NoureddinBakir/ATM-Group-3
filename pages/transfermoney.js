import { Table } from '@nextui-org/react'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import React, { Component } from 'react'
import { SimpleDropdown } from 'react-js-dropdavn'
import 'react-js-dropdavn/dist/index.css'

const data = [
    {label: 'Checking', value: 1},
    {label: 'Savings', value: 2},
    {label: 'Huh?', value: 3},
    {label: 'You lost me :p', value: 4},
]

export default function transfermoney() {
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
            <main className={styles.main}>
                <div className={styles.grid}>
                    <a className={styles.card}>
                        <h3>Transfer Money</h3>
                        <h4> Select Account: </h4>
                        <SimpleDropdown
                            options={data}
                            clearable
                            configs={
                                { position: { y: 'top', x: 'center' } }
                            }
                        />
                        <form action="/send-data-here" method="post">

                            <text><br />$ </text>
                            <input type="number" id="first" name="first"/>
                            <text><br /><br /></text>
                        </form>
                    </a>
                </div>
            </main>


            <div className={styles.sectionTitle}>
                <h2>
                    Accounts Table
                </h2>
            </div>
        </div>
    );
            }