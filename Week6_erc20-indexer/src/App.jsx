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
} from "@chakra-ui/react";
import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useState, useEffect } from "react";

function App() {
  const [userAddress, setUserAddress] = useState("");
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
  function connectWallet() {
    var account;

    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        account = accounts[0];
        console.log(account);
        setUserAddress(account);
        setButton1Text(account.slice(0, 5) + "...." + account.slice(-5, -1));
        setButton2Text("Check Wallet Token Balances");
        setWalletConnetcted(true);
      })
      .catch((error) => {
        setWalletConnetcted(false);
        setButton1Text("Wallet error. Try again");
      });
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
      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      )}

      <Center>
        <Flex
          alignItems={"center"}
          justifyContent="center"
          flexDirection={"column"}
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
        justifyContent={"center"}
      >
        <Heading mt={42}>
          Get all the ERC-20 token balances of this address:
        </Heading>

        <div possition="fixed">
          <div>
            {!walletConnected && (
              <Button
                className="connectWallet"
                onClick={() => {
                  connectWallet();
                }}
              >
                Connect to wallet
              </Button>
            )}
            {walletConnected && (
              <Button
                className="disconnectWallet"
                onClick={() => window.location.reload(false)}
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
              >
                {!isShown && <div>{button1Text}</div>}
                {isShown && <div> - Disconnect - </div>}
              </Button>
            )}
            <Button
              onClick={() => {
                getTokenBalance();
                loadAnimation();
              }}
              bgColor="blue"
            >
              {button2Text}
            </Button>
          </div>
        </div>

        <form className="search-form">
          <input
            type="search"
            defaultValue=""
            placeholder="Address"
            className="search-input"
          />
          <Button
            className="search-button"
            float="left"
            onClick={() => {
              getTokenBalance();
              loadAnimation();
            }}
          >
            <svg className="submit-button">
              <use
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref="#search"
              ></use>
            </svg>
          </Button>
          <div className="search-option">
            <div>
              <input type="radio" id="type-wallet" />
              <label htmlFor="type-wallet">
                <svg className="edit-pen-title">
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#wallet"
                  ></use>
                </svg>
                <span>{button1Text}</span>
              </label>
            </div>
          </div>
        </form>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="0"
          height="0"
          display="none"
        >
          <symbol id="search" viewBox="0 0 32 32">
            <path d="M 19.5 3 C 14.26514 3 10 7.2651394 10 12.5 C 10 14.749977 10.810825 16.807458 12.125 18.4375 L 3.28125 27.28125 L 4.71875 28.71875 L 13.5625 19.875 C 15.192542 21.189175 17.250023 22 19.5 22 C 24.73486 22 29 17.73486 29 12.5 C 29 7.2651394 24.73486 3 19.5 3 z M 19.5 5 C 23.65398 5 27 8.3460198 27 12.5 C 27 16.65398 23.65398 20 19.5 20 C 15.34602 20 12 16.65398 12 12.5 C 12 8.3460198 15.34602 5 19.5 5 z" />
          </symbol>
          <symbol id="wallet" viewBox="0 0 512 512">
            <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
          </symbol>
        </svg>

        <Heading my={36}>ERC-20 token balances:</Heading>

        {hasQueried ? (
          <SimpleGrid w={"90vw"} columns={4} spacing={24}>
            {results.tokenBalances.map((e, i) => {
              return (
                <Flex
                  flexDir={"column"}
                  color="white"
                  bg="blue"
                  w={"20vw"}
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
          "Please make a query! This may take a few seconds..."
        )}
      </Flex>
    </Box>
  );
}

export default App;
