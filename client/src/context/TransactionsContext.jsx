import React,{useEffect,useState} from 'react'
//this package to interact between react app and blockchain
import { ethers } from "ethers";
import {contractAddress,contractABI} from '../utils/constants';
export const TransactionContext = React.createContext();
const { ethereum } = window;

//connect to ethereum to acces the blockchain data 
//1..make provider 2..make signer 3..make transactionsContract
const createEthereumContract=()=>{
    //1..make provider 
    const provider=new ethers.providers.Web3Provider(ethereum);
    //2..to mnage account of metaMask
    const signer=provider.getSigner()
    //3..to return a new instance of contract attached to a new address use [new ethers.contract()]
    const transactionsContract=new ethers.Contract(contractAddress,contractABI,signer)
    //console.log({provider,signer,transactionsContract});
    return transactionsContract;
}


export const TransactionProvider =({children})=>{
    const [currentAccount,setCurrentAccount]=useState("")
    const [formData,setformData]=useState({
        addressTo:"",
        amount:"",
        keyword:"",
        message:""
    })
    const [isLoading,setIsLoading]=useState(false);
    const [transactionsCount,setTransactionsCount]=useState(localStorage.getItem('transactionsCount'));
    //to updata the state of formData
    const handleChange =( e, name)=>{
        setformData((prevState)=> ({...prevState,[name]:e.target.value}))
    } 
    //to check if there are accounts or not 
    const checkIfWalletIsConnected= async()=>{
        try{
                if(!ethereum) return alert("Please Install MetaMask")
                const accounts=await ethereum.request({method:'eth_accounts'})
                if(accounts.length){
                    setCurrentAccount(accounts[0])
                }
                else{
                    console.log("No Accounts Found..")
                }

            }
        catch(error){
            console.log("Ethereum error is",error);
            throw new Error("No Ethereum Object..")
        }
    }
    //if there are accounts then check accountRequest is success
    const connectWallet= async()=>{
       try{
            if(!ethereum) return alert("Please Install MetaMask");
            const accounts=await ethereum.request({method:'eth_requestAccounts'});
            setCurrentAccount(accounts[0])
         }
       catch(error){
           console.log("Ethereum error is",error);
           throw new Error("No Ethereum Object")
       }
     }
    //sending and storing transactions to blockchain
    const sendTransaction =async()=>{
        try{
            if(ethereum){
                    //get the data from the form in welcome component
                    const {addressTo,amount,keyword,message}=formData;
                    const transactionsContract=createEthereumContract();
                    //to parse value from decimal to hexidecimal use [ethers.utils.parseEther]
                    const parsedAmount=ethers.utils.parseEther(amount)
                    //1..to make ethereum request
                    await ethereum.request({
                        method:"eth_sendTransaction",
                        params:[{
                            from:currentAccount,
                            to:addressTo,
                            gas:"0x5208",
                            value:parsedAmount._hex,
                        }],
                    });
                    //2..to add to blockchain
                    const transactionsHash =await transactionsContract.addToBlockchain(addressTo,parsedAmount,keyword,message);
                    //loading state
                    setIsLoading(true);
                    console.log(`Loading Transaction ${transactionsHash.hash}`);
                    //to terminate the transaction
                    await transactionsHash.wait();
                    //finish state
                    console.log(`Success Transaction ${transactionsHash.hash}`);
                    setIsLoading(false);
                   
                    //to get transactions Count
                    const transactionsCount=await transactionsContract.getTransactionCount();
                    setTransactionsCount(transactionsCount.toNumber())
            }
            else{
                console.log('No Ethereum Object')
            }
        }
        catch(error){
            console.log("Ethereum error is",error);
            throw new Error("No Ethereum Object")
        }
    }
    
    useEffect(()=>{
        checkIfWalletIsConnected();
    },[])
    return(
       <TransactionContext.Provider 
         value={{connectWallet,
                 currentAccount,
                 sendTransaction,
                 handleChange,
                 formData,
                 setformData,
                 isLoading,
               }}
        >
           {children}
       </TransactionContext.Provider>
    )

}
