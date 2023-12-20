import google from "../../../public/social/google.svg"
import Image from "next/image"
import { FaGoogle } from "react-icons/fa"
export default function Guide() {
    return (
        <div>
            <div className='flex items-center justify-between flex-col py-10 bg-white heropattern-ilikefood-green-lime/10 full font-fredoka-medium'>
                <h1 className="font-fredoka-semi-bold text-3xl text-black mb-10">HOW TO USE OUR WEBSITE?</h1>
                
                <div className="grid grid-cols-2">
                    <span className="flex justify-center my-auto mx-auto w-fit h-fit px-2 text-center rounded-full outline-dashed outline-black">1</span>
                    <div className="bg-green p-2 rounded-2xl px-10 w-48 bg-gradient-to-r from-grass-green to-green text-white text-center">Sign-up</div>
                    <div className="flex w-full">
                        <hr className="mx-auto outline-dashed outline-2 outline-black h-16"></hr>
                    </div>              
                </div>
                <div className="grid grid-cols-2">
                    <span className="flex justify-center my-auto  mx-auto w-fit h-fit px-2 text-center rounded-full outline-dashed outline-black">2</span>
                    <div className="bg-green p-2 rounded-2xl px-10 w-48 bg-transparent outline outline-black text-black text-center"><span className="flex justify-center"><Image width={25} src={google}></Image><h1 className="my-auto">Sign-up</h1></span></div>
                    <div className="flex w-full">
                        <hr className=" mx-auto outline-dashed outline-2 outline-black h-16"></hr>
                    </div>              
                </div>
                
                
            </div>
        </div>
    )
}