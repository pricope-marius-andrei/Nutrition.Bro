import { GiBodyHeight, GiWeight } from "react-icons/gi";
import {AiFillEye} from "react-icons/ai"

export default function AccountDetails(props) {
return(
    <div className="h-fit w-full">
        <div className="bg-white w-full flex flex-col justify-between rounded-lg h-full">
            <div className="grid grid-rows-2 grid-cols-1 w-full">

                <div className="flex ml-auto h-fit w-fit">
                    {
                        props.height != 0.0 && props.weight != 0.0 && props.updateStatus && 
                        <button className="text-center m-auto text-white font-fredoka-medium p-5 bg-gradient-to-tr from-green to-grass-green rounded-tr-lg" onClick={props.handleUpdateUser}>Save</button>
                    }
                </div>
                {/*photo name section */}
                <div className="flex m-auto h-fit w-fit">
                    <img className="h-20 rounded-full" src={props.image}></img>
                    <h1 className="w-full font-fredoka-medium text-base m-auto ml-10">{props.name}</h1>
                </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center mt-5">
                <div className="flex items-center justify-center">
                    <div className="flex items-center">
                        <GiBodyHeight size={30}/>
                        <h1>Height:</h1>
                    </div>
                    <input value={props.height ? props.height : 0} type="number" className="outline-none w-20 text-right" placeholder="Enter your height" onChange={(height)=>{props.setHeight(height.target.value); props.setUpdateStatus(true)}}></input>
                </div>
                <div className="flex items-center justify-center mt-2">
                    <div className="flex items-center">
                        <GiWeight size={30}/>
                        <h1>Weight:</h1>
                    </div>
                    <input value={props.weight ? props.weight : 0} type="number" className="outline-none w-20 text-right" placeholder="Enter your height" onChange={(weight)=>{props.setWeight(weight.target.value); props.setUpdateStatus(true)}}></input>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center w-full mt-5">
                <div className="flex bg-[#D9D9D9] h-44 w-44 rounded-2xl">
                    <img className="self-center m-auto" src="/"></img>
                </div>
                <a className="flex pb-10" href="/">
                    <AiFillEye size={30} color="#309975"/>
                    <h1 className="text-green font-fredoka-medium my-auto ">View your progress</h1>
                </a>
            </div>
        </div>
    </div>
    )
}