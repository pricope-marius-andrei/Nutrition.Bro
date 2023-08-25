import Button from "@components/common/button";
import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider, LiteralUnion, getProviders, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import google from "../../../public/social/google.svg"

export default function Registration()
{
    const {data:session} = useSession()

    const inputs = ['First Name','Last Name','Email','Password']

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
                    <div className="bg-gradient-to-r from-grass-green to-dark-grass h-full w-full"></div> {/* Left BG */}
                    <div className="grid grid-cols-1 grid-rows-2 p-10 m-auto"> {/* Right FORM */}
                        <div className="text-right h-fit w-full ">
                            <a className="cursor-pointer">SWITCH TO LOGIN</a>
                        </div>
                        {
                            inputs.map((name)=>
                                <div>
                                    <h1>{name}</h1>
                                    <input inputMode="text" key={name} placeholder={name} required={true} className="block border-gray w-96 px-7 p-5 h-16 mb-5 rounded-lg border outline-none focus:border-2 focus:border-gradient focus:border-green"></input>
                                </div>
                            )
                        }

                        <div className="grid grid-rows-1 grid-cols-2 mb-5 h-fit">
                            <div className="flex">
                                <input type="checkbox" key="checkbox" required={false} className="my-auto"></input>
                                <h1 className="my-auto pl-5">Remember me</h1>
                            </div>
                            <a className="cursor-pointer text-right">Forgot password?</a>
                        </div>
                        
                        <div className="mb-5">
                            <Button
                                    keyProp="sign-up"
                                    width="w-96"
                                    rounded="rounded-lg"
                                    textSize="text-xl"
                                    onClick={()=>console.log("It works")}
                                    isRounded={true}
                                    name="SIGN-UP"
                                    />
                        </div>

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
                                name="Sign-up with Google"
                                />
                            )
                            }    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}