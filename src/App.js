// import './App.css';
// import { useState } from 'react';
// import MainMint from './MainMint';
// import NavBar from './NavBar';

// function App() {
//   const [accounts, setAccounts] = useState([]);
//   return (
//     <div className="overlay">
//       <div className="App">
//         <NavBar
//         accounts={accounts} setAccounts={setAccounts}
//         />
//         <MainMint
//         accounts={accounts} setAccounts={setAccounts}
//         />
//       </div>
//       <div className="moving-background"></div>
//     </div>
//   );
// }

// export default App;

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
import { useState, useEffect } from "react";

function App() {
  const navigate = useNavigate()
  const [address, setAddress] = useState(null);

  console.log(address);

  return (
      <Page>
          <Connect address={address} 
          onConnect={(address) => {
            setAddress(address);
            window.localStorage.setItem(
              "wallet-address",
              address
            )
          }} 

          onDisconnect = {() => {
            setAddress(null);
            window.localStorage.removeItem(
              "wallet-address"
            )
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
          <Image
            src={logo}
            alt="DAO logo"
            margin="36px auto 12px"
            width="15%"
          />
          <Routes>
            <Route path="/" element={<Buy />} />
            <Route path="/check-in" element={<CheckIn />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/wallet" element={<Wallet />} />
          </Routes>
        </Flex>
      </Page>
  )
}

export default App
