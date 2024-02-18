
import {AiFillDelete } from "react-icons/ai"
import Popup from 'reactjs-popup';
import PopUpAddFood from "../../add-food"
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";


export default function ListOfFoods(props) {
    
    return (
    <div className="bg-white h-fit w-full rounded-lg">
        
        <div className="flex w-full h-fit justify-between">
            <div className="flex w-full justify-center items-center font-fredoka-medium text-[#309975] text-xl">
                <button onClick={()=>{props.setStartDate((date) => {date.setDate(date.getDate()-1); return date;})}}><HiArrowSmLeft/></button>
                <DatePicker className="flex w-fit justify-center text-center p-2 mx-2" selected={props.startDate} onChange={(date) => props.setStartDate(date)} />
                <button onClick={()=>{props.setStartDate((date) => {date.setDate(date.getDate()+1); return date;})}}><HiArrowSmRight/></button>
            </div>
            <div className="flex bg-gradient-to-tr from-grass-green to-green h-fit w-32 align-top rounded-tr-lg ml-auto">
            <Popup trigger={<button className="text-center m-auto text-white font-fredoka-medium p-5" onClick={()=>{props.setPopUpAddFood(true)}}>Add Food</button>} modal nested>
                <PopUpAddFood dataSession={props.session} date_added={props.startDate}></PopUpAddFood>
            </Popup>
            </div>
        </div>
        <div className="grid grid-cols-1 h-full pb-10 pt-10 gap-5 text-black">
            {
                props.todayFood &&
                props.todayFood.map((food)=>
                    <div key={food._id} className="flex justify-between w-auto h-fit mx-5 bg-white rounded-lg drop-shadow-lg font-fredoka-medium">
                        <h1 className="flex items-center ml-10">{food.name}</h1>
                        <div className="flex ">
                            <button onClick={ async () => { await props.deleteHandler(food._id);}} className="flex justify-center bg-gradient-to-tr from-grass-green to-green h-full w-20 p-5 rounded-r-lg"><AiFillDelete size={30} color="white"/></button>
                        </div>
                    </div>
                )
            }
        </div>  
    </div>      
    )
}