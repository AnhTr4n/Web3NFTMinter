import React from 'react';

const NavBar = ({accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);
    async function connectAccount() {
        // metamask injects the application with window.ethereum
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            setAccounts(accounts);
        }
    }
    return (
        <div>
            {/*Left side - Social media Icons*/}
            <div>Facebook</div>
            <div>Twitter</div>
            <div>Email</div>

            {/* Right Side - Sections and Connect*/}
            <div>About</div>
            <div>Mint</div>
            <div>Team</div>

            {/* Connect */}
            { isConnected ? (
                <p>Connected</p>
            ): (
                <button onClick={connectAccount}>Connect Wallet</button>
            )}
        </div>
    )
}

export default NavBar;