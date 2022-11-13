import { MoralisProvider } from "react-moralis"
import "../styles/globals.css"
import { NotificationProvider } from "web3uikit"

function MyApp({ Component, pageProps }) {
    // initializeOnMount = is the optionality to hook into the server to add some functionality, which we don't want
    return (
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                <Component {...pageProps} />
            </NotificationProvider>
        </MoralisProvider>
    )
}

export default MyApp
