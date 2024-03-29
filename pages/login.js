import Button from "../components/button";
import styles from '../styles/Home.module.css';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function Login() {
    const supabase = useSupabaseClient();
    async function signInWithEmail() {
        const { data, error } = await supabase.auth.signInWithOtp({
            email: document.getElementById("email").value,
            options: {
                emailRedirectTo: 'https://atm-group-3.vercel.app/redirect',
            },
        })
        if(error) {
            console.log(error);
        }
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
                            <a>Don&apos;t have an account? Just enter your email!</a>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}
