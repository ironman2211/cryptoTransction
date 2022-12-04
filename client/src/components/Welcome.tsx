import { AiFillPlayCircle } from "react-icons/ai"
import { SiEthereum } from "react-icons/si"
import { BsInfoCircle } from "react-icons/bs"
import { Loader } from "./Loader"
import { useContext, useState } from "react"
import { TransactionContext } from "../context/TransactionContext"
interface WelcomeProps {
  type: string
  value: any
  name: string
  placeholder: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ type, placeholder, name, value, handleChange }: WelcomeProps) => {
  return (
    <input className="my-2 text-white rounded-sm padding-2 w-full outline-none p-2 m-1 bg-transparent  text-small white-glassmorphism border-none  "
      placeholder={placeholder}
      step="0.0001"
      type={type}
      name={name}
      onChange={handleChange}
      value={value}

    ></input>
  )
}

const Welcome = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { connectWallet, currentAccount, handleChange, formData, sendTransaction } = useContext(TransactionContext)
  const handleClick = (e: any) => {
    e.preventDefault()
    const { addressTo, amount, keyword, message } = formData;
    if (!addressTo || !amount || !keyword || !message) return alert("Please fill all the fields");
    sendTransaction()
  }
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex  md:flex-row flex-col items-start justify-between  md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col md:mr-20  ">



          <h1 className="text-3xl sm:text-5xl text-white text-gradient  py-1">
            Send Crypto <br></br>
            Around the World
          </h1>
          <p className="text-left mt-5 text-white md:w-9/12 w-11/12 text-base font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, earum.
          </p>
          <button
            onClick={connectWallet}
            type="submit"
            className="text-white flex items-center justify-center bg-[#2952e3]  mt-10 p-2 cursor-pointer hover:bg-[#2546bd] rounded-full">
            Connect Wallet</button>
        </div>


        <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
          <div className="flex items-end justify-end items-start  p-2 flex-col rounded-xl h-40 sm:w-72 w-full eth-card white-glassmorpism">
            <div className="flex justify-between flex-col w-full h-full " >
              <div className="flex justify-between  items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">


                  <SiEthereum className="text-white text-2xl" />
                </div>
                <BsInfoCircle className="text-white m-1 text-xl" />
              </div>
              <div>
                <p className="text-white text-24">{currentAccount ? currentAccount : "Account"}</p>
                <p className="text-white text-24 font-semibold text-lg mt-1">Ethereum</p>
              </div>
            </div>
          </div>
          <div className="flex items-start flex-1 justify-center md:w-100 w-full p-3  md:mt-5 mt-5  blue-glassmorphism">
            <div className="flex flex-col justify-center items-center p-2 w-full">

              <Input placeholder="Address From " type="text" value={formData.addressTo} name="addressTo" handleChange={handleChange} ></Input>
              <Input placeholder="Amount (ETH)" type="number" value={formData.amount} name="amount" handleChange={handleChange} ></Input>
              <Input placeholder="Key Word (GIF) " type="text" value={formData.keyword} name="keyword" handleChange={handleChange} ></Input>
              <Input placeholder="Enter Message" type="text" value={formData.message} name="message" handleChange={handleChange} ></Input>
              <div className="h-[1px] w-full bg-gray-500 my-2" ></div>
              {
                currentAccount ? <button className="w-full  bg-[#2952e3] cursor-pointer hover:bg-[#2546bd]  p-2 rounded-xl text-white " onClick={handleClick}>Send</button> : <Loader></Loader>
              }
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Welcome