'use client'

import Button from "../common/button"

export default function Hero() {
    return (
        // <div className="md:flex sm:place-content-between m-auto lg:py-16 py-10">
        <div className="md:flex md:flex-row flex flex-col w-full md:justify-around justify-center items-center px-20 py-10 font-fredoka-medium heropattern-ilikefood-green-lime/10">
            <div className="w-auto py-20 md:self-start self-center">
                <h1 className="lg:text-5xl text-4xl pb-5 text-black md:w-2/3 w-full">Here is the place where you find all you need.<br></br> Save your progress from the gym and count your calories.</h1>
                    <Button isRounded={true} name="EXPLORE"/>
                </div>
            <img className="flex sm:w-96 w-72" src="./images/hero_img.svg"></img>
        </div>
    )
}