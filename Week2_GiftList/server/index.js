const express = require("express");
const MerkleTree = require("../utils/MerkleTree");
const verifyProof = require("../utils/verifyProof");
const niceList = require("../utils/niceList");
const cors = require("cors");

const port = 1225;

const app = express();
app.use(cors());
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const merkleTree = new MerkleTree(niceList);
const MERKLE_ROOT =
  "b92ff28983a948a4eb00613017b6b2aa4b2308db7f05939fb11ec4243ef5d6e9";

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const { nameCheck } = req.body;
  // TODO: prove that a name is in the list
  const isInTheList = doCheck(nameCheck);

  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function doCheck(nameCheck) {
  const index = niceList.findIndex((n) => n === nameCheck);
  const proved = merkleTree.getProof(index);
  const result = verifyProof(proved, nameCheck, MERKLE_ROOT);
  return result;
}
