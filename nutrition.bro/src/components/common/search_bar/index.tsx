import {AiOutlineSearch} from "react-icons/ai"

export default function SearchBar(props:any) {

    return (
        <div className="flex w-full">
            <div className="flex m-auto drop-shadow-sm focus:drop-shadow-lg rounded-lg">
                <AiOutlineSearch size={props.sizeIcon} className="flex w-fit h-fit my-auto bg-white p-5"/>
                <input className={"flex lg:w-48 w-20 lg:focus:animate-larger lg:focus:w-64 outline-none px-5"} value={props.food} onChange={(food)=>props.setFood(food.target.value)} placeholder="Search food"></input>  
            </div>
        </div>
    )
}