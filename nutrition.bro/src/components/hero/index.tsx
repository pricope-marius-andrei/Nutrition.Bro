import Button from "../common/button"

export default function Hero() {
    return (
        <div className="md:flex sm:place-content-between m-auto lg:py-16 py-10">
            <div className="sm:ml-44 ml-20 m-auto">
                <h1 className="sm:max-w-3xl font-fredoka-medium lg:text-7xl sm:text-6xl text-5xl pb-5 text-black">Here you’ll find all information about nutrition which you’ll ever need.</h1>
                <Button name="EXPLORE"/>
            </div>
            <img className="md:flex hidden ml-44 md:ml-0 lg:w-2/6 sm:w-96 mr-44 md:pt-0 pt-10" src="./hero_img.svg"></img>
        </div>
    )
}