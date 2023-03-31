//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface Contract {
        function attempt() external;
    }

contract MyContract {
    address public contractWinner = 0xa1FaAD6A98D395b847b97fb93aeE0e8e7554424e;

    //function makeAttempt() external {
    //    (bool success, ) = contractWinner.call(abi.encodeWithSignature("attempt()"));
    //    require(success);
    //}

    function makeAttempt(address contractAddress) external {
        Contract(contractAddress).attempt();
    }
}