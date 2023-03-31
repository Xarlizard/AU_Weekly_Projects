import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

function Block() {
  const { id } = useParams();
  const timestamp = (new Date().valueOf())/1000;
  const [block, setBlock] = useState({
    timestamp: timestamp,
    transactions: "",
    miner: "0x000000...00000000",
    _difficulty: "",
    gasUsed: "",
    gasLimit: "",
    baseFeePerGas: "",
    extraData:"0x000000000000000000000000000000",
    hash:"",
    parentHash:"",
  });
  const [blockReward, setBlockReward] = useState(0);

  useEffect(() => {
    const getBlock = async () => {
      const block = await alchemy.core.getBlock(Number(id));
      setBlock(block);
    };
    getBlock();
  },[id]);

    return (
      <div className="app">
      <div className="container LastBlock">
        <h2 className="blueBig">Block: #{block.number}</h2> 
        
        <div><hr></hr></div>
        <pre>Block heigth:            {block.number || "00000000"}</pre>
        <pre>Timestamp:               {parseInt(timestamp - block.timestamp) || "00"} seconds ago</pre>  
        <pre>Transactions:            <span className="blue">{block.transactions.length || "00"} Txs</span> in 12 sec</pre>
        <div><hr></hr></div>
        <pre>Fee recipient:           <span className="blue">{block.miner.slice(0, 8) + "..." + block.miner.slice(-8)}</span></pre>
        <pre>Total difficulty:        {block._difficulty.toString() || "0"}</pre>
        <pre>Extra data:              {block.extraData}</pre>
        <div><hr></hr></div>
        <pre>Gas used:                {block.gasUsed.toString() || "0000000"}</pre>
        <pre>Gas limit:               {block.gasLimit.toString() || "000000000"}</pre>
        <pre>Base fee per gas:        {block.baseFeePerGas.toString() || "00000000000"}</pre>
        <div><hr></hr></div>
        <pre>Hash:                    {block.hash || "0x0000000000000000000000000000000000000000000000000000000000000000"}</pre>
        <pre>Parent Hash:             {block.parentHash || "0x0000000000000000000000000000000000000000000000000000000000000000"}</pre>

      </div>
      </div>
    );
}

export default Block;
