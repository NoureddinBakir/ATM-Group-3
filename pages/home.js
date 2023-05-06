import styles from "../styles/Home.module.css";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import Index from "./index";

export default function Home() {
    const [data, setData] = useState(null);

    if(useUser() == null) {
        return <Index/>;
    }

    // Fetch the user data, can be copied to each page that accesses user data
    // Adding [user] to the end doesn't cause null error, forces to wait for hook to be used or updated?
    const fetchData = async () => {
        let user = useUser().id;
        let url = "/api/user/?id=" + user;
        let userData = await fetch(url)
        return userData.json();
    };

    fetchData().then(result => {
        setData(result[0]);
    }).catch(error => {
        console.error(error);
    });

    // Very band-aid solution.
    // Explanation: On render, fetchData has not finished yet, so the attempt to reference data.full_name
    // causes an error that will not render the page. To work around this, must make any variable reference to data
    // as null, then update the variable after the data has been fetched.
    let name = null;
    if(data) {
        name = data.full_name;
    }

    return(
        <div className={styles.container} >
            <Head>
                <title>BBB Account Home</title>
                <link rel="icon" href="/BBB%20logo.png"/>
            </Head>
            <body>Hello, {name} </body>
        </div>
    )
}