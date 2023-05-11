import Head from 'next/head'
//import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";
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
                    &quot;F&quot; is for Friends who builds apps together!
                </h1>


                <br/><br/><br/>

                <h2>The Big Bank of Butt was created by a group of 7 hardworking individuals.<br/><br /></h2>
                <h2>The ISE&apos;s:<br/></h2>

                <div className={styles.grid}>
                    <Link href="" className={styles.card}>
                        <h2>Angel Christov</h2>
                        <p>Senior ISE Major who likes long walks on the beach and groupmates who attend weekly meetings.</p>
                    </Link>

                    <Link href= "" className={styles.card}>
                        <h2>Joesph Guzman</h2>
                        <p>Senior ISE Major who does his best to attend weekly meetings and participate in page building.</p>
                    </Link>

                    <Link href= "" className={styles.card}>
                        <h2>Ania Blanco</h2>
                        <p>Junior(?) ISE Major who is always cold for some reason, but is eager to build pages.</p>
                    </Link>

                    <Link href="" className={styles.card}>
                        <h2>Ghiath Arodaki</h2>
                        <p>Senior ISE Major who is as elusive as his design is beautiful, resident expert on UI/UX.</p>
                    </Link>

                </div>

                <h2>The SE&apos;s:<br/></h2>

                <div className={styles.grid}>
                    <Link href="" className={styles.card}>
                        <h2>Noureddin Bakir</h2>
                        <p>Senior Interdisciplinary Engineering Major who enjoys carrying the whole dev team.</p>
                    </Link>

                    <Link href= "" className={styles.card}>
                        <h2>Jeniffer Ngo</h2>
                        <p>Sophomore SE Major who is as good at slaying in Valorant as she is at building functional API&apos;s.</p>
                    </Link>

                    <Link href= "" className={styles.card}>
                        <h2>Greg Jaugan</h2>
                        <p>Sophomore SE Major who has as much rizz as he does incredible skill at building API&apos;s, that sexy MF.</p>
                    </Link>


                </div>

            </main>

            <footer className={styles.footer}>
                <Link
                    href="/">Take Me Home</Link>
            </footer>
        </div>
    )
}
