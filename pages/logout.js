import { supabase } from "./index";
import React from 'react';
import Login from "./login";
import Home from "./home";
import { useEffect, useState } from "react";

async function signOut() {
    const { error } = await supabase.auth.signOut();
    if(error) {
        console.log(error);
    }
}

export default function Logout () {
    // Hook auto set to null since will be signing out anyways
    const [session, setSession] = useState(null);

    useEffect(() => {
        async function logOut() {
            await signOut();
            // Same code as index, just to check if session is correctly logged out or not
            const { data, error } = await supabase.auth.getSession();
            setSession(data.session);
            console.log(session);
        }
        logOut();
    }, []);

    if (session === null || session === undefined) {
        return <Login />;
    } else {
        return <Home />;
    }
};