import {useState} from 'react'
import {HiMenuAlt4} from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai';
import logo from '../images/logo.png';


//arrow function accept title=[the name of the list] and className as paramters to make dynamic li
const NavbarItems=({title,classProps})=>{
    return(
       <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>
    )
}

const Navbar=()=>{
    const [toggleMenu,setToggleMenu]=useState(false)
    return(
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            {/*logo div/first child*/}
            <div className="md:flex-[0.5] flex-initail justify-center items-center ">
                <img src={logo} alt="logo" className="w-32 cursor-pointer"/>
            </div>
            {/*navbar Items/second child */}
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
               {/* make NavbarItems array and map through them to make one NavbarItems component instead of duplicated it*/}
               {["Market","Exchange","Tutorials","Wallets"].map((item,index)=>(
                   <NavbarItems key={item+index} title={item}/>
               ))}
               <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                   Login
               </li>
            </ul>
            {/*second child in mobile devices */}
            <div className="flex relative">
               {toggleMenu?
                  <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={()=>{setToggleMenu(false)}}/>:
                  <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={()=>{setToggleMenu(true)}} />
               }
               {toggleMenu&&
                  (
                      <ul 
                        className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden
                                   flex flex-col justify-start items-end rounded-md blue-glassmorphism
                                   text-white  animate-slide-in
                                  "
                      >
                         <li className="text-xl w-full my-2">
                             <AiOutlineClose onClick={()=>{setToggleMenu(false)}}/>
                         </li>
                         {["Market","Exchange","Tutorials","Wallets"].map((item,index)=>(
                            <NavbarItems key={item+index} title={item} classProps="text-lg my-2"/>
                         ))} 
                      </ul>
                  )
                }

            </div>
        </nav>
    )
}
export default Navbar;