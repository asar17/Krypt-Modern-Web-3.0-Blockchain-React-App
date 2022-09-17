import React,{useContext} from 'react';
import { BsInfoCircle } from "react-icons/bs";
import { SiEthereum } from "react-icons/si";
import Loader from './Loader'
import {TransactionContext} from '../context/TransactionsContext';
import {shortenAddress} from '../utils/shortenAddress'
 //msake this const because the divs have the same classes
 const companyCommonStyles = "min-h-[70px] sm:min-w-[120px] sm:px-0 px-2  flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
 //make functin component called Input return jsx [input element] accept placeholder as a paramter
 const Input =({placeholder,name,type,value,handleChange})=>{
     return(
         <input
            type={type} 
            placeholder={placeholder}
            step="0.0001"
            value={value}
            onChange={(e) => handleChange(e, name)}
            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
          />
     )
 }
const Welcome=()=>{
    //to import global varaiable using state mangement [Context api]
    const {connectWallet,currentAccount,formData,handleChange,sendTransaction,isLoading}=useContext(TransactionContext);
    console.log('load',isLoading)
    const handleSubmit=(e)=>{
      const {addressTo,amount,keyword,message}=formData;
      e.preventDefault();
      if(!addressTo || !amount || !keyword || !message) return;
      sendTransaction();
    }
    return(
        <div className="bg-black text-white flex w-full justify-center items-center">
            <div className="flex md:flex-row flex-col  md:p-20 px-4 py-12 ">
                {/* first part in the left side */}
                <div className="flex flex-1 flex-col justify-start items-start md:mr-10">
                    {/*first child*/}
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Buy and sell<br/>trusted Crypto
                    </h1>
                    {/*second child*/}
                    <p className="text-left text-[13.2px] text-white font-light text-base md:w-9/12 w-11/12">
                       Explore the crypto world.Buy and sell crypto coins easily,trusted crypto to be your crypto market partner
                    </p>
                    {/*third child*/}
                    {!currentAccount &&
                      (
                        <button
                         type="button"
                         onClick={connectWallet}
                         className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                         >
                           <p className="text-white text-base font-semibold">Connect Wallet</p>
                         </button>
                      )
                    }
                    {/*fourth child*/}
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10 ">
                      <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
                        Reliability
                      </div>
                      <div className={`${companyCommonStyles}`}>
                        Security
                      </div>
                      <div className={`rounded-tr-2xl ${companyCommonStyles}`}>
                        Ethereum
                      </div>
                      <div className={`rounded-bl-2xl ${companyCommonStyles}`}>
                        Web 3.0
                      </div>
                      <div className={companyCommonStyles}>
                        Low Fees
                      </div>
                      <div className={`rounded-br-2xl ${companyCommonStyles}`}>
                        Blockchain
                      </div>
                    </div>
                </div> 
                {/* second part in the right side */}
                <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
                    {/* first child referes to THE card*/}
                    <div className="flex justify-end items-start flex-col h-40 w-full sm:w-72 rounded-xl my-5 p-3 eth-card white-glassmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            {/* top part */}
                            <div className="flex justify-between items-start">
                                <div className="flex justify-center items-center w-10 h-10 rounded-full border-2 border-white">
                                  <SiEthereum fontSize={21} color="#fff"/>
                                </div>
                                <BsInfoCircle fontSize={17} color="#fff"/>
                            </div>
                            {/* second part */}
                            <div>
                                <p className="text-white font-light text-sm">
                                  {shortenAddress(currentAccount)}
                                </p>
                                <p className="text-white font-semibold text-lg">
                                  Ethereum
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* second child refers to THE form */}
                    <div className="flex flex-col justify-start items-center p-5 sm:w-96 w-full blue-glassmorphism">
                        <Input placeholder="Address To" name="addressTo" type="text"  handleChange={handleChange}/>
                        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange}/>
                        <Input placeholder="keyword (GIF)" name="keyword" type="text" handleChange={handleChange}/>
                        <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange}/>
                        {/* to make simple line */}
                        <div className="h-[1px] w-full bg-gray-400 my-2"/>
                        {isLoading ?
                            (<Loader/>)
                            :
                            (<button
                              type="button"
                              onClick={handleSubmit}
                              className="text-white mt-2 border-[1px] w-full border-[#3d4f7c] hover:bg-[#3d4f7c]  p-2 rounded-full cursor-pointer"
                             >
                                 Send Now

                            </button>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Welcome;