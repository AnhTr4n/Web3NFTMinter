# NFT Minter Hardhat Project

How to run the web3 app

1. Have a metamask wallet extension set up and create your own personal wallet

2. Create .env file with these attributes:
```shell
ALCHEMY_API_URL=
ETHERSCAN_WEB3_MINT_NFT_API_KEY=
PRIVATE_KEY=
PUBLIC_KEY=
```
3. Install dependencies
```shell
npm i
```

4. Compile smart contract, run:
```shell
npx hardhat compile
```
========================================================================================================
When you create new contract or update a current one:

To deploy a new smart contract to a testnet (for example: ropsten testnet network), run: 
```shell
npx hardhat run scripts/TekCouponNFTDeploy.js --network ropsten
```

To verify deployed contract on Etherscan and to be able to read and write contract directly on Etherscan
```shell
npx hardhat verify  --network networkName contractAddress
```

Development dependencies:
```shell
hardhat
@nomiclabs/hardhat-etherscan                     // Give us etherscan verify command on hardhat
ndotenv                                           // Use environnement variables in .env
@openzeppelin/contracts                          // Provide secure way of writing smart contract
base64-sol
```