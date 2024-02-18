import {AiFillHome,AiOutlineLogout} from 'react-icons/ai'
import {signOut} from 'next-auth/react'

export default function Menu() {
    return (
        <div className="w-fit h-screen bg-white px-2 rounded-b-lg">
            <a  className="flex wx-auto hover:bg-gray h-fit w-auto px-5 py-5 mt-5 rounded-lg" href="/">
            <AiFillHome size={20}/>
        </a>
        <button className="flex wx-auto hover:bg-gray px-5 py-5 rounded-lg" onClick={()=>signOut()}><AiOutlineLogout size={20} color="black" fill="black"/></button>
    </div>)
}