import styles from '../styles/Home.module.css'

export default function Login() {
    return (
        <div className={styles.container}>
            <div className={styles.pageContainer}>
                <div className={styles.paddingCard}>
                    <div className={styles.contentCard}>
                        <h2>Enter your email</h2>
                        <h4>Look out for your One Time Password OTP</h4>
                        <label>
                            <input name="email">

                            </input>
                        </label>
                    </div>
                </div>
            </div>

        </div>
    )
}
