import styles from "../styles/Home.module.css";
import Head from "next/head";
import React, {useState} from "react";
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import Index from "./index";

async function getUUID() {
    const supabase = useSupabaseClient();
    const UUID = useUser().id;
    const { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', UUID);

    console.log(data[0].full_name);
    console.log(UUID);
    return data[0].full_name;
}

export default function Home() {
    const [UUID, setUUID] = useState(null);

    if(useUser() == null) {
        return <Index/>;
    }
    console.log(useUser());
    async function getData() {
        setUUID(await getUUID());
    }
    getData();

    return(
        <div className={styles.container} >
            <Head>
                <title>BBB Account Home</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>
            <body>Hello, {UUID} </body>
        </div>
    )
}