import {AiOutlineSearch} from "react-icons/ai"

export default function SearchBar(props:any) {

    return (
        <div className="flex w-full">
            <div className="flex m-auto drop-shadow-sm focus:drop-shadow-lg rounded-lg pb-10">
                <AiOutlineSearch size={props.sizeIcon} className="flex w-fit h-fit my-auto bg-white p-5"/>
                <input className={"flex w-48 focus:animate-larger focus:w-96 outline-none px-5"} value={props.food} onChange={(food)=>props.setFood(food.target.value)} placeholder="Search food"></input>  
            </div>
        </div>
    )
}