import React from "react";

export default function Button(props:any) {
    return (
        <button className="bg-gradient-to-r from-grass-green to-dark-grass m-2 px-7 py-3 text-white text-2xl font-fredoka-regular rounded-3xl">
            {props.name}
        </button>
    )
} 