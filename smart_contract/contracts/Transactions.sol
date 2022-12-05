// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCounter;

    event Transfer(
        address form,
        address to,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    struct TransactionStruct {
        address sender;
        address reciver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }
    TransactionStruct[] transcations;

    function setTranscation(
        address payable reciver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public {
        //    return transcations;
        transactionCounter += 1;

        transcations.push(
            TransactionStruct(
                msg.sender,
                reciver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );

        emit Transfer(
            msg.sender,
            reciver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    function getAllTranscations()
        public
        view
        returns (TransactionStruct[] memory)
    {
        return transcations;
    }

    function getAllTranscationCount() public view returns (uint256) {
        return transactionCounter;
    }
}
