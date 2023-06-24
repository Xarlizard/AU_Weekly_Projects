import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useState, useEffect } from 'react';

function App() {
  const [userAddress, setUserAddress] = useState('');
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  const [button1Text, setButton1Text] = useState("Connect wallet");
  const [button2Text, setButton2Text] = useState("Check ERC-20 Token Balances");
  const [walletConnected, setWalletConnetcted] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [loading, setLoading] = useState(false);

  function loadAnimation() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  //Connect to Wallet button function
   function connectWallet(){
    var account;
   
    ethereum.request({method: 'eth_requestAccounts'})
      .then(accounts => {
        account = accounts[0];
        console.log(account);
        setUserAddress(account);
        setButton1Text(account.slice(0, 5) + "...." + account.slice(-5, -1));
        setButton2Text("Check Wallet Token Balances");
        setWalletConnetcted(true);
      })
      .catch( error => { setWalletConnetcted(false); setButton1Text("Wallet error. Try again")});
  }

  async function getTokenBalance() {
  
    const config = {
      apiKey: import.meta.env.VITE_API_KEY, // <-- This variable must be declared inside a .env file
      network: Network.ETH_MAINNET,
    };

    const alchemy = new Alchemy(config);
    const data = await alchemy.core.getTokenBalances(userAddress);

    setResults(data);

    const tokenDataPromises = [];

    for (let i = 0; i < data.tokenBalances.length; i++) {
      const tokenData = alchemy.core.getTokenMetadata(
        data.tokenBalances[i].contractAddress
      );
      tokenDataPromises.push(tokenData);
    }

    setTokenDataObjects(await Promise.all(tokenDataPromises));
    setHasQueried(true);
  }
  return (
    <Box w="100vw">
      {loading && (<div className="loader-container"><div className="spinner"></div></div>)}

      <Center>
        <Flex
          alignItems={'center'}
          justifyContent="center"
          flexDirection={'column'}
        >
          <Heading mb={0} fontSize={36}>
            ERC-20 Token Indexer
          </Heading>
          <Text>
            Plug in an address and this website will return all of its ERC-20
            token balances!
          </Text>
        </Flex>
      </Center>
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent={'center'}
      >
        <Heading mt={42}>
          Get all the ERC-20 token balances of this address:
        </Heading>

        <div>
          { !walletConnected && (
            <Button className="connectWallet" onClick={() => {connectWallet();}} >Connect to wallet</Button>
          )}
          { walletConnected && (
            <Button className="disconnectWallet" onClick={() => window.location.reload(false)} 
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}>
              {!isShown && (
                <div>{button1Text}</div>
              )}
              {isShown && (
                <div> - Disconnect - </div>
              )}
            </Button>
          )}
            <Button onClick={ () => {getTokenBalance(); loadAnimation();}} bgColor="blue">{button2Text}</Button>
            <p></p>
        </div>

        { !walletConnected && (
          
            <Input
              onChange={(e) => setUserAddress(e.target.value)}
              w="600px"
              textAlign="center"
              p={4}
              fontSize={24}
            />
        )}

        <Heading my={36}>ERC-20 token balances:</Heading>
 
        {hasQueried ? (
          <SimpleGrid w={'90vw'} columns={4} spacing={24}>
            {results.tokenBalances.map((e, i) => {
              return (
                <Flex
                  flexDir={'column'}
                  color="white"
                  bg="blue"
                  w={'20vw'}
                  key={e.id}
                >
                  <Box>
                    <b>Symbol:</b> ${tokenDataObjects[i].symbol}&nbsp;
                  </Box>
                  <Box>
                    <b>Balance:</b>&nbsp;
                    {Utils.formatUnits(
                      e.tokenBalance,
                      tokenDataObjects[i].decimals
                    )}
                  </Box>
                  <Image src={tokenDataObjects[i].logo} />
                </Flex>
              );
            })}
          </SimpleGrid>
        ) : (
          'Please make a query! This may take a few seconds...'
        )} 
        
        
      </Flex>
    </Box>
  );
}

export default App;
