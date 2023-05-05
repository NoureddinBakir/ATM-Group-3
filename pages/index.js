import Login from "./login";
import { useRouter } from "next/router";
import { useUser } from '@supabase/auth-helpers-react'

export default function Index() {
    const router = useRouter();

    // When putting if statement in the async function, would only route to login page even after verifying session
    if (useUser() == null) {
        return <Login />;
    } else {
        router.push("/home");
    }

}
