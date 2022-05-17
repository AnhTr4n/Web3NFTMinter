import {
  Button,
  ButtonGroup,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import TekCouponNFT from '../TekCouponNFT.json';
function Buy({address}) {
  const tekCouponNFTContractAddress = "0x432adb4CD7fAAeD9F5536830285bca58026778a7";
  const [mintAmount, setMintAmount] = useState(1);

  console.log(address)
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

  return (
    <>
      {window.ethereum && (
        <>
          <Heading mb={4}>
            TekCoupon 2022
          </Heading>
          <Text fontSize="xl" mb={4}>
            Connect your wallet to mint your
            NFT Coupon. It'll be redeemed to when you checkout!
          </Text>
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            margin="0 auto"
            maxW="140px"
          >
            <ButtonGroup mb={4}>
              <Button
                loadingText="Pending"
                size="lg"
                colorScheme="teal"
                onClick={handleMint}
              >
                Buy Coupon!
              </Button>
            </ButtonGroup>
          </Flex>
        </>
      )}
    </>
  );
}

export default Buy;