import styles from "../styles/Home.module.css";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Index from "./index";

export default function Home() {
    const [data, setData] = useState(null);
    const user = useUser();

    useEffect(() => {
        async function fetchData() {
            if (user) {
                const userData = await fetch(`/api/user/?id=${user.id}`);
                const result = await userData.json();
                setData(result[0]);
            }
        }
        fetchData();
    }, [user]);

    let name = null;
    if (data) {
        name = data.full_name;
    }

    if (!user) {
        return <Index />;
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>BBB Account Home</title>
                <link rel="icon" href="/BBB%20logo.png" />
            </Head>
            <body>Hello, {name} </body>
        </div>
    );
}