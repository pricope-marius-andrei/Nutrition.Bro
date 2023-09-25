'use client'

import { useState } from "react"
import {AiOutlinePlusCircle} from "react-icons/ai"

async function getNutritionalValues(query) {
const axios = require('axios');

const apiKey = '1PvMb3T5Lus0mXaRtKfjFw==n01e6GVPCY28ykv7'; // Replace with your actual API key
// const query = 'your_query_string'; // Replace with your query string

axios({
  method: 'GET',
  url: `https://api.api-ninjas.com/v1/nutrition?query=${query}`,
  headers: {
    'X-Api-Key': apiKey,
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error('Error: ', error.response.data);
  });
}


export default function PopUpAddFood() 
{
    const [status, setStatus] = useState("none")
    const [customTab, setCustomTab] = useState("ingredients")
    const [food, setFood] = useState("")
    const [nutritionalValues, setNutrtionalValues] = useState(null)
    return (
        <div>
            {
                status === "none" &&
                <div className="bg-gray h-96 w-auto grid grid-rows-1 grid-cols-2 gap-5 p-16">
                    <button className="bg-white hover:bg-gray rounded-lg drop-shadow-md" onClick={()=>setStatus("search")}>
                        <div className="m-auto">
                            <img className="h-36 m-auto" src="./icons/logo.svg"></img>
                            <h1 className="font-fredoka-medium text-lg text-black mt-2">Search Food</h1>
                        </div>
                    </button>
                    <button className="bg-white hover:bg-gray rounded-lg drop-shadow-md" onClick={()=>setStatus("custom")}>
                        <div className="m-auto">
                            <img className="h-36 m-auto" src="./icons/logo.svg"></img>
                            <h1 className="font-fredoka-medium text-lg text-black mt-2">Custom Meal</h1>
                        </div>
                    </button>
                </div>
            }

            {
                status === "search" &&
                <div>
                    <input value={food} onChange={(food)=>setFood(food.target.value)} placeholder="Search food"></input>
                    <button onClick={()=>{getNutritionalValues(food)}}>Get Nutritional Values</button>
                    <h1></h1>
                </div>
            }

            {
                status === "custom" &&
                <div className="grid grid-row-3 grid-cols-1">
                    <div className="bg-gray grid grid-cols-3 h-auto w-auto gap-7 font-fredoka-medium">
                        <div className="flex w-full bg-gradient-to-tr from-green to-green-lime align-top mr-auto text-center m-auto text-white p-5">
                            <button onClick={()=>{setStatus("none"); setCustomTab("ingredients")}} className="w-full">Back</button>
                        </div>
                        <div className="flex w-auto h-auto m-auto">
                            <button onClick={()=>setCustomTab("ingredients")}>Ingredients</button>
                        </div>
                        <div className="flex w-auto h-auto m-auto">
                            <button onClick={()=>setCustomTab("nutrition")}>Nutrition</button>
                        </div>
                    </div>
                    <div>
                        {
                            customTab == "ingredients" &&
                            <div>
                               <button><AiOutlinePlusCircle/></button>
                            </div>
                        }
                        {
                            customTab == "nutrition" &&
                            <div>
                                <h1>Nutrition</h1>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}