import Button from "../components/button";
import styles from '../styles/Home.module.css';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from "next/link";

export default function Login() {
    const supabase = useSupabaseClient();
    async function signInWithEmail() {
        const { data, error } = await supabase.auth.signInWithOtp({
            email: document.getElementById("email").value,
            options: {
                emailRedirectTo: 'localhost:3000',
            },
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.pageContainer}>
                <div className={styles.paddingCard}>
                    <div className={styles.contentCard}>
                        <h2 className={styles.sectionTitle}>Enter your email</h2>
                        <label>
                            <input name="email" id="email" className={styles.inputUnderlined} placeholder={"Enter Your Email"}/>
                        </label>
                        <Button type={"primary"} text={"Send OTP"} onClick={() => {
                            signInWithEmail();
                        }}/>
                        <h5 className={styles.helperText}>Look out for your One Time Password OTP</h5>
                    </div>
                    <div className={styles.cardFooter}>
                        <p>
                            <Link href="/register">Don&apos;t have an account? Register here!</Link>
                        </p>
                        <p>
                            <Link href="/support">Need more help? Click Here!</Link>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}
