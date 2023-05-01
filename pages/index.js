import Home from "./home";
import Login from "./login";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabaseUrl = "DON'T LOOK !";
const supabaseAnonKey = "DON'T LOOK !";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Index() {
    // Hook as the user will be redirected to this page when clicking magic link, "logged out" on first time loading page
    const [session, setSession] = useState(null);

    // Due to react, will run on page load then update with the if statement
    useEffect(() => {
        async function fetchSession() {
            const { data, error } = await supabase.auth.getSession();
            setSession(data.session);
            console.log(session);
        }

        fetchSession();
    }, []);

    if (session === null || session === undefined) {
        return <Login />;
    } else {
        return <Home />;
    }
}
