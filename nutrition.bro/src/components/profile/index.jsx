import {signOut, useSession} from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function ProfileComponent()
{
    const {status, data} = useSession()

    const router = useRouter()

    useEffect(()=>{
        if(status === "unauthenticated") router.push("/sign-up");
    }, [status])

    if(status === "authenticated") {
        return( 
            <div className="flex justify-center align-middle w-full pt-20 h-screen bg-green">
                <div className="bg-gray h-fit p-28 align-middle">
                    <div>
                        <img className="rounded-full" src={data?.user.image}></img>
                    </div>
                    <h1 className="font-fredoka-bold text-6xl">{data?.user.email}</h1>
                    <h1 className="font-fredoka-light text-4xl">{data?.user.name}</h1>
                    <button className="bg-green text-gray font-fredoka-medium py-4 px-10 rounded-lg" onClick={()=> signOut()}>SignOut</button>
                </div>
            </div>
        )
    }

    return (
        <h1>Loading...</h1>
    )
}