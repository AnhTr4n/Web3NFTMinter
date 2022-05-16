import {
    Button,
    Box,
    Flex,
  } from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
  function Connect({address, onConnect, onDisconnect}) {
    const navigate = useNavigate();
    const connectWallet = async () => {
        if(window.ethereum){
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts"
                });
                onConnect(accounts[0]);
             }catch (err) {
                 console.log(err);
             }
        } 
    }

    const disconnectWallet = () => {
        onDisconnect();
        navigate("/");
    }
    return (
      <Flex
        fontWeight="bold"
        position="center"
        zIndex="10"
      >
        {address && (
            <Box
            bg="red"
            minW="120px"
            p="8px 16px"
            borderRadius="10px"
            textAlign="center"
            marginRight="10px"
            >
                <Button
                    onClick={disconnectWallet}
                    colorScheme="purple"
                    size="lg"
                    variant="link"
                    color="white"
                >
                    Disconnect wallet
                </Button>
            </Box>
        )}
        <Box
          bg="pink"
          minW="120px"
          p="8px 16px"
          borderRadius="10px"
          textAlign="center"
        >
        {!address && (
            <Button
            onClick={connectWallet}
            colorScheme="purple"
            size="lg"
            variant="link"
            color="purple"
          >
            Connect your wallet
          </Button>
        )}
          

          {address && (
            <span>
                {address.slice(0,6)}
                ...{address.slice(-4)}
            </span>
        )}
        </Box>
      </Flex>
    );
  }
  
  export default Connect;