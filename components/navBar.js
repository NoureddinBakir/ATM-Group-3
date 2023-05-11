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
                    <img src={'/user.png'}/>
                    <Link href="/home">Account Details</Link>
                </div>

                <div className={styles.NavBarButton}>
                    <img src={'/cloud-computing.png'}/>
                    <Link href="/deposit">Deposit</Link>
                </div>

                <div className={styles.NavBarButton}>
                    <img src={'/two-arrows.png'}/>
                    <Link href="/transfer">Transfer Money</Link>
                </div>
                <div className={styles.NavBarButton}>
                    <img src={'/skills.png'}/>
                    <Link href="/manageaccounts">Manage Accounts</Link>
                </div>

                <div style={{marginTop: "auto"}}>
                    <div className={styles.NavBarButton}>
                        <img src={'/info.png'}/>
                        <Link href={"/aboutus"}>About Us</Link>
                    </div>
                    <div className={styles.NavBarButton}>
                        <img src={'/exit.png'}/>
                        <Link href="/logout">Logout</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}