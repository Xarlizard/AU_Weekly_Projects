import { Alchemy, Network , Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

function Tx() {
  const { id } = useParams();
  const timestamp = (new Date().valueOf())/1000;
  const [nonce, setNonce] = useState(0);
  const [blockNumber, setBlockNumber] = useState(0);
  const [block, setBlock] = useState({gasLimit:"", baseFeePerGas:""});
  const [txValue, setTxValue] = useState(0);
  const [tx, setTx] = useState({
    transactionHash:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    status: "",
    timestamp: "",
    from: "",
    to: "",
    gasUsed: "",
  });


  async function getTx() {
    setTx(await alchemy.core.getTransactionReceipt(id));
  }

  async function getValues() {
    setBlock(await alchemy.core.getBlock(tx.blockNumber));
  }

  useEffect(async () => {
    if(nonce === 0){
      getTx()
        .then(()=>{
          setNonce(1)
        })
        .catch(()=>{
          console.log("getBlockNum error");
        });
    }else{
      getValues();
    }
  },[nonce]);

    return (
      <div className="app">
      <div className="container thisTransactionBlock">
        <h2 className="blueBig">Transaction: #{tx.transactionHash.slice(0, 8) + "..." + tx.transactionHash.slice(-8)}</h2> 
        
        <div><hr></hr></div>
        <pre>Transaction hash:             {tx.transactionHash}</pre>
        <pre>Status:                       {tx.status || 0}</pre>
        <pre>Block:                        <span className="blue"><Link to={`../block/${tx.blockNumber}`}>{block.number || "00000000"}</Link></span></pre>
        <pre>Timestamp:                    {parseInt(timestamp - block.timestamp) || "00"} seconds ago</pre>  
        <div><hr></hr></div>
        <pre>From:                         <span className="blue">{tx.from || "0x0000000000000000000000000000000000000000"}</span></pre>
        <pre>To:                           <span className="blue">{tx.to || "0x0000000000000000000000000000000000000000"}</span></pre>
        <div><hr></hr></div>
        <pre>Gas used:                     {tx.gasUsed.toString() || "000000"}</pre>
        <pre>Gas limit:                    {block.gasLimit.toString() || "00000000"}</pre>
        <pre>Base fee per gas:             {block.baseFeePerGas.toString() || "00000000000"}</pre>

      </div>
      </div>
    );
}

export default Tx;
