import React from 'react';
import './NavBar.css';

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
        <div className='navBar'>
            <div className='util'>
                {/*Left side - Social media Icons*/}
                <div>Facebook</div>
                <div>Twitter</div>
                <div>Email</div>

                {/* Right Side - Sections and Connect*/}
                <div>About</div>
                <div>Mint</div>
                <div>Admin</div> 
            </div>
            

            {/* Connect */}
            { isConnected ? (
                <div>
                    <p>Connected</p>
                    <p>Account: {accounts}</p>
                </div>
            ): (
                <button onClick={connectAccount}>Connect Wallet</button>
            )}
        </div>
    )
}

export default NavBar;