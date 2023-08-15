'use client'

import Button from "../common/button";
import {useState } from "react";
import logo from "../../../public/icons/logo.svg"

export default function Menu()
{
    const [statusButtons,changeStatus] = useState({id1:false,id2:true,id3:true,id4:true}) 

    return (
        <div className="my-28">
            <div className="md:flex justify-center">
                <div className="w-fit h-fit" onClick={()=> {changeStatus(
                    {
                        id1:false,
                        id2:true,
                        id3:true,
                        id4:true
                    })
                    }}>
                    <Button logo={logo} isTransparent={statusButtons.id1} name="CALORIES CALCULATOR"/>
                </div>
                <div className="w-fit h-fit" onClick={()=> {changeStatus(
                    {
                        id1:true,
                        id2:false,
                        id3:true,
                        id4:true
                    })
                    }}>
                    <Button logo={logo} isTransparent={statusButtons.id2} name="RECIPES"/>
                </div>
                <div className="w-fit h-fit" onClick={()=> {changeStatus(
                    {
                        id1:true,
                        id2:true,
                        id3:false,
                        id4:true
                    })
                    }}>
                    <Button logo={logo} isTransparent={statusButtons.id3} name="F.O.T.D"/>
                </div>
                <div className="w-fit h-fit" onClick={()=> {changeStatus(
                    {
                        id1:true,
                        id2:true,
                        id3:true,
                        id4:false
                    })
                    }}>
                    <Button logo={logo} isTransparent={statusButtons.id4} name="COMPARE CALORIES"/>
                </div>
            </div>
            <hr className="text-black opacity-30 border-t-2 ml-80 mr-80 m-auto mt-0"></hr>
            <div className="flex p-56 ml-2 mr-2 text-center">
                <div className="m-auto">
                    {!statusButtons.id1 && 
                        <div>
                            Content1
                        </div>
                    }
                    {!statusButtons.id2 && 
                        <div>
                            Content2
                        </div>
                    }
                    {!statusButtons.id3 && 
                        <div>
                            Content3
                        </div>
                    }
                    {!statusButtons.id4 && 
                        <div>
                            Content4
                        </div>
                    }
                </div>
            </div>
        </div>
        
    )
}