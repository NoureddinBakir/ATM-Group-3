import { Table } from '@nextui-org/react'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Button from "../components/button";

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
                <h1>
                    Send money to someone you know
                </h1>

            </div>
            <main className={styles.main}>
                <div className={styles.grid}>
                    <a className={styles.card}>
                        <h3>Choose Account</h3>
                        <h4>Enter Amount</h4>
                    </a>
                    <a className={styles.card}>
                        <h3>Recipient email address:</h3>
                    </a>
                </div>
                <a className={styles.card}>
                    <h3>Send</h3>
                </a>
            </main>


        </div>
    );
}