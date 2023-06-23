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
import { useState } from 'react';

function App() {
  const [userAddress, setUserAddress] = useState('');
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  const [button1Text, setButton1Text] = useState("Connect wallet");
  const [button2Text, setButton2Text] = useState("Check ERC-20 Token Balances");
  const [walletConnected, setWalletConnetcted] = useState(false);

   function connectToWallet(){
    var account;
   
    ethereum.request({method: 'eth_requestAccounts'})
      .then(accounts => {
        account = accounts[0];
        console.log(account);
        setUserAddress(account);
        setButton1Text("Connected");
        setButton2Text("Check  " + account.slice(0, 7) + "....." + account.slice(-7, -1) + " Token Balances");
        setWalletConnetcted(false);
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
          <Button onClick={() => {connectToWallet();}}>{button1Text}</Button>
          <Button onClick={getTokenBalance} bgColor="blue">{button2Text}</Button>
        </div>
        <Input
          onChange={(e) => {setUserAddress(e.target.value); setButton2Text("Check  " + userAddress.slice(0, 7) + "....." + userAddress.slice(-7, -1) + " Token Balances");}}
          color="black"
          w="600px"
          textAlign="center"
          p={4}
          bgColor="white"
          fontSize={24}
        />
        

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
