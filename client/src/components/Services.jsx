import { BsShieldFillCheck } from "react-icons/bs"
import { BiSearchAlt } from "react-icons/bi"
import { RiHeart2Fill } from "react-icons/ri"

const ServiceCard = ({ title,icons, subtitle, color }) => {
  return (
    <div className="flex flex-1 items-center justify-center flex-row white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl sm:w-25 ">
<div className= {`w-10 h-10 ${color} rounded-full flex items-center justify-center `}>
  {
    icons
  }

</div>
<div className="ml-5 flex flex-col flex-1">
<h1 className="mt-2 text-white text-lg ">{title}</h1>
<p className="mt-2 text-white text-sm md:w-9/12 ">{subtitle}</p>
</div>
    </div>
  )
}

const Services = () => {
  return (
    <div className="flex w-full flex-col md:flex-row justify-center items-center gradient-bg-services">
      <div className="flex sm:flex-row flex-col items-center justify-between md:p-20 py-12 px-4 ">
        <div className="flex-1 justify-start items-start flex ">


          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient " >
            Services that
            <br />
             Continuously Improving
          </h1>
        </div>

      </div>
      <div className="flex-1 flex items-center justify-start flex-col " >
        <ServiceCard
          title="Secure Guard"
          icons={<BsShieldFillCheck className="text-2xl text-white" />}
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          color="bg-[#2952E3]"
        />
        <ServiceCard
        title="New Card"
        icons={<BiSearchAlt className="text-2xl text-white" />}
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        color="bg-[#F9A826]"
        
        />
        <ServiceCard
        title="Secure Guard"
        icons={<RiHeart2Fill className="text-2xl text-white" />}
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        color="bg-[#ff720e]"
        />
      </div>

    </div>
  )
}

export default Services