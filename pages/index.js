import Home from "./home";
import Login from "./login";

const loggedIn = true;

export default function Index() {
    if (!loggedIn) {
        return (
            <Login/>
        )

    } else {
        return <Home/>
    }
}
