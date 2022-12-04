

import Logo from "../../images/logo.png"
import { HiMenuAlt4 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import { useState } from "react";

interface Props {
    title: string;
    classProps: string;
}

const NavbarItems = ({ title, classProps }: Props) => {
    return (

        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {
                title
            }
        </li>
    )
}
const data = ["market", "exchange", "tutorials", "wallet"];
const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    return (
        <nav className="w-full flex md:justify-center justify-between items-center  sm:p-6 py-5 px-3">
            <div className="md:flex-[0.5]  flex-initial justify-center items-center m-4 ">
                <img src={Logo} alt="crypt_logo" className="w-32 cursor-pointer   " />
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {
                    data.map((item, index) => {
                        return (<NavbarItems key={item + index} title={item} classProps={""} />)

                    })
                }
                <li className="bg-[#2952e3] py-2 px-6 rounded-full cursor-pointer hover:bg-[#4546bd]">
                    Login
                </li>
            </ul>
            <div className="flex relative">
                {
                    toggleMenu ? <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(!toggleMenu)} /> :
                        <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(!toggleMenu)} />
                }
                {
                    toggleMenu &&
                    (

                        <ul className="z-10 fixed top-0 right-0 p-3 w-[70vw] h-screen shadow-2xl text-white animate-slide-in  md:hidden list-none 
 flex flex-col  items-end rounded-md blue-glassmorphism  ">
                            <li className="text-2xl w-full my-2 text-white">
                                <AiOutlineClose onClick={() => setToggleMenu(false)} />
                            </li>
                            {
                                data.map((item, index) => {
                                    return (<NavbarItems key={item + index} title={item} classProps={"text-xl my-5  hover:text-[#7777f6]"} />)

                                })
                            }
                        </ul>
                    )
                }
            </div>


        </nav>
    )
}

export default Navbar