import google from "../../../public/social/google.svg"
import Image from "next/image"
import { FaGoogle } from "react-icons/fa"
import ListItem from "@components/common/list_item"
import { RiAccountCircleFill } from "react-icons/ri";

export default function Guide() {
    return (
        <div>
            <div className='flex items-center justify-between flex-col py-36 bg-white heropattern-ilikefood-green-lime/10 full font-fredoka-medium'>
                <h1 className="font-fredoka-semi-bold md:text-5xl text-3xl  text-black mb-10">HOW TO USE OUR WEBSITE?</h1>
                
                <ListItem id="1">
                    <div className="bg-white outline-none outline-black outline-4 hover:outline-0 p-2 rounded-3xl px-10 py-3 w-48 h-fit hover:bg-gradient-to-r hover:from-grass-green hover:to-green hover:text-white text-black text-center mb-5 font-fredoka-semi-bold hover:font-fredoka-medium">SIGN-UP</div>
                </ListItem>
                <ListItem id="2">
                <div className="bg-white outline-none outline-black outline-4 hover:outline-0 p-2 rounded-3xl px-10 py-3 w-48 h-fit hover:bg-gradient-to-r hover:from-grass-green hover:to-green hover:text-white text-black text-center mb-5 font-fredoka-semi-bold hover:font-fredoka-medium"><span className="flex justify-center items-center "><FaGoogle size={30}/><h1 className="my-auto ml-1">SIGN-UP</h1></span></div>
                </ListItem>
                <ListItem id="3">
                    <div className="bg-white outline-none outline-black outline-4 hover:outline-0 p-2 rounded-3xl px-10 py-3 w-48 h-fit hover:bg-gradient-to-r hover:from-grass-green hover:to-green hover:text-white text-black text-center mb-5 font-fredoka-semi-bold hover:font-fredoka-medium"><span className="flex justify-center items-center "><RiAccountCircleFill size={35}/><h1 className="my-auto">PROFILE</h1></span></div>
                </ListItem>
                <ListItem id="4">
                <div className="bg-white outline-none outline-black outline-4 hover:outline-0 p-2 rounded-3xl px-10 py-3 w-48 h-fit hover:bg-gradient-to-r hover:from-grass-green hover:to-green hover:text-white text-black text-center mb-5 font-fredoka-semi-bold hover:font-fredoka-medium">ADD FOOD</div>
                </ListItem>
                <ListItem id="5" finalItem={true}>
                    <div className="flex justify-center text-black text-5xl text-center w-48">
                            <span className="w-fit my-auto">Enjoy!</span>
                            <span className="w-1/3 h-fit my-auto">
                                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Party%20Popper.png" alt="Party Popper" width="100%" height="100%" />
                            </span>
                    </div>
                </ListItem>
                
            </div>
        </div>
    )
}