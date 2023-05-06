import styles from "../styles/Home.module.css";
import Head from "next/head";
import Button from "../components/button";
import Image from "next/image";

export default function Home() {
    return(
        <div className={styles.container}>
            <Head>
                <title>BBB Landing</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to the Big Bank of Butt!
                </h1>

                <Button text="Click me" onClick={() => alert("Hello Team 3")}/>
                <p className={styles.description}>
                    View source code for this page by opening{' '}
                    <code className={styles.code}>pages/index.js</code>
                </p>

                <div className={styles.grid}>
                    <a href="/register" className={styles.card}>
                        <h2>Registration &rarr;</h2>
                        <p>Don't have an account? Open one here!</p>
                    </a>

                    <a href="/login" className={styles.card}>
                        <h2>Login &rarr;</h2>
                        <p>Already have an account? Login here!</p>
                    </a>

                    <a href="/aboutus" className={styles.card}>
                        <h2>About Us &rarr;</h2>
                        <p>Meet the ISE and SE teams behind this app!</p>
                    </a>

                    <a href="/support" className={styles.card}>
                        <h2>Support Services &rarr;</h2>
                        <p>See the FAQ and search for solutions to your problem.</p>
                    </a>

                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by Coffee{' '}
                    <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
          </span>
                </a>
                <a href = "/upload3">
                    Try Uploading here
                </a>

            </footer>
        </div>
    )
}