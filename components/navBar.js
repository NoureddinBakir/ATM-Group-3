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
                    <img src={'/user.png'}/>
                    <a href="/home">Account Details</a>
                </div>
                <div className={styles.NavBarButton}>
                    <img src={'/paper.png'}/>
                    <a href="/transactions">Transactions</a>
                </div>
                <div className={styles.NavBarButton}>
                    <img src={'/cloud-computing.png'}/>
                    <a href="/deposit">Deposit</a>
                </div>
                <div className={styles.NavBarButton}>
                    <img src={'/send-money.png'}/>
                    <a href="/sendmoney">Send Money</a>
                </div>
                <div className={styles.NavBarButton}>
                    <img src={'/two-arrows.png'}/>
                    <a href="/transfer">Transfer Money</a>
                </div>
                <div className={styles.NavBarButton}>
                    <img src={'/skills.png'}/>
                    <a href="/manageaccounts">Manage Accounts</a>
                </div>
                
                <div className={styles.NavBarButton}>
                    <img src={'/exit.png'}/>
                    <a href="/logout">Logout</a>
                </div>
            </div>
        </div>
    )
}