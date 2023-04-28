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
                    <img src={'https://static.vecteezy.com/system/resources/previews/015/577/233/original/face-with-big-eyes-large-size-of-yellow-emoji-smile-free-vector.jpg'}/>
                    <a href="/home">Account Details</a>
                </div>
                <div className={styles.NavBarButton}>
                    <img src={'https://static.vecteezy.com/system/resources/previews/015/577/233/original/face-with-big-eyes-large-size-of-yellow-emoji-smile-free-vector.jpg'}/>
                    <a href="/transactions">Transactions</a>
                </div>
                <div className={styles.NavBarButton}>
                    <img src={'https://static.vecteezy.com/system/resources/previews/015/577/233/original/face-with-big-eyes-large-size-of-yellow-emoji-smile-free-vector.jpg'}/>
                    <a href="/transfer">Transfer</a>
                </div>
                <div className={styles.NavBarButton}>
                    <img src={'https://static.vecteezy.com/system/resources/previews/015/577/233/original/face-with-big-eyes-large-size-of-yellow-emoji-smile-free-vector.jpg'}/>
                    <a href="/deposit">Deposit</a>
                </div>
                <div className={styles.NavBarButton}>
                    <img src={'https://static.vecteezy.com/system/resources/previews/015/577/233/original/face-with-big-eyes-large-size-of-yellow-emoji-smile-free-vector.jpg'}/>
                    <a href="/logout">Logout</a>
                </div>
            </div>
        </div>
    )
}