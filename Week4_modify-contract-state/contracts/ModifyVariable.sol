//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ModifyVariable {
  uint public x;
  string public y;

  constructor(uint _x, string memory _y){
    x = _x;
    y = _y;
  }

  function modifyToLeet() public {
    x = 1337;
  }

  function modifyNum(uint _x) public {
    x = _x;
  }

  function modifyString(string memory _y) public returns(string memory) {
    y = _y;
    return y;
  }

}