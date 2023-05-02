import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/Home.module.css'
import NavBar from "../components/navBar"
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

function MyApp({Component, pageProps}) {
    const [supabaseClient] = useState(() => createBrowserSupabaseClient())
    return (
        <SessionContextProvider
            supabaseClient={supabaseClient}
            intialSession={pageProps.initialSession}
        >
            <NavBar/>
            <Component {...pageProps} />
        </SessionContextProvider>
    )
}

export default MyApp
