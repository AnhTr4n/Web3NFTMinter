import { useState } from "react";
//Ethers package allows you to connect to blockchain easily
import { ethers, BigNumber } from "ethers";
import TekCouponNFT from './TekCouponNFT.json';

const tekCouponNFTContractAddress = "0xCa99934AE9D71b53DA08fD96B4Ae524aF5A4E625";
const MainMint = ({accounts, setAccounts}) => {
    const [mintAmount, setMintAmount] = useState(1);
    //check if accounts[0] exists
    const isConnected = Boolean(accounts[0]);
    async function handleMint() {
        if (window.ethereum) {
            //Provide a way for ethers to connect to the blockchain
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                tekCouponNFTContractAddress,
                TekCouponNFT.abi,
                signer
            );
            try {
                //Solidity requires to have big number
                const response = await contract.mint(BigNumber.from(mintAmount));
                console.log('response', response)
            } catch (err) {
                console.log("error", err)
            }
        }
    }
    
    const handleDecrement = () => {
        if(mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    }

    const handleIncrement = () => {
        if(mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    }

    return (
        <div>
            <h1>TekCouponNFT</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tortor metus, maximus at sollicitudin eget, 
            ultricies id nulla. Nam pretium sapien sed lorem posuere viverra.
            </p>
            {isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type="number" value={mintAmount}/>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <button onClick={handleMint}>Mint Coupon</button>
                </div>
            ): (
                <div>
                    <p>You must connect your waller to mint</p>
                </div>
            )}
        </div>
    )
}

export default MainMint;