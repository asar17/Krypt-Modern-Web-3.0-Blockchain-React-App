// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


//contract like class in c++ 
//how to write contract: contract filename{}
contract Transactions{
    //make varible transactionCount take the type uint256
    uint256 transactionCount;
    //make event take paramters
    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);
    //make struct like object in c++
    struct TransferStruct{
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }
    //make array of object[TransferStruct]
    TransferStruct[] transactions;

    //make function to add ethereum to blockchain
    //this function is public and no return
    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public{
        //increase transactionCount auto when this function call
        transactionCount +=1;
        //pass paramters to transferStruct object
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));
        //emit to event Transfer
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);

    }
    
    //make function to get all transactions
    //this function is public and return value
    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    //make function to get the number of transactions
    //this function is public and return value
    function getTransactionCount() public view returns (uint256){
        return transactionCount;
    }
}