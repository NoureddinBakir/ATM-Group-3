import React, { useState } from "react";
import styles from "../styles/Home.module.css";
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
            <button onClick={() => openNavBar()}>
                <div className={styles.HamburgerButton}></div>
                <div className={styles.HamburgerButton}></div>
                <div className={styles.HamburgerButton}></div>
            </button>
            <div className={styles.NavBar} style={{width: wid}}>
                <button onClick={() => closeNavBar()}>X GOES HERE</button>
                <a href="/home">Account Details</a>
                <a href="/transactions">Transactions</a>
                <a href="/transfer">Transfer</a>
                <a href="/deposit">Deposit</a>
                <a href="/logout">Logout</a>
            </div>
        </div>
    )
}