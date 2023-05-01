import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/Home.module.css'
import NavBar from "../components/navBar"

function MyApp({Component, pageProps}) {
    return (
        <>
            <NavBar/>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
