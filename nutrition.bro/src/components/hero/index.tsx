import Button from "../common/button"

export default function Hero() {
    return (
        <div className="md:flex sm:place-content-between m-auto lg:py-16 py-10">
            <div className="md:ml-44 sm:ml-20 ml-16 m-auto">
                <h1 className="sm:max-w-3xl font-fredoka-medium lg:text-7xl sm:text-6xl text-5xl pb-5 text-black">Here you’ll find all information about nutrition which you’ll ever need.</h1>
                <Button name="EXPLORE"/>
            </div>
            <img className="flex md:ml-0 lg:w-2/6 sm:w-96 w-72 m-auto  md:pt-0 pt-10" src="./hero_img.svg"></img>
        </div>
    )
}