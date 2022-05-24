import { Route, Routes, useNavigate } from 'react-router-dom'

import logo from './images/coupon_logo.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import {
  faQrcode,
  faTools,
  faTicketAlt,
} from '@fortawesome/free-solid-svg-icons'
import Connect from './components/Connect'
import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import Admin from './pages/Admin'
import Buy from './pages/Buy'
import CheckIn from './pages/CheckIn'
import Page from './layouts/Page'
import Wallet from './pages/Wallet'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import TekCouponNFT from "./artifacts/contracts/TekCouponNFT.sol/TekCouponNFT.json"

function App() {
  const navigate = useNavigate()
  const [address, setAddress] = useState(null)
  const [connectedContract, setConnectedContract] = useState(null);
  const SMART_CONTRACT_ADDRESS = "0x432adb4CD7fAAeD9F5536830285bca58026778a7";
  const [isOwner, setIsOwner] = useState(false);
  
  console.log("address", address)
  console.log(process.env.SMART_CONTRACT_ADDRESS)
  console.log('connected contract', connectedContract)
  console.log()
  useEffect(() => {
    if (!address) {
      const previousAddress = window.localStorage.getItem('wallet-address')
      if (previousAddress) {
        setAddress(previousAddress)
      }
    }
  }, [address])

  const getConnectedContract = async () => {
    if (window.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        SMART_CONTRACT_ADDRESS,
        TekCouponNFT.abi,
        signer
      );
      setConnectedContract(connectedContract);
    }
  }
  
  useEffect(() => {
    getConnectedContract()
  }, [])

  useEffect(() => {
    const checkIsContractOwner = async () => {
      if (!address || !connectedContract) return;
      const ownerAddress = await connectedContract.owner();
      if (address.toLowerCase() === ownerAddress.toLowerCase()){

      }
    }
  },[address, connectedContract])
  
  return (
    <Page>
      <Connect
        address={address}
        onConnect={(address) => {
          setAddress(address)
          window.localStorage.setItem('wallet-address', address)
        }}
        onDisconnect={() => {
          setAddress(null)
          window.localStorage.removeItem('wallet-address')
        }}
      />
      <Menu
        left="0"
        _hover={{
          bg: 'purple.500',
          fontWeight: 'bold',
        }}
      >
        {({ isOpen }) => (
          <>
            <MenuButton
              position="absolute"
              top="25px"
              right="20px"
              as={Button}
              colorScheme="blue"
              rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            >
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate('/')}>
                <Flex
                  alignItems="center"
                  flexDirection="row"
                  width="100%"
                  justifyContent="space-between"
                >
                  Buy Coupon
                  <FontAwesomeIcon icon={faEthereum} size="lg" />
                </Flex>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => navigate('/wallet')}>
                <Flex
                  alignItems="center"
                  flexDirection="row"
                  width="100%"
                  justifyContent="space-between"
                >
                  Your Coupons
                  <FontAwesomeIcon icon={faTicketAlt} size="lg" />
                </Flex>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => navigate('/check-in')}>
                <Flex
                  alignItems="center"
                  flexDirection="row"
                  width="100%"
                  justifyContent="space-between"
                >
                  Redeem Coupon
                  <FontAwesomeIcon icon={faQrcode} size="lg" />
                </Flex>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => navigate('/admin')}>
                <Flex
                  alignItems="center"
                  flexDirection="row"
                  width="100%"
                  justifyContent="space-between"
                >
                  Settings
                  <FontAwesomeIcon icon={faTools} size="lg" />
                </Flex>
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
      <Flex
        alignItems="flex-start"
        flex="1 1 auto"
        flexDirection="column"
        justifyContent="center"
        width="100%"
      >
        <Image src={logo} alt="DAO logo" margin="36px auto 12px" width="15%" />
        <Routes>
          <Route path="/" element={<Buy address={address} />} />
          <Route path="/check-in" element={<CheckIn />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </Flex>
    </Page>
  )
}

export default App
