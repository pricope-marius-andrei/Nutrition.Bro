'use client'

import Button from "@components/common/button";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import google from "../../../public/social/google.svg"
import {AiFillHome} from "react-icons/ai"

async function register(first_name, last_name, email, password) {

    const responseUserExist = await fetch("http://localhost:3000/api/userExist", {
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

    const response = await fetch("http://localhost:3000/api/register/", {
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
        <div className="bg-gray flex lg:h-full lg:w-screen h-screen w-full font-fredoka-regular text-base"> {/*BG*/}
            <div className="m-auto bg-white lg:w-11/12 w-screen h-screen"> {/*BG Register*/}
                <div className="grid lg:grid-cols-2 lg:grid-rows-1 grid-cols-1 grid-rows-8 h-full p-5">
                    {/* Left BG */}
                    <div className="grid bg-gradient-to-r from-grass-green to-dark-grass row-span-1 grid-cols-1 lg:grid-rows-6 grid-rows-2 p-10 lg:h-full h-fit w-full">
                        <div className="font-fredoka-medium flex lg:text-left lg:row-span-1 row-span-full text-white h-fit w-full ">
                            <a onClick={()=>router.push("/")} className="cursor-pointer"><AiFillHome size={30}/></a>
                        </div>
                        <div className="lg:row-span-5">

                        </div>
                    </div>
                    {/* Right FORM */}
                    <div className="grid h-full grid-cols-1 grid-rows-6 p-10 m-auto w-full"> 
                        <div className="text-right text-dark-grass font-fredoka-medium lg:h-fit w-full">
                            <a onClick={() => {router.push("/log-in")}} className="cursor-pointer">SWITCH TO LOG-IN</a>
                        </div>
                        <div className="row-span-5 w-fit m-auto">
                            <form onSubmit={handleRegister}>
                                <div>
                                    <h1>First Name</h1>
                                    <input type="text" inputMode="text" key="first_name" placeholder="First Name" required={true} onChange={(e)=>setFirstName(e.target.value)} ></input>
                                </div>
                                
                                <div>
                                    <h1>Last Name</h1>
                                    <input type="text" inputMode="text" key="last_name" placeholder="Last Name" required={true} onChange={(e)=>setLastName(e.target.value)}></input>
                                </div>

                                <div>
                                    <h1>Email</h1>
                                    <input type="text" inputMode="text" key="email" placeholder="Email" required={true} onChange={(e)=>setEmail(e.target.value)}></input>
                                </div>

                                <div>
                                    <h1>Password</h1>
                                    <input type="password" inputMode="text" placeholder="Password" required={true} onChange={(e)=>setPassword(e.target.value)}></input>
                                </div>
                                <div className="grid grid-rows-1 grid-cols-2 mb-5 h-fit">
                                    <div className="flex">
                                        <input type="checkbox" key="checkbox" required={false} className="my-auto"></input>
                                        <h1 className="my-auto pl-5">Remember me</h1>
                                    </div>
                                    <a className="cursor-pointer text-right">Forgot password?</a>
                                </div>

                                <div className="mb-5">
                                    {
                                        providers &&
                                        <Button
                                            type="submit"
                                            keyProp={Object.values(providers).at(0).name}
                                            width="w-96"
                                            rounded="rounded-lg"
                                            textSize="text-xl"
                                            isRounded={true}
                                            name = "SIGN-UP"
                                        />
                                    }
                                </div>
                            </form>

                            <div className="grid grid-cols-3 grid-rows-1">
                                <hr className="my-auto opacity-25"></hr>
                                <h1 className="m-auto opacity-25 font-fredoka-medium" >OR</h1>
                                <hr className="my-auto opacity-25"></hr>
                            </div>

                            <div>
                                {
                                    providers && 
                                    <Button
                                    user={Object.values(providers).at(1).name}
                                    width="w-96"
                                    rounded="rounded-lg"
                                    textSize="text-lg"
                                    isTransparent={true}
                                    logo={google}
                                    keyProp={Object.values(providers).at(1).name}
                                    onClick={()=>signIn()}
                                    isRounded={true}
                                    name="Sign-up with Google"
                                    />
                                }   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}