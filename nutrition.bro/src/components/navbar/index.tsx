'use client'

import Logo from "../common/logo"
import Button from "../common/button"
import React,{ useState, useEffect } from "react"
import Hamburger from "hamburger-react"
import { useMediaQuery } from "react-responsive"

export default function NavBar()
{
    const [hamburgerStatus, setHamburger] = useState(false);

    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1080px)'})
    
    useEffect(() => {
        if(isDesktopOrLaptop)
            setHamburger(false)
      }, [])
    return (
        <div className="flex place-content-between m-12">
            <div className="top">
                <Logo style="with-text"/>
            </div>
            <div className="place-content-center">
                <span className="top px-20 place-content-center lg:hidden flex"><Hamburger color="#454d66" toggled={hamburgerStatus} toggle={setHamburger}/></span> 
                {(isDesktopOrLaptop || hamburgerStatus) && <ul className="lg:flex text-black lg:mr-20 text-center lg:items-center lg:space-x-10 text-3xl font-fredoka-light">
                    <li className="cursor-pointer">HOME</li>
                    <li className="cursor-pointer">FOOD</li>
                    <li className="cursor-pointer">BLOGS</li>
                    <li className="cursor-pointer"><Button name="ACCOUNT"/></li>
                </ul>
                }
            </div>
        </div>
    )
}