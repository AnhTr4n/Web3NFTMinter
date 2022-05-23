# NFT Minter Hardhat Project

Create react-app
npx creat-react-app [name]

Development dependencies:
```shell
npm i -D hardhat
npm i -D @nomiclabs/hardhat-etherscan                     // Give us etherscan verify command on hardhat
npm i -D dotenv                                           // Use environnement variables in .env
npm i -D @openzeppelin/contracts                          // Provide secure way of writing smart contract
npm i -D base64-sol
```
Compile smart contract, run:
```shell
npx hardhat compile
```

To deploy a smart contract to a testnet (for example: ropsten testnet network), run: 
```shell
npx hardhat run scripts/TekCouponNFTDeploy.js --network ropsten
```

To verify deployed contract on Etherscan and to be able to read and write contract directly on Etherscan
```shell
npx hardhat verify  --network networkName contractAddress
```