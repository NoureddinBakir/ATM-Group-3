import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link"
import Button from "../components/button";

export default function register() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Registration</title>
                <link rel="icon" href="/BBB%20logo.png" />
            </Head>

            <main className={styles.main}>
                <h3 className={styles.title}>
                    Register Here
                </h3>


                <p className={styles.description}>
                    Let&apos;s Get You Started!
                </p>


                <div className={styles.grid}>
                    <a className={styles.card}>
                        <p className={styles.description}>
                            Let&apos;s Get You Started!
                        </p>
                        <text>
                            <br />
                        </text>
                        <form action="/send-data-here" method="post">
                            <label htmlFor="first">Email Address: </label>
                            <text><br /><br /></text>
                            <input type="email" id="first" name="first"/>
                            <text><br /><br /></text>
                            <button type="next">Next</button>
                        </form>

                        <text><br /><br /></text>

                        <form action="/send-data-here" method="post">
                            <label htmlFor="first">OTP Code: </label>
                            <text><br /><br /></text>
                            <input type="text" id="first" name="first"/>
                            <text><br /><br /></text>
                            <button type="next">Go!</button>
                        </form>
                    </a>

                    <Link href="/Login" className={styles.card}>
                        <h2>Login &rarr;</h2>
                        <p>Already have an account? Click here!</p>
                    </Link>

                </div>
            </main>

            <footer className={styles.footer}>
                <Link href="/">Powered by Coffee </Link>
            </footer>
        </div>
    )
}
