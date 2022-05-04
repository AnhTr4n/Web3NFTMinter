// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
//Functionalities for only owner
import '@openzeppelin/contracts/access/Ownable.sol';

contract TekCouponNFT is ERC721, Ownable {
    //unsiged integer 256 = 32 bytes
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    // keep track of howmany each wallet has minted so they cannot mint more then the maximum specified
    mapping(address => uint256) public walletMints;

    //Initialize variables in contructor is slightly cheaper than initilize them in declaration
    constructor() payable ERC721('TekCoupon', 'TKC'){
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        //set withdraw wallet address
    }
    /*naming convention: add an "_" at the end of isPublicMintEnable to distinguish 
    between function variable and global variable */

    /* onlyOwner is a modifier from.
    Deployer can be a different wallet. But in this case, owner == deployer */
    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
        isPublicMintEnabled = isPublicMintEnabled_;
    }
    /*
    So currently, reference types comprise structs, arrays and mappings. 
    If you use a reference type, you always have to explicitly provide the 
    data area where the type is stored:

    memory (whose lifetime is limited to a function call)
    storage (the location where the state variables are stored)
    calldata (special data location that contains the function arguments, only available for external function call parameters)
    https://stackoverflow.com/questions/68073689/solidity-data-location-must-be-memory-or-calldata-for-return-parameter-in-f
    */
    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner{
        baseTokenUri = baseTokenUri_;
        // This is where image's gonna be located
    }

    // This function is used by OpenSea
    function tokenURI(uint256 tokenId_) public view override returns (string memory){
        require(_exists(tokenId_), 'Token does not exist');
        /* Take the url we indentify, grab the id and place it behind the uri and attach json to
        the end of it. So this allows opensea to grab url of the image and display it on opensea
        */
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json"));
    }

    function withdraw() external onlyOwner {
        // why the bool success inside ()
        (bool success, ) = withdrawWallet.call{value: address(this).balance}('');
        require (success, 'withdraw failed');
    }
    // payable : anyone requires a value transfer of ether
    // mint function is the MOST important 
    // why is msg and where does it come from?
    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnabled, 'minting not enabled');
        require(msg.value == quantity_ * mintPrice, 'wrong mint value');
        require(totalSupply * quantity_ <= maxSupply, 'sold out');
        // Keep track of quantity a wallet can mint. You CANNOT go by balanceOf because they gonna mint,
        //then transfer, then mint again so maxPerWallet doesn't work with balanceOf
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'exceed max wallet');
        for (uint256 i = 0; i < quantity_; i++){
            uint256 newTokenId = totalSupply + 1;
            totalSupply++; // => effect on storage
            // _safeMint is a function exists in ERC721
            // _msg.sender is the person that call this function
            _safeMint(msg.sender, newTokenId); // interaction
            // you always want effect happens BEFORE interaction
        }
    }
}