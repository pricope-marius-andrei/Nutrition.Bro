import Button from "@components/common/button";
import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider, LiteralUnion, getProviders, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import google from "../../../public/social/google.svg"

async function register(first_name:String, last_name:String, email:String, password:String) {
    const response = await fetch("api/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ first_name, last_name, email, password }),
    });
    const data = await response.json();
    console.log(data);
}

export default function Registration()
{
    const {data:session} = useSession()

    const [modeOfLogging,setModeOfLogging] = useState(true) //is sign-up

    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleRegister = () => {
        register(first_name,last_name,email,password)
        // console.log(`First name: ${first_name}, Last name: ${last_name}, email: ${email}, password: ${password}`)
    }

    const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,ClientSafeProvider> | null>(null)
    
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
        <div className="bg-gray lg:h-screen h-full lg:w-screen w-full flex"> {/*BG*/}
            <div className="m-auto bg-white lg:w-11/12 w-fit h-fit "> {/*BG Register*/}
                <div className="grid lg:grid-cols-2 grid-cols-1 grid-rows-1">
                    <div className="grid grid-cols-1 lg:grid-rows-6 grid-rows-1 p-10 bg-gradient-to-r from-grass-green to-dark-grass h-full w-full">
                        <div className="text-left text-white h-fit w-full ">
                            <a onClick={()=>router.push("/")} className="cursor-pointer">HOME</a>
                        </div>
                        <div className="row-span-5">
                            
                        </div>
                    </div> {/* Left BG */}
                    <div className="grid grid-cols-1 grid-rows-6 p-10 m-auto w-full"> {/* Right FORM */}
                        <div className="text-right h-fit text-black w-full ">
                            <a onClick={() => {setModeOfLogging(!modeOfLogging)}} className="cursor-pointer">{ modeOfLogging ? "SWITCH TO LOG-IN" : "SWITCH TO SIGN-UP"}</a>
                        </div>
                        <div className="row-span-5 w-fit m-auto">
                        <form>
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
                                <Button
                                        type="button"
                                        keyProp="sign-up"
                                        width="w-96"
                                        rounded="rounded-lg"
                                        textSize="text-xl"
                                        onClick={handleRegister}
                                        isRounded={true}
                                        name = {modeOfLogging ? "SIGN-UP" : "LOG-IN"}
                                        />
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
                            Object.values(providers).map((provider) =>
                                <Button
                                user={provider.name}
                                width="w-96"
                                rounded="rounded-lg"
                                textSize="text-lg"
                                isTransparent={true}
                                logo={google}
                                keyProp={provider.name}
                                onClick={()=>signIn()}
                                isRounded={true}
                                name={modeOfLogging ? "Sign-up with Google" : "Log-in with Google"}
                                />
                            )
                            }    
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}