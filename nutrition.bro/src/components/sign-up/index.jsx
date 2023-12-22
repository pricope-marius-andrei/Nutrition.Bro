'use client'

import Button from "@components/common/button";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import google from "../../../public/social/google.svg"
import {AiFillHome} from "react-icons/ai"
import Image from "next/image";

async function register(first_name, last_name, email, password) {

    const responseUserExist = await fetch("/api/userExist", {
        method: 'POST',
        headers: {
            'Content-Type' : "application/json"
        },
        body: JSON.stringify({email})
    })

    const {user} = await responseUserExist.json()

    if(user)
    {
        alert("The user exist");
        return;
    }

    const response = await fetch("/api/register/", {
      method: 'POST',
      headers: {
        'Content-Type' : "application/json"
      },
      body: JSON.stringify({ first_name, last_name, email, password }),
    });
    const data = await response.json();
}

export default function SignUpComponent()
{
    const {data:session} = useSession()

    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleRegister = async (e) => {
        e.preventDefault()
        await register(first_name,last_name,email,password)
    }

    const [providers, setProviders] = useState(null)
    
    //get list of providers which I setted them
    useEffect(() => {
        const setUserProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUserProviders()
    }, [])
    

    const router = useRouter()

    if(session?.user)
    {
        router.push("/")
    }

    return (
        !session?.user &&
        <div className="bg-green flex justify-center items-center w-screen h-screen font-fredoka-semi-bold text-base heropattern-ilikefood-white/10"> {/*BG*/}
            <div className="absolute text-left top-10 left-10">
                <a onClick={()=>router.push("/")} className="cursor-pointer bg text-left"><AiFillHome size={30} color="white"/></a>
            </div>
            <div className="flex flex-col items-center justify-center bg-white w-96 h-80 px-10 py-5 rounded-2xl shadow-black drop-shadow-lg">
                <div className="font-fredoka-medium text-white h-fit w-full ">
                    <h1 className="mt-5 text-center font-fredoka-semi-bold text-4xl text-black mb-5">SIGN-UP</h1>
                    <div className="flex justify-center">
                    {
                        providers &&
                            <button 
                                className="flex text-sm  bg-white py-2 px-12 text-black justify-center items-center
                                font-fredoka-medium outline-none outline-2 outline-black rounded-lg hover:drop-shadow-xl" 
                                onClick={()=>signIn()}
                            >
                                <span>
                                    <Image width={25} height={25} src={google}></Image>
                                </span>
                                Sign-up with Google
                            </button>
                    }
                    </div>
                </div>
            </div>

            
        </div>
    )
}