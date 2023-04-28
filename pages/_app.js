import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/Home.module.css'
import Navbar from "../components/NavBar";

function MyApp({Component, pageProps}) {
    return (
        <>
            <Navbar/>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
