import { useContext, useState } from "react"
import { TransactionContext } from "../context/TransactionContext"
import DummyData from "../utils/DummyData"
import { ShortenAddress } from "../utils/ShortenAdd"
import useFetch from "../hooks/useFetch"
const TransactionCard = ({ keyword, message, timestamp, addressFrom, addressTo, amount }) => {
  // const { addressTo, amount, addressFrom, message, timestamp} = transactions;
  const gifUrl = useFetch({keyword})

  const altUrl ="https://64.media.tumblr.com/de5ac3a648b79dfe9ff9c2fbf2610a9b/tumblr_inline_mlsxpgnvEt1qz4rgp.gif"
  return (
    <div className="bg-[#181918] m-4 flex flex-1
    2xl:min-w-[400px]
    2xl:max-w-[430px]
    sm:min-w-[270px]
    sm:max-w-[300px]
    flex-col rounded-md hover:shadow-2xl p-6
    ">
      <div className="flex flex-col items-center w-full mt-3">
        <div className="flex flex-1  justify-between flex-col w-full">

          <a href={`https://goerli.etherscan.io/tx/${addressFrom}`} target="_blank" rel="noopener noreferrer" className="text-white">
            <p>From:{"  "}
              {ShortenAddress(addressFrom)}
            </p>
          </a>
          <a href={`https://goerli.etherscan.io/tx/${addressFrom}`} target="_blank" rel="noopener noreferrer" className="text-white">
            <p>To: {"  "}
              {ShortenAddress(addressFrom)}
            </p>
          </a>
          <p  className="text-white">Amount :{amount} ETH</p>
{
  message && <p className="text-white">Message :{message}</p>
}

        </div>
        <img src={gifUrl || altUrl||gifUrl} className="w-full h-64 2x:h-96 shadow-lg object-cover mt-5"/>
<h1 className="text-[#4cc9f0] bg-black py-2 px-4 rounded-3xl  ">{timestamp}</h1>
      </div>
    </div>
  )
}
const Transaction = () => {
  const { currentAccount ,transactions} = useContext<any>(TransactionContext)
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions ">
      <div className="flex flex-1 items-center justify-center md:p-7 px-5 py-12 flex-col" >
        {
          currentAccount ?
            (<h1 className="text-white md:text-5xl text-3xl" >Latest Transction</h1>) : ""
        }
        <div className="flex  items-center justify-center flex-wrap p-35  mt-10 w-full">
          {
            transactions.reverse().map((transaction, index) => {
              return (<TransactionCard key={index} {...transaction} />)
            }
            )
          }

        </div>
      </div>
    </div>
  )
}

export default Transaction