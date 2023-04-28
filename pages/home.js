import styles from "../styles/Home.module.css";
import Head from "next/head";
import React from "react";
import TitleBar from "../components/titleBar";

export default function Home() {
    return(
        <div className={styles.container} >
            <Head>
                <title>BBB Account Home</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>
        </div>
    )
}