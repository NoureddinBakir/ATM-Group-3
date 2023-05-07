import Login from "./login";
import { useRouter } from "next/router";
import {useUser} from '@supabase/auth-helpers-react'
import React from "react";

export default function Index() {
    const router = useRouter();
    const user = useUser();

    if (user == null) {
        return <Login />;
    } else {
        router.push("/home");
    }
}

// Any page that will fetch data for the user should start with this code.

// const [data, setData] = useState(null);
// const [dataRefresh, setDataRefresh] = useState(true);
//
// if(useUser() == null) {
//     return <Index/>;
// }
//
// // Fetch the user data, can be copied to each page that accesses user data
// const fetchData = async () => {
//     let user = useUser().id;
//     let url = "/api/user/?id=" + user;
//     let userData = await fetch(url)
//     return userData.json();
// };
//
// console.log(dataRefresh);
//
// // Forces a data refresh only a few times; boolean can be changed when needed.
// // Explanation: Without this, the website would constantly call the API every time the page is rendered.
// // This is very problematic as it causes thousands of API calls, and may have the potential to slow down
// // the website.
// if(dataRefresh) {
//     const refreshData = async () => {
//         fetchData().then(result => {
//             setData(result[0]);
//         }).catch(error => {
//             console.error(error);
//         });
//         setDataRefresh(false);
//     };
//
//     refreshData();
// }