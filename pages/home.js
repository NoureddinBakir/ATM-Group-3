import styles from "../styles/Home.module.css";
import Head from "next/head";
import React, {useState} from "react";
import {useUser} from "@supabase/auth-helpers-react";
import Index from "./index";

export default function Home() {
    const [data, setData] = useState(null);
    const [dataRefresh, setDataRefresh] = useState(true);

    if(useUser() == null) {
        return <Index/>;
    }

    // Fetch the user data, can be copied to each page that accesses user data
    const fetchData = async () => {
        let user = useUser().id;
        let url = "/api/user/?id=" + user;
        let userData = await fetch(url)
        return userData.json();
    };

    // Forces a data refresh only a few times; boolean can be changed when needed.
    // Explanation: Without this, the website would constantly call the API every time the page is rendered.
    // This is very problematic as it causes thousands of API calls, and may have the potential to slow down
    // the website.
    if(dataRefresh) {
        const refreshData = async () => {
            fetchData().then(result => {
                setData(result[0]);
            }).catch(error => {
                console.error(error);
            });
            setDataRefresh(false);
        };

        refreshData();
    }

    // Very band-aid solution.
    // Explanation: On render, fetchData has not finished yet, so the attempt to reference data.full_name
    // causes an error that will not render the page. To work around this, must make any variable reference to data
    // as null, then update the variable after the data has been fetched.
    let name = null;
    if(data) {
        if(data.checkings_num == null) {
            name = data.full_name;

            // When a user signs up, this value will automatically be null and thus send them to the
            // page to fill out all of their information
            console.log("redirect to signup page")
        }
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