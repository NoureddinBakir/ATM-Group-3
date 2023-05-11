import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
export default function NavBar () {
    const [wid, setWid] = useState('0%');
    const openNavBar = () => {
        setWid('20%')
    }
    const closeNavBar = () => {
        setWid('0%')
    }
    return (
        <div>
            <button onClick={() => openNavBar()} style={{backgroundColor: "transparent", borderColor: "transparent"}}>
                <div className={styles.HamburgerButton}></div>
                <div className={styles.HamburgerButton}></div>
                <div className={styles.HamburgerButton}></div>
            </button>
            <div className={styles.NavBar} style={{width: wid}}>
                <button className={styles.NavBarClose} onClick={() => closeNavBar()}>
                    X
                </button>

                <div className={styles.NavBarButton}>
                    <img src={'https://static.vecteezy.com/system/resources/previews/015/577/233/original/face-with-big-eyes-large-size-of-yellow-emoji-smile-free-vector.jpg'}/>
                    <Link href="/home">Account Details</Link>
                </div>
                <div className={styles.NavBarButton}>
                    <img src={'https://static.vecteezy.com/system/resources/previews/015/577/233/original/face-with-big-eyes-large-size-of-yellow-emoji-smile-free-vector.jpg'}/>
                    <Link href="/transactions">Transactions</Link>
                </div>
                <div className={styles.NavBarButton}>
                    <img src={'https://static.vecteezy.com/system/resources/previews/015/577/233/original/face-with-big-eyes-large-size-of-yellow-emoji-smile-free-vector.jpg'}/>
                    <Link href="/transfer">Transfer</Link>
                </div>
                <div className={styles.NavBarButton}>
                    <img src={'https://static.vecteezy.com/system/resources/previews/015/577/233/original/face-with-big-eyes-large-size-of-yellow-emoji-smile-free-vector.jpg'}/>
                    <Link href="/deposit">Deposit</Link>
                </div>
                <div className={styles.NavBarButton}>
                    <img src={'https://static.vecteezy.com/system/resources/previews/015/577/233/original/face-with-big-eyes-large-size-of-yellow-emoji-smile-free-vector.jpg'}/>
                    <Link href="/logout">Logout</Link>
                </div>
            </div>
        </div>
    )
}