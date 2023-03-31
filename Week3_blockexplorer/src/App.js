import { Alchemy, Network } from "alchemy-sdk";
import React from "react";
import { BrowserRouter , Route , Routes , Link} from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Block from "./pages/Block";
import Tx from "./pages/Tx";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

export default function App() {
  const [blockNumber, setBlockNumber] = useState(0);
  const [nonce, setNonce] = useState(0);

  useEffect(async ()=>{
    setBlockNumber(await alchemy.core.getBlockNumber() + 1);
    setTimeout(()=>{
      setNonce(nonce + 1);
    }, 10000)
  }, [nonce])
  

  return (
    <BrowserRouter>
      <div className="app">
        <div className="navigation_bar">
          <form className="app">
            <Link to="/">Home</Link>
          </form>
        </div>
        <Routes>
          <Route path="/" element={<Home blockNumber={blockNumber} />} />
          <Route path="/block/:id" element={<Block />} />
          <Route path="/tx/:id" element={<Tx />} />
        </Routes>
      </div>
    </BrowserRouter>
    );
}
