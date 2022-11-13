import React from "react"
import { useMoralis } from "react-moralis"
//useMoralis is react hook, use to track states in our application
import { useEffect } from "react"

const ManualHeader = () => {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis()
    // hooks are way to re-render our app automatically when something changes
    // isWeb3EnableLoading checks to see if metamask is popped up

    useEffect(() => {
        // if already connected to web3 then return
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            // if you are connected then run enableWeb3()
            // if we refresh, metamask doesn't ask to connect
            // it will get connected automatically
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)

            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
            }
        })
    }, [])

    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 6)}...{account.length - 4}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()
                        // to store that we have already been connected
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected")
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </div>
    )
}

export default ManualHeader
