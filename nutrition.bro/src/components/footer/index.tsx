import Logo from "../common/logo";
import { FaInstagram,FaFacebook,FaTiktok  } from "react-icons/fa";


export default function Footer()
{
    return (
        <div className="flex justify-between bg-gradient-to-r from-grass-green to-dark-grass p-12">
            <div className="flex">
                <div className="ml-5 m-auto">
                    <Logo largeLogo={true} withText={false}/>
                </div>
                <div className="m-auto">
                    <ul className="text-white ml-10 text-lg font-fredoka-medium">
                        <li className="cursor-pointer">About us</li>
                        <li className="cursor-pointer">Contacts</li>
                        <li className="cursor-pointer">Terms & Conditions</li>
                        <li className="cursor-pointer">Privacy Policy</li>   
                    </ul>
                </div>
            </div>
            <div >
                <h1 className="text-white font-fredoka-medium sm:text-xl text-lg mb-2">Newsletter</h1>
                <input placeholder="Enter your email" className="rounded-xl px-5 sm:w-80 w-40 py-2 mb-4"></input>
                <div className="flex w-full justify-around">
                    <FaInstagram size={30} color="white"></FaInstagram>
                    <FaFacebook size={30} color="white"></FaFacebook>
                    <FaTiktok size={30} color="white"></FaTiktok>
                </div>
            </div>
        </div>
    )
}