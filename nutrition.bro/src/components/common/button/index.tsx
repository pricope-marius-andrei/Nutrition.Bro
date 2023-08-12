'use client'

export default function Button(props:any) {
    
    //set the style of the button
    let classNameProp = !props.isTransparent ? 
    "flex bg-gradient-to-r from-grass-green to-dark-grass px-7 py-4 text-white text-2xl font-fredoka-medium" :
    "flex px-7 pt-4 pb-3 text-black text-2xl font-fredoka-regular";

    classNameProp += props.isRounded ? " rounded-3xl":" h-24"

    return (
        <button className={classNameProp}>
            {props.logo && <img className="w-10 m-auto mr-4" src="./logo.svg"></img>}
            <div className="w-40 m-auto">
                {props.name}
            </div>
        </button>
    )
} 