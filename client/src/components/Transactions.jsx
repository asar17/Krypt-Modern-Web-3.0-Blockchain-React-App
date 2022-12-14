import {useContext,useState} from 'react'
import {TransactionContext} from '../context/TransactionsContext'
import dummyData from '../utils/dummyData';
import {shortenAddress} from '../utils/shortenAddress';
import useFetch from '../hooks/useFetch'


const TransactionCard =({ addressTo, addressFrom, timestamp, message, keyword, amount, url})=>{
    const gifUrl=useFetch({keyword})
    

 return(
    <div className="bg-[#181918] m-4 flex flex-1
                2xl:min-w-[450px]
                2xl:max-w-[500px]
                sm:min-w-[270px]
                sm:max-w-[300px]
                min-w-full
                flex-col p-3 rounded-md hover:shadow-2xl"
    >
        <div className="flex items-center w-full flex-col mt-3">
           <div className="display-flex justify-start w-full mb-6 p-2">
                    <a href={`https://goerli.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
                        <p className="text-white text-base">from: {shortenAddress(addressFrom)}</p>
                    </a>
                    <a href={`https://goerli.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
                        <p className="text-white text-base">To: {shortenAddress(addressTo)}</p>
                    </a>
                    <p className="text-white text-base">Amount: {amount} ETH</p>
                    {message&&(
                        <>
                        <br/>
                        <p className="text-white text-base">Message: {message}</p>
                        </>
                    )}
            </div>
            <img
                src={gifUrl||url}
                alt="gif"
                className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
            />
            <div className="bg-black p-3 px-5 rounded-3xl shadow-2xl -mt-5 w-max">
                 <p className="text-[#37c7da] font-bold">{timestamp}</p>
            </div>
        </div>
    </div>
    )
}

const Transactions=()=>{
    const {currentAccount,transactions}=useContext(TransactionContext)
     

    return(
        <div className="flex w-full justify-center items-center 2xl:p-20 gradient-bg-transactions">
           <div className="flex flex-col md:p-12 py-12 p-4 ">
               {/* first child */}
               {currentAccount?
                    (transactions.length>0?
                        (<h3 className="text-white text-3xl text-center my-2">Your Own Latest Transactions</h3>):
                        (<h3 className="text-white text-3xl text-center my-2">Latest Transactions</h3>)
                    )
                     :
                    (<h3 className="text-white text-3xl text-center my-2">Connect your wallet to see Latest Transactions</h3>)
               }
               {/* second child */}
               <div className="flex flex-wrap justify-center items-center mt-10">
                   { transactions==[]?
                        (
                            transactions?.reverse()?.map((dummy,index)=>(
                                <TransactionCard key={index} {...dummy}/>
                            )) 
                        )
                   :
                        (
                            dummyData?.reverse()?.map((dummy,index)=>(
                                <TransactionCard key={index} {...dummy}/>
                            )) 
                        )
                     
                   }
                   
               </div>
           </div>
        </div>

    )
}
export default Transactions;