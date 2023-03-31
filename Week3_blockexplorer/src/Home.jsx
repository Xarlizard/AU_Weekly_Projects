import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

function Home({ page, setPage, setInput}) {
  
  const timestamp = (new Date().valueOf())/1000;
  const [nonce, setNonce] = useState(0);
  const [blockNumber, setBlockNumber] = useState(0);
  const [block0, setBlock0] = useState({transactions:"" , miner:"0x00000000"});
  const [block1, setBlock1] = useState({transactions:"" , miner:"0x00000000"});
  const [block2, setBlock2] = useState({transactions:"" , miner:"0x00000000"});
  const [block3, setBlock3] = useState({transactions:"" , miner:"0x00000000"});
  const [block4, setBlock4] = useState({transactions:"" , miner:"0x00000000"});
  const [block5, setBlock5] = useState({transactions:"" , miner:"0x00000000"});

  const [tx0, setTx0] = useState({hash:"0x000000000000...", from:"0x000000...00000000", to:"0x000000...00000000"});
  const [tx1, setTx1] = useState({hash:"0x000000000000...", from:"0x000000...00000000", to:"0x000000...00000000"});
  const [tx2, setTx2] = useState({hash:"0x000000000000...", from:"0x000000...00000000", to:"0x000000...00000000"});
  const [tx3, setTx3] = useState({hash:"0x000000000000...", from:"0x000000...00000000", to:"0x000000...00000000"});
  const [tx4, setTx4] = useState({hash:"0x000000000000...", from:"0x000000...00000000", to:"0x000000...00000000"});
  const [tx5, setTx5] = useState({hash:"0x000000000000...", from:"0x000000...00000000", to:"0x000000...00000000"});
  

  async function getBlockNum(){
    setBlockNumber(await alchemy.core.getBlockNumber());
  }

  async function getBlocks() {
    setBlock0(await alchemy.core.getBlockWithTransactions(blockNumber - 1) || 0);
    setBlock1(await alchemy.core.getBlock(blockNumber - 2) || 0);
    setBlock2(await alchemy.core.getBlock(blockNumber - 3) || 0);
    setBlock3(await alchemy.core.getBlock(blockNumber - 4) || 0);
    setBlock4(await alchemy.core.getBlock(blockNumber - 5) || 0);
    setBlock5(await alchemy.core.getBlock(blockNumber - 6) || 0);
  }
  function getValues() {
    setNonce(2);
    setTx0(block0.transactions[0]);
    setTx1(block0.transactions[1]);
    setTx2(block0.transactions[2]);
    setTx3(block0.transactions[3]);
    setTx4(block0.transactions[4]);
    setTx5(block0.transactions[5]);
 }
  useEffect(async () => {
    if(nonce === 0){
    await getBlockNum()
      .then(()=>{
        getBlocks()
          .then(() =>{
            setNonce(1)
          })
          .catch(()=>{
            console.log("getBlocks Error");
          });
      })
      .catch(() => {
        console.log("getBlockNumError");
      });
    }else if (nonce === 1){
        getValues();
      }
  },[nonce]);


    return (
    <>
      <div className="container latestBlocks">
        <h2>Latest Blocks</h2> 
        
        <div><hr></hr></div>
        <pre ><span className="blueBig">{block0.number || "00000000"}</span>              Fee recipient:  <span className="blue">{block0.miner.slice(0, 8) + "..." + block0.miner.slice(-8) || "0x000000...00000000"}</span></pre>
        <pre>{parseInt(timestamp - block0.timestamp) || "00"} seconds ago            <span className="blue">{block0.transactions.length || "000"} Txs</span> in 12 sec</pre>

        <div><hr></hr></div>
        <pre ><span className="blueBig">{block1.number || "00000000"}</span>              Fee recipient:  <span className="blue">{block1.miner.slice(0, 8) + "..." + block1.miner.slice(-8) || "0x000000...00000000"}</span></pre>
        <pre>{parseInt(timestamp - block1.timestamp) || "00"} seconds ago            <span className="blue">{block1.transactions.length || "000"} Txs</span> in 12 sec</pre>

        <div><hr></hr></div>
        <pre ><span className="blueBig">{block2.number || "00000000"}</span>              Fee recipient:  <span className="blue">{block2.miner.slice(0, 8) + "..." + block2.miner.slice(-8) || "0x000000...00000000"}</span></pre>
        <pre>{parseInt(timestamp - block2.timestamp) || "00"} seconds ago            <span className="blue">{block2.transactions.length || "000"} Txs</span> in 12 sec</pre>

        <div><hr></hr></div>
        <pre ><span className="blueBig">{block3.number || "00000000"}</span>              Fee recipient:  <span className="blue">{block3.miner.slice(0, 8) + "..." + block3.miner.slice(-8) || "0x000000...00000000"}</span></pre>
        <pre>{parseInt(timestamp - block3.timestamp) || "00"} seconds ago            <span className="blue">{block3.transactions.length || "000"} Txs</span> in 12 sec</pre>
        
        <div><hr></hr></div>
        <pre ><span className="blueBig">{block4.number || "00000000"}</span>              Fee recipient:  <span className="blue">{block4.miner.slice(0, 8) + "..." + block4.miner.slice(-8) || "0x000000...00000000"}</span></pre>
        <pre>{parseInt(timestamp - block4.timestamp) || "00"} seconds ago            <span className="blue">{block4.transactions.length || "000"} Txs</span> in 12 sec</pre>
        
        <div><hr></hr></div>
        <pre ><span className="blueBig">{block5.number || "00000000"}</span>              Fee recipient:  <span className="blue">{block5.miner.slice(0, 8) + "..." + block5.miner.slice(-8)}</span></pre>
        <pre>{parseInt(timestamp - block5.timestamp) || "00"} seconds ago            <span className="blue">{block5.transactions.length || "000"} Txs</span> in 12 sec</pre>
        <div><hr></hr></div>

      </div>

      <div className="container latestTransactions">
        <h2>Latest Transactions</h2> 

        <div><hr></hr></div>
        <pre ><span className="blueBig">{tx0.hash.slice(0, 14)+"..."}</span>      From:  <span className="blue">{tx0.from.slice(0, 8) + "..." + tx0.from.slice(-8)}</span></pre>
        <pre>{parseInt(timestamp - block0.timestamp) || "00"} seconds ago                 To: <span className="blue">{tx0.to.slice(0, 8) + "..." + tx0.to.slice(-8)}</span> </pre>

        <div><hr></hr></div>
        <pre ><span className="blueBig">{tx1.hash.slice(0, 14)+"..."}</span>      From:  <span className="blue">{tx1.from.slice(0, 8) + "..." + tx1.from.slice(-8)}</span></pre>
        <pre>{parseInt(timestamp - block0.timestamp) || "00"} seconds ago                 To: <span className="blue">{tx1.to.slice(0, 8) + "..." + tx1.to.slice(-8)}</span> </pre>

        <div><hr></hr></div>
        <pre ><span className="blueBig">{tx2.hash.slice(0, 14)+"..."}</span>      From:  <span className="blue">{tx2.from.slice(0, 8) + "..." + tx2.from.slice(-8)}</span></pre>
        <pre>{parseInt(timestamp - block0.timestamp) || "00"} seconds ago                 To: <span className="blue">{tx2.to.slice(0, 8) + "..." + tx2.to.slice(-8)}</span> </pre>

        <div><hr></hr></div>
        <pre ><span className="blueBig">{tx3.hash.slice(0, 14)+"..."}</span>      From:  <span className="blue">{tx3.from.slice(0, 8) + "..." + tx3.from.slice(-8)}</span></pre>
        <pre>{parseInt(timestamp - block0.timestamp) || "00"} seconds ago                 To: <span className="blue">{tx3.to.slice(0, 8) + "..." + tx3.to.slice(-8)}</span> </pre>

        <div><hr></hr></div>
        <pre ><span className="blueBig">{tx4.hash.slice(0, 14)+"..."}</span>      From:  <span className="blue">{tx4.from.slice(0, 8) + "..." + tx4.from.slice(-8)}</span></pre>
        <pre>{parseInt(timestamp - block0.timestamp) || "00"} seconds ago                 To: <span className="blue">{tx4.to.slice(0, 8) + "..." + tx4.to.slice(-8)}</span> </pre>

        <div><hr></hr></div>
        <pre ><span className="blueBig">{tx5.hash.slice(0, 14)+"..."}</span>      From:  <span className="blue">{tx5.from.slice(0, 8) + "..." + tx5.from.slice(-8)}</span></pre>
        <pre>{parseInt(timestamp - block0.timestamp) || "00"} seconds ago                 To: <span className="blue">{tx5.to.slice(0, 8) + "..." + tx5.to.slice(-8)}</span> </pre>
        <div><hr></hr></div>

        </div>
    </>
    );

}

export default Home;
