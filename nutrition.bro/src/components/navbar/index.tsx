'use client'

import Link from "next/link"
import Logo from "../common/logo"
import Button from "../common/button"
import React,{ useState } from "react"
import { signOut, useSession} from "next-auth/react"
import Hamburger from "hamburger-react"
import useBetterMediaQuery from "../../utils/useBetterMediaQuery"
import { useRouter } from "next/navigation"
import { Router } from "next/router"

export default function NavBar()
{
    const {data:session} = useSession();

    const router = useRouter();

    const [hamburgerStatus, setHamburger] = useState(false);
    const isDesktopOrLaptop = useBetterMediaQuery('(min-width: 1280px)')
    const isPhone = useBetterMediaQuery('(min-width: 720px')

    return (
        <nav className="flex py-7 bg-white lg:bg-opacity-90 backdrop-blur-sm drop-shadow-sm sticky top-0 place-content-between">
            <Link href="/" className="top my-auto pl-20">
                {isPhone ? <Logo style="with-text"/> : <Logo/>}
            </Link>

            <div className="my-auto mr-24 place-content-center">
                <span className="top place-content-center lg:hidden flex"><Hamburger color="#454d66" toggled={hamburgerStatus} toggle={setHamburger}/></span>        
                {(isDesktopOrLaptop || hamburgerStatus) 
                    && 
                        <ul className="bg-white lg:flex lg:my-auto lg:bg-opacity-0 lg:relative lg:mr-20 lg:items-center lg:h-0 lg:p-2 lg:space-x-10 lg:text-xl p-4 text-2xl absolute justify-center text-center font-fredoka-light w-fit mt-20 top-0 right-0 text-black">
                            <Link href="/"><li className="cursor-pointer">HOME</li></Link>
                            <Link href="/"><li className="cursor-pointer">FOOD</li></Link>
                            <Link href="blogs"><li className="cursor-pointer">BLOGS</li></Link>
                            <Link href="/">
                                <li className="cursor-pointer">
                                    {
                                        session?.user ?
                                        <Button user={session?.user.name} logo={session?.user.image} isRounded={true} url="/profile" onClick={()=>router.push("profile")} name="PROFILE"/>
                                        :
                                        <div>
                                            <Button 
                                            url="/sign-up"
                                            isRounded={true}
                                            name="SIGN-UP"
                                            />
                                        </div>
                                    }
                                </li>
                            </Link>
                        </ul>   
                }
            </div>
        </nav>
    )
}