'use client'

import { useEffect, useState } from "react"
import {AiOutlinePlusCircle, AiOutlineSearch} from "react-icons/ai"
import {TbEdit} from "react-icons/tb"
import SearchBar from "@components/common/search_bar"
import Button from "@components/common/button";
import EditProgressBar from "@components/common/edit_prograss_bar"
import {BiSolidSave} from "react-icons/bi"

async function getNutritionalValues(query) {
    const axios = require('axios');

    const apiKey = 'OOCXpai5hE5qD1yvyzjVDxjlfSamS2Xc361m3PNa';

    try {
    
        const response = await axios({
            method: 'GET',
            url: `https://api.api-ninjas.com/v1/nutrition?query=${query}`,
            headers: {
                'X-Api-Key': apiKey,
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': 'http://localhost:3000' ,
            },
        })

        return response.data

    } catch (error) {
        console.log(error)
    }

    
}

export default function PopUpAddFood(props) 
{

    const [status, setStatus] = useState("none")
    const [customTab, setCustomTab] = useState("ingredients")
    const [food, setFood] = useState('')
    const [foodName, setFoodName] = useState('')
    const [nutritionalValues, setNutrtionalValues] = useState(null)
    const [calories, setCalories] = useState(0)
    const [servingSize, setServingSize] = useState(0)
    const [protein, setProtein] = useState(0)
    const [totalFats, setTotalFats] = useState(0)
    const [saturatedFats, setSaturatedFats] = useState(0)
    const [carbohydrates, setCarbohydrates] = useState(0)
    const [fiber, setFiber] = useState(0)
    const [cholesterol, setCholesterol] = useState(0)
    const [potassium, setPotassium] = useState(0)
    const [sodium, setSodium] = useState(0)
    const [sugar, setSugar] = useState(0)
    const [editMode, setEditMode] = useState(false)
    const nutritionalValueProgressBarWidth = "400px"
    const errorPrecentage = 12
    const theSmallestEnergy = 4

    if(servingSize < 0)
    {
        setServingSize(0)
    }
    // console.log(props.dataSession);
    const provider = props.dataSession?.user.sessionName === "Credentials" ? "updateUserFoodCredentials" : "updateUserFood";   
    const id = props.dataSession?.user.email;

    const handleUpdateUser = async () => {

        console.log(provider)
        try {
          const response = await fetch(`http://localhost:3000/api/${provider}`, {
            method: 'PUT',
            body: JSON.stringify({_id:id, name:foodName, calories}),
            headers: {
              'Content-Type': 'application/json',
            },
          })

    
          if (response.status === 200) {
            // Handle successful update
            console.log('User updated successfully')
          } else {
            // Handle error
            console.error('Error updating user')
          }
        } catch (error) {
          console.error('Error updating user', error)
        }
      }

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
                <div className="w-full h-fit p-10">
                    <div className="grid h-auto grid-rows-1 grid-cols-2"> {/*The top section of the pop-up*/}
                        <Button onClick={()=>{setStatus("none"), setNutrtionalValues(null), setEditMode(false)}} isTransparent={true} name="Back"/>
                        <Button
                            onClick=
                            {
                                async () => {
                                    try {
                                        if(food.replace(" ", "").length > 0) {
                                            const nutritionalValues = await getNutritionalValues(food)
                                            setFood('')
                                            if(nutritionalValues !== undefined) {
                                                console.log(nutritionalValues[0])
                                                setNutrtionalValues(nutritionalValues[0])
                                                setFoodName(nutritionalValues[0].name.slice(0,1).toUpperCase() + nutritionalValues[0].name.slice(1,nutritionalValues[0].name.length))
                                                setCalories(nutritionalValues[0].calories)
                                                setServingSize(nutritionalValues[0].serving_size_g)
                                                setCarbohydrates(nutritionalValues[0].carbohydrates_total_g)
                                                setProtein(nutritionalValues[0].protein_g)
                                                setTotalFats(nutritionalValues[0].fat_total_g)
                                                setSaturatedFats(nutritionalValues[0].fat_saturated_g)
                                                setCholesterol(nutritionalValues[0].cholesterol_mg)
                                                setFiber(nutritionalValues[0].fiber_g)
                                                setPotassium(nutritionalValues[0].potassium_mg)
                                                setSodium(nutritionalValues[0].sodium_mg)
                                                setSugar(nutritionalValues[0].sugar_g)
                                            }
                                        }
                                        else 
                                        {
                                            alert("You should write a food")
                                        }
                                    } catch (error) {
                                        console.log(error)
                                    }
                                }
                                
                            }
                            fullWidth={true} 
                            isTransparent={food.replace(" ", "").length == 0} 
                            name="Get Nutritional Values"/>
                    </div>
                    <SearchBar sizeIcon={30} food={food} setFood={setFood}></SearchBar>
                    {
                        /*Nutritional Values*/
                        nutritionalValues && nutritionalValues !== null &&    
                        <div className="bg-white flex h-auto row-span-3 p-10 pb-20"> {/*The whole frame*/}
                            <div className="w-full grid grid-cols-2 gap-5"> {/* the nutritional values frame */}
                                <div className="">
                                    <div className="flex justify-between w-full">
                                        {
                                            !editMode ?
                                                <div className="flex">
                                                    <h1 className="mr-auto font-fredoka-regular text-black text-3xl">{foodName}</h1>
                                                    <div className="flex m-auto h-fit w-fit mx-2">
                                                        <button onClick={()=>{setEditMode(!editMode)}}><TbEdit size={30} color="#454d66"/></button>
                                                    </div>
                                                </div>
                                                :
                                                <input className="py-3 pl-2 w-60 font-fredoka-regular text-black text-3xl animate-pulse focus:animate-none focus:border-dark-grass focus:rounded-lg focus:border-2 outline-none" 
                                                onChange={(name)=>{setFoodName(name.target.value)}} 
                                                value={foodName}></input>
                                        }
                                        {
                                            !editMode ?
                                                <button className="px-3 py-1 hover:bg-transparent hover:text-black bg-dark-grass text-lg text-white font-fredoka-medium rounded-lg" onClick={handleUpdateUser}>Add Food</button>
                                            :
                                            <div className="bg-yellow-light flex m-auto h-fit w-fit mx-2">
                                                <button onClick={()=>{setEditMode(!editMode)}}><BiSolidSave size={30} color="#454d66"/></button>
                                            </div>
                                        }
                                        
                                    </div>
                                    <div className="m-auto">
                                        <h1 className="font-fredoka-medium text-black">Proteine</h1>
                                        <EditProgressBar 
                                            editMode={editMode}
                                            totalNutientValue={protein}
                                            servingSize={servingSize}
                                            smallestEnergy={theSmallestEnergy}
                                            calories={calories}
                                            width={nutritionalValueProgressBarWidth}
                                            setNutritionalValue={setProtein}
                                            setCalories={setCalories}
                                            labelSize="12px"
                                            error={errorPrecentage}
                                            nutritionalParameter={4}
                                            unit="g"
                                        />
                                    </div>
                                    <div className="m-auto">
                                        <h1 className="font-fredoka-medium text-black">Total Fat</h1>
                                        <EditProgressBar 
                                            editMode={editMode}
                                            totalNutientValue={totalFats}
                                            servingSize={servingSize}
                                            smallestEnergy={theSmallestEnergy}
                                            calories={calories}
                                            width={nutritionalValueProgressBarWidth}
                                            setNutritionalValue={setTotalFats}
                                            setCalories={setCalories}
                                            labelSize="12px"
                                            error={errorPrecentage}
                                            nutritionalParameter={9}
                                            unit="g"
                                            />
                                    </div>
                                    <div className="m-auto">
                                        <h1 className="font-fredoka-medium text-black">Saturated Fat</h1>
                                        <EditProgressBar 
                                            editMode={editMode}
                                            totalNutientValue={saturatedFats}
                                            servingSize={servingSize}
                                            smallestEnergy={theSmallestEnergy}
                                            calories={calories}
                                            width={nutritionalValueProgressBarWidth}
                                            setNutritionalValue={setSaturatedFats}
                                            setTotalFats={setTotalFats}
                                            totalFats={totalFats}
                                            setCalories={setCalories}
                                            labelSize="12px"
                                            error={errorPrecentage}
                                            nutritionalParameter={9}
                                            unit="g"
                                        />
                                    </div>
                                    <div className="m-auto">
                                        <h1 className="font-fredoka-medium text-black">Carbohydrates</h1>
                                        <EditProgressBar 
                                            editMode={editMode}
                                            totalNutientValue={carbohydrates}
                                            servingSize={servingSize}
                                            smallestEnergy={theSmallestEnergy}
                                            calories={calories}
                                            width={nutritionalValueProgressBarWidth}
                                            setNutritionalValue={setCarbohydrates}
                                            setCalories={setCalories}
                                            labelSize="12px"
                                            error={errorPrecentage}
                                            nutritionalParameter={4}
                                            unit="g"
                                        />
                                    </div>
                                    <div className="m-auto">
                                        <h1 className="font-fredoka-medium text-black">Sugar</h1>
                                        <EditProgressBar 
                                            editMode={editMode}
                                            totalNutientValue={sugar}
                                            servingSize={servingSize}
                                            smallestEnergy={theSmallestEnergy}
                                            calories={calories}
                                            width={nutritionalValueProgressBarWidth}
                                            setNutritionalValue={setSugar}
                                            setTotalCarbohydrates={setCarbohydrates}
                                            totalCarbohydrates={carbohydrates}
                                            setCalories={setCalories}
                                            labelSize="12px"
                                            error={errorPrecentage}
                                            nutritionalParameter={4}
                                            unit="g"
                                        />
                                    </div>
                                    <div className="m-auto">
                                        <h1 className="font-fredoka-medium text-black">Fiber</h1>
                                        <EditProgressBar 
                                            editMode={editMode}
                                            totalNutientValue={fiber}
                                            servingSize={servingSize}
                                            smallestEnergy={theSmallestEnergy}
                                            calories={calories}
                                            width={nutritionalValueProgressBarWidth}
                                            setNutritionalValue={setFiber}
                                            setCalories={setCalories}
                                            labelSize="12px"
                                            error={errorPrecentage}
                                            nutritionalParameter={0}
                                            unit="g"
                                        />
                                    </div>
                                    <div className="m-auto">
                                        <h1 className="font-fredoka-medium text-black">Potassium</h1>
                                        <EditProgressBar 
                                            editMode={editMode}
                                            totalNutientValue={potassium}
                                            servingSize={servingSize}
                                            smallestEnergy={theSmallestEnergy}
                                            calories={calories}
                                            width={nutritionalValueProgressBarWidth}
                                            setNutritionalValue={setPotassium}
                                            setCalories={setCalories}
                                            labelSize="12px"
                                            error={errorPrecentage}
                                            nutritionalParameter={0}
                                            unit="mg"
                                        />
                                    </div>
                                    <div className="m-auto">
                                        <h1 className="font-fredoka-medium text-black">Sodium</h1>
                                        <EditProgressBar 
                                            editMode={editMode}
                                            totalNutientValue={sodium}
                                            servingSize={servingSize}
                                            smallestEnergy={theSmallestEnergy}
                                            calories={calories}
                                            width={nutritionalValueProgressBarWidth}
                                            setNutritionalValue={setSodium}
                                            setCalories={setCalories}
                                            labelSize="12px"
                                            error={errorPrecentage}
                                            nutritionalParameter={0}
                                            unit="mg"
                                        />
                                    </div>
                                    <div className="m-auto">
                                        <h1 className="font-fredoka-medium text-black">Cholesterol</h1>
                                        <EditProgressBar 
                                            editMode={editMode}
                                            totalNutientValue={cholesterol}
                                            servingSize={servingSize}
                                            smallestEnergy={theSmallestEnergy}
                                            calories={calories}
                                            width={nutritionalValueProgressBarWidth}
                                            setNutritionalValue={setCholesterol}
                                            setCalories={setCalories}
                                            labelSize="12px"
                                            error={errorPrecentage}
                                            nutritionalParameter={0}
                                            unit="mg"
                                        />
                                    </div>
                                    {/* {
                                        !editMode && 
                                        <div className="mt-3">
                                            
                                        </div>
                                    } */}
                                </div>
                                
                                <div className="h-full w-full flex m-auto">
                                    <div className="m-auto">
                                        <h1 className="my-auto font-fredoka-medium text-3xl text-center">Total:</h1>
                                        <h1 className="my-auto font-fredoka-medium text-xl text-center">{`${(calories * servingSize / 100).toFixed(2)} kcal`}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
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