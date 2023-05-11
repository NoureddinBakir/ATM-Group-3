import Head from 'next/head'
//import Image from 'next/image'
import styles from '../styles/Home.module.css'
//import Button from "../components/button";

export default function aboutus() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Meet The Team</title>
                <link rel="icon" href="/BBB%20logo.png" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    "F" is for Friends who builds apps together!
                </h1>


                <p className={styles.description}>
                    View source code for this page by opening{' '}
                    <code className={styles.code}>pages/aboutus.js</code>
                </p>

                <h2>The Big Bank of Butt was created by a group of 7 hardworking individuals.<br/><br /></h2>
                <h2>The ISE's:<br/></h2>

                <div className={styles.grid}>
                    <a href="" className={styles.card}>
                        <h2>Angel Christov</h2>
                        <p>Senior ISE Major who likes long walks on the beach and groupmates who attend weekly meetings.</p>
                    </a>

                    <a href= "" className={styles.card}>
                        <h2>Joesph Guzman</h2>
                        <p>Senior ISE Major who does his best to attend weekly meetings and participate in page building.</p>
                    </a>

                    <a href= "" className={styles.card}>
                        <h2>Ania Blanco</h2>
                        <p>Junior(?) ISE Major who is always cold for some reason, but is eager to build pages.</p>
                    </a>

                    <a href="" className={styles.card}>
                        <h2>Ghiath Arodaki</h2>
                        <p>Senior ISE Major who is as elusive as his design is beautiful, resident expert on UI/UX.</p>
                    </a>

                </div>

                <h2>The SE's:<br/></h2>

                <div className={styles.grid}>
                    <a href="" className={styles.card}>
                        <h2>Noureddin Bakir</h2>
                        <p>Senior Interdisciplinary Engineering Major who enjoys carrying the whole dev team.</p>
                    </a>

                    <a href= "" className={styles.card}>
                        <h2>Jeniffer Ngo</h2>
                        <p>Sophomore SE Major who is as good at slaying in Valorant as she is at building functional API's.</p>
                    </a>

                    <a href= "" className={styles.card}>
                        <h2>Greg Jaugan</h2>
                        <p>Sophomore SE Major who has as much rizz as he does incredible skill at building API's, that sexy MF.</p>
                    </a>


                </div>

            </main>

            <footer className={styles.footer}>
                <a
                    href="/">Take Me Home</a>
            </footer>
        </div>
    )
}
