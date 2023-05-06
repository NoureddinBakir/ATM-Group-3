import { Table } from '@nextui-org/react'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import React, { Component } from 'react'
import { SimpleDropdown } from 'react-js-dropdavn'
import 'react-js-dropdavn/dist/index.css'

const data = [
    {label: 'Checking', value: 1},
    {label: 'Savings', value: 2},
]

export default function transfermoney() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Send Money</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>

            <div className={styles.sectionTitle}>
                <h1>
                    Good day, coolguy38842!
                    <br /><br />
                </h1>

            </div>
            <main className={styles.main}>
                <h2>Send money to someone you know</h2>
                <div className={styles.grid}>
                    <a className={styles.card}>
                        <h3>From</h3>
                        <h4> Select Account: </h4>
                        <SimpleDropdown
                            options={data}
                            clearable
                            configs={
                                { position: { y: 'bottom', x: 'center' } }
                            }
                        />
                        <form action="/send-data-here" method="post">

                            <text><br />$ </text>
                            <input type="number" id="first" name="first"/>
                            <text><br /><br /></text>
                        </form>
                    </a>
                    <a className={styles.card}>
                        <h3>Recipient</h3>
                        <text><br/><br/></text>
                        <h4> Email: </h4>
                        <form action="/send-data-here" method="post">

                            <text><br />$ </text>
                            <input type="email" id="first" name="first"/>
                            <text><br /><br /></text>
                        </form>
                    </a>
                </div>
                <a href="" className={styles.card}>
                    <h2>Send &rarr;</h2>
                </a>
            </main>

        </div>
    );
}