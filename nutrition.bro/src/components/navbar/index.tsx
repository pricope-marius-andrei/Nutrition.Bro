'use client'

import Logo from "../common/logo"
import Button from "../common/button"
import React,{ useState, useEffect } from "react"
import Hamburger from "hamburger-react"
import { useMediaQuery } from "react-responsive"

export default function NavBar()
{
    const [hamburgerStatus, setHamburger] = useState(false);

    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1280px)'})
    const isPhone = useMediaQuery({query: '(min-width: 720px'})
    
    useEffect(() => {
        if(isDesktopOrLaptop)
            setHamburger(false)
      }, [])
    return (
        <div className="flex bg-white bg-opacity-90 drop-shadow-sm sticky top-0 place-content-between">
            <div className="top my-auto pl-20">
                {isPhone ? <Logo style="with-text"/> : <Logo/>}
            </div>
            <div className="my-auto place-content-center">
                <span className="top px-20 place-content-center lg:hidden flex"><Hamburger color="#454d66" toggled={hamburgerStatus} toggle={setHamburger}/></span> 
                {(isDesktopOrLaptop || hamburgerStatus) && <ul className="lg:flex lg:bg-opacity-0 bg-white bg-opacity-90 p-2 rounded-b-3xl lg:relative absolute text-black text-center lg:mr-20 lg:items-center lg:space-x-10 text-2xl font-fredoka-light">
                    <li className="cursor-pointer">HOME</li>
                    <li className="cursor-pointer">FOOD</li>
                    <li className="cursor-pointer">BLOGS</li>
                    <li className="cursor-pointer"><Button isRounded={true} name="ACCOUNT"/></li>
                </ul>
                }
            </div>
        </div>
    )
}