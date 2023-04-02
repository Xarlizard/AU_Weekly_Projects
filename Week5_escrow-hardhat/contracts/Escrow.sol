// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Escrow {
	address public arbiter;
	address public depositor;
	address public beneficiary;

	bool public isApproved;

	constructor(address _arbiter, address _beneficiary) payable {
		beneficiary = _beneficiary;
		depositor = msg.sender;
		arbiter = _arbiter;
	}

	event Approved(uint);

	function approve() external {
		require(msg.sender == arbiter);
		uint balance = address(this).balance;
		(bool sent, ) = payable(beneficiary).call{value: balance}("");
 		require(sent, "Failed to send Ether");
		emit Approved(balance);
		isApproved = true;
	}
}
