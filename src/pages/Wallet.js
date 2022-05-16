import {
    Flex,
    Heading,
    Text,
  } from "@chakra-ui/react";
  
  function Wallet() {
    return (
      <>
        <Heading mb={4}>
          Your coupons
        </Heading>
        <Flex
          justifyContent="center"
          mb={8}
        >
          <Text
            fontSize="xl"
            mb={2}
            width="100%"
          >
            You don't own any coupons 😢
          </Text>
        </Flex>
      </>
    );
  }
  
  export default Wallet;