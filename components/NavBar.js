import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleLeft, faArrowAltCircleRight, faUser, faXmarkCircle} from "@fortawesome/free-regular-svg-icons";
import styles from "../styles/Home.module.css";

const MENU_LIST = [
    {text: "Home", href: "/"},
    {text: "About Us", href: "/about"},
    {text: "Contact", href: "/contact"},
];
const Navbar = () => {
    const [active, setActive] = useState(true);

    const handleClick = () => {
        setActive(!active);
    }

    return (
        <div className={styles.NavBarContainer}>
            {active ? (
                    <FontAwesomeIcon icon={faArrowAltCircleRight} className={styles.NavIcon}
                                     onClick={() => handleClick()}/>
                ) :
                (<>
                    <div className={styles.NavBar}>
                        <a href="/home">Home</a>
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                        <a href="/support">Support</a>
                        <a href="/aboutus">About</a>
                        <a href="/accdetails">Dashboard</a>
                        <a href="/transactions">Transactions</a>
                        <a href="/transfermoney">Transfer Money</a>
                        <a href="/sendmoney">Send Money</a>
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} className={styles.NavIcon}
                                         onClick={() => handleClick()}/>
                    </div>
                </>)
            }
        </div>
    );
}

export default Navbar;