import logo from '../images/logo.png';

const Footer=()=>{
    return(
        <div className="flex md:justify-center items-center justify-between flex-col p-4 gradient-bg-footer text-white">
           {/* first child */}
            <div className="flex flex-col w-full sm:flex-row">
                <div className="flex flex-[0.5] w-full justify-center items-center">
                    <img src={logo} alt="logo" className="w-32"/>
                </div>
                <div className="flex flex-1 justify-evenly w-full sm:mt-0 mt-5 flex-wrap items-center">
                    <p className="text-white text-base text-center mx-2 cursor-pointer">Market</p>
                    <p className="text-white text-base text-center mx-2 cursor-pointer">Exchange</p>
                    <p className="text-white text-base text-center mx-2 cursor-pointer">Tutorials</p>
                    <p className="text-white text-base text-center mx-2 cursor-pointer">Wallets</p>
                </div>
            </div>
            {/* second child */}
            <div className="flex flex-col justify-center items-center mt-5 ">
               <p className="text-white text-sm text-center">Come join us and hear for the unexpected miracle</p>
               <p className="text-white text-sm text-center font-medium mt-2">info@kryptomastery.com</p>
            </div>
            {/* normal line*/}
            <div className="bg-gray-400 w-full h-[0.25px] mt-5"/>
            {/* third child */}
            <div className="w-full mt-3 flex justify-between items-center">
                <p className="text-white  text-xs">@kryptomastery2022</p>
                <p className="text-white  text-xs">All rights reserved</p>
            </div>
        </div>
    )
}
export default Footer;