'use client'

import Link from "next/link";
import Image from "next/image";

export default function Button(props:any) {
    
    //set the style of the button
    let classNameProp = !props.isTransparent ? 
    "flex w-full px-5 bg-gradient-to-r from-dark-grass to-green-lime py-4 text-white font-fredoka-medium " :
    "flex w-full pt-4 pb-4 px-5 text-black font-fredoka-regular ";

    // //set the width of the button
    classNameProp += props.width ? props.width + " " : "w-64 "

    //set rounded value for the button
    classNameProp += props.isRounded ? props.rounded ? props.rounded + " " : "rounded-3xl " : "h-24 "

    classNameProp += props.textSize ? props.textSize : "text-xl "

    classNameProp += props.fullWidth ? "w-full " : " "

    let url = props.url

    return (
        url ?
        <Link href={url || "/"}>
            <button className={classNameProp} key={props.keyProp} onClick={props.onClick} type={props.type}>
                {props.logo && <Image alt="img" width={40} height={40} className="m-auto rounded-full" src={props.logo}></Image>}
                <div className="m-auto">
                    {props.name}
                </div>
            </button>
         </Link>
        
        :
        <button className={classNameProp} key={props.keyProp} onClick={props.onClick} type={props.type}>
            {props.logo && <Image alt="img" width={40} height={40} className="m-auto rounded-full" src={props.logo}></Image>}
            <div className="m-auto">
                {props.name}
            </div>
        </button>
    )
} 