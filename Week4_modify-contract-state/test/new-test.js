// import testing libraries: https://www.chaijs.com/guide/styles/ 
const { expect, assert } = require("chai");

// the `describe` scope encapsulates an entire test called `TestModifyVariable`
// the `it` says the behavior that should be expected from the test
describe("Test new-test", function () {
  it("should change x to the passed parameter, in this case 42069", async function () {
    // this line creates an ethers ContractFactory abstraction: https://docs.ethers.org/v5/api/contract/contract-factory/
    const ModifyVariable = await ethers.getContractFactory("ModifyVariable");

    // we then use the ContractFactory object to deploy an instance of the contract
    const contract = await ModifyVariable.deploy(10, "Hello World");

    // wait for contract to be deployed and validated!
    await contract.deployed();

    // modify x from 10 to 1337 via this function!
    await contract.modifyNum(42069);
    // getter for state variable x
    const newX = await contract.x();
    assert.equal(newX.toNumber(), 42069);
  });
  it("should change y to the passed parameter, in this case 'Hola me llamo Coco Loco'", async function () {
    // this line creates an ethers ContractFactory abstraction: https://docs.ethers.org/v5/api/contract/contract-factory/
    const ModifyVariable = await ethers.getContractFactory("ModifyVariable");

    // we then use the ContractFactory object to deploy an instance of the contract
    const contract = await ModifyVariable.deploy(10, "Hello World");

    // wait for contract to be deployed and validated!
    await contract.deployed();

    // modify y from "Hello World" to "Hola me llamo Coco Loco" via this function!
    await contract.modifyString("Hola me llamo Coco Loco");
    // getter for state variable y
    const newY = await contract.y();
    assert.equal(newY.toString(), "Hola me llamo Coco Loco");
  });
});