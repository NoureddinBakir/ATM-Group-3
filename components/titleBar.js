import NavBar from "./navBar";
import styles from "../styles/Home.module.css";

export default function TitleBar() {
    return (
        <div className={styles.TitleBar}>
            <NavBar/>
            <h1>Big Bank of Butt</h1>
        </div>
    )
}