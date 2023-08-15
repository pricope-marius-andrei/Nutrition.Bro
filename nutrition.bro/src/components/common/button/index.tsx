'use client'

import Link from "next/link";
import Image from "next/image";

export default function Button(props:any) {
    
    //set the style of the button
    let classNameProp = !props.isTransparent ? 
    "flex bg-gradient-to-r from-grass-green to-dark-grass px-7 py-4 text-white text-2xl font-fredoka-medium" :
    "flex px-7 pt-4 pb-3 text-black text-2xl font-fredoka-regular";

    classNameProp += props.isRounded ? " rounded-3xl":" h-24"

    return (
        <button className={classNameProp} key={props.key} onClick={props.onClick}>
            {props.logo && <Image alt={props.user} width={30} height={30} className="w-10 m-auto rounded-full" src={props.logo}></Image>}
            <div className="w-40 m-auto">
                {props.name}
            </div>
        </button>
    )
} 