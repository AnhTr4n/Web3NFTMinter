import { useState } from "react";
//Ethers package allows you to connect to blockchain easily
import { ethers, BigNumber } from "ethers";
import TekCouponNFT from './TekCouponNFT.json';


const tekCouponNFTContractAddress = "0x432adb4CD7fAAeD9F5536830285bca58026778a7";
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
                // value is a property of BigNumber
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString())
                }); 
                console.log('response', response)
            } catch (err) {
                console.log("error", err)
            }
        }
    }

    const handleDecrement = () => {
        // Retrieve accounts from the local node
        if(mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    }

    const handleIncrement = () => {
        console.log(mintAmount);
        if(mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    }

    return (
        <div>
            <h1>TekCouponNFT</h1>
            {isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type="number" defaultValue={mintAmount}/>
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