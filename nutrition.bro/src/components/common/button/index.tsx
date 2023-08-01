import React from "react";

export default function Button(props:any) {

    //set the style of the button
    let classNameProp = !props.transparent ? 
    "flex bg-gradient-to-r from-grass-green to-dark-grass m-2 px-7 py-4 text-white text-2xl font-fredoka-regular rounded-3xl" :
    "flex m-2 px-7 pt-4 pb-3 text-black text-2xl font-fredoka-regular rounded-3xl";

    return (

        <button className={classNameProp}>
            {props.logo && <img className="w-10 m-auto mr-4" src="./logo.svg"></img>}
            {props.name}
        </button>
    )
} 