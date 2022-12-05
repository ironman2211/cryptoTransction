import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();
const { ethereum } = window;

const getEthereumContract = () => {
  /// Get the provider and signer
  /// Get The Provider
  const provider = new ethers.providers.Web3Provider(ethereum);
  /// Get the signer
  const signer = provider.getSigner();
  /// Get the contract
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return transactionContract;
};

export const TransactionContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount") || 0);
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const checkIFWalletIsConnected = async () => {
    try {
      if (!ethereum) alert("Make sure you have metamask!");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log(accounts);
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getallTranscation();
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
const getallTranscation = async () => {
try {
  if(!ethereum) alert("Make sure you have metamask!");
  const transactionContract = getEthereumContract();

  const availableTransaction = await transactionContract.getAllTranscations();

  const structuredTransactions = availableTransaction.map((transaction) => ({
    addressTo: transaction.receiver,
    addressFrom: transaction.sender,
    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
    message: transaction.message,
    keyword: transaction.keyword,
    amount: parseInt(transaction.amount._hex) / (10 ** 18)
  }));

  console.log(structuredTransactions);

  setTransactions(structuredTransactions);

} catch (error) {
  console.log(error);
  throw error;
  
}
}

  const checkIfTransactionExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getAllTranscationCount();
      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (error) {
      console.log(error);
    throw new Error(error);
    }
  
  };


  const connectWallet = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const sendTransaction = async () => {
   try {
    if(!ethereum) alert("Make sure you have metamask!");
    const { addressTo, amount, keyword, message } = formData;
    if (!addressTo || !amount || !keyword || !message) return alert("Please fill all the fields");

   const transactionContract = getEthereumContract();
   const parsedAmount = ethers.utils.parseEther(amount);
   await ethereum.request({
      method:"eth_sendTransaction",
      params:[{
          from: currentAccount,
          to:addressTo,
          gas:"0x76c0",
          value: parsedAmount._hex,
        }]
    })
   const TransactionHash = transactionContract.setTranscation(addressTo,parsedAmount, message, keyword);
   setLoading(true);
   console.log("Loading......", TransactionHash);
   await TransactionHash.wait();
    setLoading(false);
    console.log("Transaction Completed....", TransactionHash);
const transactionCount = await transactionContract.getTransactionCount();
console.log("Transaction Count", transactionCount);
setTransactionCount(transactionCount);

    
   } catch (error) {
     console.log(error);
   
    
   }
    
  };
  useEffect(() => {
    checkIFWalletIsConnected();
    checkIfTransactionExist();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        sendTransaction,
        handleChange,
        formData,
        transactions
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
