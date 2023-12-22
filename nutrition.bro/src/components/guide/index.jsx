import google from "../../../public/social/google.svg"
import Image from "next/image"
import { FaGoogle } from "react-icons/fa"
import ListItem from "@components/common/list_item"
import { RiAccountCircleFill } from "react-icons/ri";

export default function Guide() {
    return (
        <div>
            <div className='flex items-center justify-between flex-col py-36 bg-white heropattern-ilikefood-green-lime/10 full font-fredoka-medium'>
                <h1 className="font-fredoka-semi-bold md:text-5xl text-3xl text-black mb-10">HOW TO USE OUR WEBSITE?</h1>
                
                <ListItem id="1">
                    <div className="bg-green p-2 rounded-3xl px-10 py-3 w-48 h-fit bg-gradient-to-r from-grass-green to-green text-white text-center mb-5">SIGN-UP</div>
                </ListItem>
                <ListItem id="2">
                    <div className="bg-green p-2 rounded-3xl px-10 w-48 bg-transparent outline outline-black text-black outline-4 text-center mb-5"><span className="flex justify-center"><Image width={32} src={google}></Image><h1 className="my-auto">SIGN-UP</h1></span></div>
                </ListItem>
                <ListItem id="3">
                    <div className="bg-green p-2 rounded-3xl px-10 w-48 h-fit bg-gradient-to-r from-grass-green to-green text-white text-center mb-5"><span className="flex justify-center items-center "><RiAccountCircleFill size={35}/><h1 className="my-auto">PROFILE</h1></span></div>
                </ListItem>
                <ListItem id="4">
                <div className="bg-green p-2 rounded-3xl px-10 py-3 w-48 h-fit bg-gradient-to-r from-grass-green to-green text-white text-center mb-5">ADD FOOD</div>
                </ListItem>
                <ListItem id="5" finalItem={true}>
                    <div className="flex justify-center text-black text-5xl text-center mb-5">
                        <div className="flex justify-center">
                            <span>Enjoy!</span>
                            <span>🎉</span>
                        </div>
                    </div>
                </ListItem>
                
            </div>
        </div>
    )
}