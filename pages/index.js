import Login from "./login";
import { useRouter } from "next/router";
import { useUser } from '@supabase/auth-helpers-react'
import React from "react";

export default function Index() {
    const router = useRouter();

    // When putting if statement in the async function, would only route to login page even after verifying session
    if (useUser() == null) {
        return <Login />;
    } else {
        router.push("/home");
    }

}

// Any page that will fetch data for the user should start with this code.

// const [data, setData] = useState(null);
//
// if(useUser() == null) {
//     return <Index/>;
// }
//
// // Fetch the user data, can be copied to each page that accesses user data
// // Adding [user] to the end doesn't cause null error, forces to wait for hook to be used or updated?
// const fetchData = async () => {
//     let user = useUser().id;
//     let url = "/api/user/?id=" + user;
//     let userData = await fetch(url)
//     return userData.json();
// };
//
// fetchData().then(result => {
//     setData(result[0]);
// }).catch(error => {
//     console.error(error);
// });