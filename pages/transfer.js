import styles from '../styles/Home.module.css'
import Head from 'next/head'
import React from 'react'
import { SimpleDropdown } from 'react-js-dropdavn'
import 'react-js-dropdavn/dist/index.css'

const data = [
    {label: 'Checking', value: 1},
    {label: 'Savings', value: 2},
]

// TODO change "data" const to pull checkings and savings from db
// TODO add functionality to transfer button
export default function Transfer() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Transfer Money</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>

            <div className={styles.sectionTitle}>
            </div>
            <main className={styles.main}>
                <h2>Transfer money between accounts</h2>
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
                        <h3>To</h3>
                        <h4> Select Account: </h4>
                        <SimpleDropdown
                            options={data}
                            clearable
                            configs={
                                { position: { y: 'bottom', x: 'center' } }
                            }
                        />
                        <text><br/><br/><br/></text>
                    </a>
                </div>
                <a href="" className={styles.card}>
                    <h2>Transfer &rarr;</h2>
                </a>
            </main>

        </div>
    );
}