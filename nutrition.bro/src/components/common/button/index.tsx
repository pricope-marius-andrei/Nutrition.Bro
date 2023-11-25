'use client'

import Link from "next/link";
import Image from "next/image";

//buttons with logo and without logo
//transparent and opaque

export default function Button(props:any) {
    return (
        <Link 
            href={props.url ? props.url : ''} 
            className={`flex justify-between items-center p-2 rounded-2xl px-5
            ${props.fullWidth ? `w-full` : `w-40`}
            ${props.isTransparent ? `bg-transparent text-black`: `bg-gradient-to-r from-grass-green to-green text-white`}
            font-fredoka-medium`} 
            key={props.keyProp} 
            onClick={props.onClick} 
            type={props.type}>
        {
            props.logo &&
                <Image className="rounded-full" alt="logo" width={40} height={40} src={props.logo}/>
        }
            <div className="flex items-center m-auto">
                {props.name}
            </div>
        </Link>
    )
} 