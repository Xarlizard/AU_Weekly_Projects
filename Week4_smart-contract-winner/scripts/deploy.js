const ethers = require('ethers');
require('dotenv').config();

async function main() {
  const url = process.env.GOERLI_URL;
  let artifacts = await hre.artifacts.readArtifact("MyContract");
  const provider = new ethers.providers.JsonRpcProvider(url);
  let privateKey = process.env.PRIVATE_KEY;
  let wallet = new ethers.Wallet(privateKey, provider);
  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);

  let myContract = await factory.deploy();
  console.log("MyContract address:", myContract.address);
  
  await myContract.deployed();

  let tx = await myContract.makeAttempt(process.env.EXTERNAL_CONTRACT_ADDRESS);
  console.log(tx);
}

// Contract address generated after deployment has been: 0x656695040182b44bE8F5405c50b34b59C66264D7
// URL to etherscan(goerli) page showing it: https://goerli.etherscan.io/address/0x656695040182b44bE8F5405c50b34b59C66264D7

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});