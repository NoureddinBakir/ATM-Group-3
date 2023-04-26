import Button from "../components/button";
import styles from '../styles/Home.module.css';

export default function Login() {
    return (
        <div className={styles.container}>
            <div className={styles.pageContainer}>
                <div className={styles.paddingCard}>
                    <div className={styles.contentCard}>
                        <h2 className={styles.sectionTitle}>Enter your email</h2>
                        <label>
                            <input name="email" className={styles.inputUnderlined} placeholder={"Enter Your Email"}/>
                        </label>
                        <Button type={"primary"} text={"Send OTP"} onClick={() => {
                            alert("Heyyyy")
                        }}/>
                        <h5 className={styles.helperText}>Look out for your One Time Password OTP</h5>
                    </div>
                    <div className={styles.cardFooter}>
                        <p>
                            <a href="/register">Don't have an account? Register here!</a>
                        </p>
                        <p>
                            <a href="/support">Need more help? Click Here!</a>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}
