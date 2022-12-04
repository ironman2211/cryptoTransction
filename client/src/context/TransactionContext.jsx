import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils.js/constants";

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
      if (accounts.length !== 0) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
      throw error;
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
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        sendTransaction,
        handleChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
