import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link"
import Button from "../components/button";

    export default function login() {
        return (
            <div className={styles.container}>
                <Head>
                    <title>Login Page</title>
                    <link rel="icon" href="/BBB%20logo.png" />
                </Head>

                <main className={styles.main}>
                    <h3 className={styles.title}>
                        Login Here
                    </h3>


                    <p className={styles.description}>
                        Enter Your Email Address to receive an OTP Login Code
                    </p>

                    <form action="/send-data-here" method="post">
                        <label htmlFor="first">Email Address: </label>
                        <text><br /></text>
                        <input type="email" id="first" name="first"/>
                        <button type="submit">Submit</button>
                        <text><br /><br /></text>
                    </form>

                    <form action="/send-data-here" method="post">
                        <label htmlFor="otp">OTP Code: </label>
                        <text><br /></text>
                        <input type="number" id="otp" name="otp"/>
                        <button type="submit">Submit</button>
                        <text><br /><br /></text>
                    </form>

                    <div className={styles.grid}>
                        <a href="/" className={styles.card}>
                            <h2>Home &rarr;</h2>
                            <p>Take me home tonight!</p>
                        </a>

                        <a href="/register" className={styles.card}>
                            <h2>Register &rarr;</h2>
                            <p>No account? Click here!</p>
                        </a>


                    </div>
                </main>

                <footer className={styles.footer}>
                        Powered by Coffee
                </footer>
            </div>
        )
    }
