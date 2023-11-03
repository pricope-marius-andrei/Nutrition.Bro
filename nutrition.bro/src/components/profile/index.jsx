'use client'
import {signOut, useSession} from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Logo from "../common/logo"
import {AiFillEdit, AiFillEye} from "react-icons/ai"
import {GiBodyHeight, GiWeight} from "react-icons/gi"
import { CircularProgressbar,CircularProgressbarWithChildren, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ProgressProvider from "../common/progress_provider";
import ProgressBar from "@ramonak/react-progress-bar"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PopUpAddFood from "../add-food"

function getTotalCalories(foods)
{
    let total_calories = 0;
    foods.map(food => {total_calories += food.calories});
    return total_calories.toFixed(2);
}

function getTotalFats(foods)
{
    let total_fats = 0;
    foods.map(food => {total_fats += food.total_fats});
    return total_fats.toFixed(2);
}

function getTotalProtein(foods)
{
    let total_protein = 0;
    foods.map(food => {total_protein += food.protein});
    return total_protein.toFixed(2);
}

function getTotalCarbo(foods)
{
    let total_carbo = 0;
    foods.map(food => {total_carbo += food.carbohydrates});
    return total_carbo.toFixed(2);
}

export default function ProfileComponent()
{
    const [caloriesPercentage, setCaloriesPercentage]= useState(0);
    const percentageDelay = 15;
    const {status, data:session} = useSession()

    console.log(session);

    const heightDb = session?.user.measurements?.height
    const weightDb = session?.user.measurements?.weight
    const todayFood = session?.user.food;

    const [food, setFood] = useState(todayFood);

    const [height, setHeight] = useState(heightDb)
    const [weight, setWeight] = useState(weightDb)

    const [updateStatus, setUpdateStatus] = useState(false)
    const [popUpAddFood, setPopUpAddFood] = useState(false)

    const router = useRouter()

    const [goalPercentage, setGoalPercentage] = useState(0);
    const [animationGoalPercentage, setAnimationGoalPercentage] = useState(0)
    const [calories, setCalories] = useState(0)

    const id = session?.user.email


    useEffect(() => {
        setHeight(heightDb);
        setWeight(weightDb);
        setFood(todayFood);
    },[heightDb,weightDb,todayFood])

    useEffect(() => {
        setTimeout(() => {
        if (animationGoalPercentage < goalPercentage) {
            setAnimationGoalPercentage(animationGoalPercentage + 1);
        }
        }, percentageDelay);
    }, [goalPercentage, animationGoalPercentage]);


    if(height < 0)
    {
        setHeight(0.0)
    }

    if(weight < 0)
    {
        setWeight(0.0)
    }
    
    const provider = session?.user.sessionName === "Credentials" ? "updateUserCredentials" : "updateUser"
    
    const handleUpdateUser = async () => {
        console.log(provider)

        console.log(session?.user.measurements?.height);
        
        try {
            const response = await fetch(`http://localhost:3000/api/${provider}`, {
                method: 'PUT',
                body: JSON.stringify({_id:id, height:height, weight:weight}),
                headers: {
                },
                'Content-Type': 'application/json',
            })
            
            
            if (response.status === 200) {
                // Handle successful update
                console.log('User updated successfully')
                setUpdateStatus(false)
            } else {
                // Handle error
                console.error('Error updating user')
            }
        } catch (error) {
            console.error('Error updating user', error)
        }
    }
    
    
    useEffect(()=>{
        if(status === "unauthenticated") router.push("/sign-up");
    }, [status])
    
    if(status === "authenticated") {

        const total_calories = getTotalCalories(todayFood);
        const total_fats = getTotalFats(todayFood);
        const total_protein = getTotalProtein(todayFood);
        const total_carbo = getTotalCarbo(todayFood);

        return( 
            <div className="bg-[#EAEAEA] h-full w-full flex">
                <div className="flex h-auto bg-white w-36">
                    <a  className="flex mx-auto hover:bg-gray h-fit w-auto hover:py-4 hover:px-9 px-10 py-5 mt-5 rounded-lg" href="/">
                        <Logo></Logo>
                    </a>
                    <button className="bg-yellow p-2 mt-10 m-auto text-white font-fredoka-semi-bold" onClick={()=>signOut()}>Sign Out</button>
                </div>
                <div className="m-10 w-full">
                    <div className="flex h-fit w-full">
                        <div className="flex rounded-s-lg px-10 py-7 w-full bg-gradient-to-r from-dark-grass to-green-lime">
                            <div className="flex">
                                <div className="h-fit w-20 mr-5">
                                    <ProgressProvider valueStart={0} valueEnd={goalPercentage}>
                                        { value =>  
                                        
                                        <CircularProgressbar value={value} text={`${value}%`} styles={
                                        {   
                                            root: {},
                                            // Customize the path, i.e. the "completed progress"
                                            path: {
                                                // Path color
                                                stroke: "#58B368",
                                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                strokeLinecap: 'butt',
                                                strokeWidth: 8,
                                                // Customize transition animation
                                                transition: 'stroke-dashoffset 0.5s ease 0s',
                                                // Rotate the path
                                                // transform: 'rotate(0.25turn)',
                                                transformOrigin: 'center center',
                                                
                                            },
                                            // Customize the circle behind the path, i.e. the "total progress"
                                            trail: {
                                                // Trail color
                                                stroke: '#B6B6B7',
                                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                strokeLinecap: 'butt',
                                                strokeWidth: 8,
                                                // Rotate the trail
                                                transform: 'rotate(0.25turn)',
                                                transformOrigin: 'center center',
                                            },
                                            // Customize the text
                                            text: {
                                                // Text color
                                                textAlign:'center',
                                                fill: 'white',
                                                // Text size
                                                fontSize: '32px',
                                                fontFamily: "fredoka-medium"
                                            },
                                            // Customize background - only used when the `background` prop is true
                                            background: {
                                                fill: "gray",
                                            },
                                            
                                        }
                                        } />
                                    }
                                    </ProgressProvider>
                                </div>
                                <div className="text-white my-auto">
                                    <h1 className="font-fredoka-medium">Complete Your Calories Goal</h1>
                                    <h2 className="font-fredoka-regular">If you want to change your goal just press the button from the right</h2>
                                </div>
                            </div>
                        
                        </div>
                        <div className="flex bg-white px-10 rounded-e-lg text-center align-middle">
                            <Popup trigger={<button><AiFillEdit size={30}/></button>} nested modal>
                                <PopUpAddFood dataSession={session}></PopUpAddFood>
                            </Popup>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-5">
                        <div className="bg-white h-fit w-full rounded-lg mt-5">
                            <div className="grid grid-rows-1 grid-cols-3">
                                <div className="flex h-fit pl-20 pt-10 w-fit col-span-2">
                                    <img className="h-24 rounded-full" src={session.user.image}></img>
                                    <h1 className="w-72 font-fredoka-medium text-lg m-auto ml-10">{session.user._name}</h1>
                                </div>
                                {
                                    height != 0.0 && weight != 0.0 && updateStatus &&
                                    <div className="flex bg-gradient-to-tr from-green to-green-lime h-fit w-20 align-top rounded-tr-lg ml-auto">
                                        <button className="text-center m-auto text-white font-fredoka-medium p-5" onClick={handleUpdateUser}>Save</button>
                                    </div>
                                }
                            </div>
                            <div className="flex w-fit h-fit mt-10 pl-20">
                                <div className="m-auto mr-0">
                                    <GiBodyHeight size={30}/>
                                </div>
                                    <h1 className="m-auto ml-2">Height:</h1>
                                <input value={height ? height : 0} type="number" className="ml-5 outline-none w-16" placeholder="Enter your height" onChange={(height)=>{setHeight(height.target.value); setUpdateStatus(true)}}></input>
                            </div>
                            <div className="flex w-fit h-fit mt-3 pl-20">
                                <div className="m-auto mr-0">
                                    <GiWeight size={30}/>
                                </div>
                                    <h1 className="m-auto ml-2">Weight:</h1>
                                <input value={weight ? weight : 0} type="number" className="ml-5 outline-none w-16" placeholder="Enter your height" onChange={(weight)=>{setWeight(weight.target.value);setUpdateStatus(true)}}></input>
                            </div>
                            <hr className="mt-10 opacity-25 mx-16"></hr>
                            
                            <div className="flex bg-[#D9D9D9] mx-20 h-64 w-auto my-10 m-auto rounded-2xl">
                                <img className="self-center m-auto" src="/"></img>
                            </div>
                            <a className="flex ml-16 mb-10 h-fit w-fit" href="/">
                                <AiFillEye size={30} color="#309975"/>
                                <h1 className="text-green font-fredoka-medium my-auto ml-2">View your progress</h1>
                            </a>
                        </div>

                            <div className="grid grid-cols-1 grid-rows-5 col-span-2 gap-5">
                                <div className="bg-white grid h-fit w-full rounded-lg mt-5 grid-rows-5 grid-cols-1 gap-5">
                                    <div className="grid grid-cols-7 grid-rows-1 row-span-4 pt-8">
                                        <div className="flex h-auto w-auto m-auto col-span-3">
                                            <div className="lg:h-auto lg:w-auto h-48 w-48">
                                                <CircularProgressbarWithChildren className="mx-auto" value={total_calories * 100 / 2000} styles={
                                                {   
                                                    root: {},
                                                    // Customize the path, i.e. the "completed progress"
                                                    path: {
                                                        // Path color
                                                        stroke: "#13815B",
                                                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                        strokeLinecap: 'butt',
                                                        strokeWidth: 8,
                                                        // Customize transition animation
                                                        transition: 'stroke-dashoffset 0.5s ease 0s',
                                                        // Rotate the path
                                                        // transform: 'rotate(0.25turn)',
                                                        transformOrigin: 'center center',
                                                        
                                                    },
                                                    // Customize the circle behind the path, i.e. the "total progress"
                                                    trail:  {
                                                        // Trail color
                                                        stroke: '#B6B6B7',
                                                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                        strokeLinecap: 'butt',
                                                        strokeWidth: 8,
                                                        // Rotate the trail
                                                        transform: 'rotate(0.25turn)',
                                                        transformOrigin: 'center center',
                                                            }
                                                    }
                                                }>
                                                    <div className="grid grid-rows-2 grid-cols-1 font-fredoka-regular mt-10 w-fit h-fit">
                                                        <span className="font-fredoka-medium text-center text-5xl">{total_calories}</span>
                                                        <span className="text-center text-2xl text-black opacity-50">kcal</span>
                                                    </div>
                                                </CircularProgressbarWithChildren>
                                            </div>
                                        </div>
                                        <div className="grid grid-rows-3 grid-cols-1 col-span-4 row-span-2">
                                            <div className="m-auto">
                                                <h1 className="font-fredoka-medium text-black">Protein</h1>
                                                <ProgressBar
                                                    bgColor="#13815B"
                                                    completed={parseFloat(total_protein) * 4 * 100 / parseFloat(total_calories)}
                                                    customLabel={`${total_protein}g`}
                                                    width="500px"
                                                    baseBgColor="#C2C2C2"
                                                />
                                            </div>
                                            <div className="m-auto">
                                                <h1 className="font-fredoka-medium text-black">Carbohydrates</h1>
                                                <ProgressBar
                                                    bgColor="#EFEEB4"
                                                    completed={parseFloat(total_carbo) * 4 * 100 / parseFloat(total_calories)}
                                                    customLabel={`${total_carbo}g`}
                                                    labelColor="#454d66"
                                                    width="500px"
                                                    baseBgColor="#C2C2C2"
                                                />
                                            </div>
                                            <div className="m-auto">
                                                <h1 className="font-fredoka-medium text-black">Fats</h1>
                                                <ProgressBar
                                                    bgColor="#58B368"
                                                    completed={parseFloat(total_fats) * 9 * 100 / parseFloat(total_calories)}
                                                    customLabel={`${total_fats}g`}
                                                    width="500px"
                                                    baseBgColor="#C2C2C2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex rounded-b-lg">
                                        <a className="flex my-auto ml-auto mr-10 mb-10" href="/">
                                            <div className="flex m-auto h-fit w-fit">
                                                <AiFillEye size={30} color="#309975"/>
                                            </div>
                                            <h1 className="my-auto ml-2 text-[#309975] font-fredoka-medium">More details</h1>
                                        </a>
                                    </div>
                                </div>
                                
                                {/*List of aliments*/}
                                <div className="bg-white h-fit w-full rounded-lg row-span-4">
                                    <div className="flex w-full h-fit justify-between">
                                        <h1 className="my-auto ml-10 font-fredoka-medium text-[#309975] text-xl">Today's list</h1>
                                        <div className="flex bg-gradient-to-tr from-green to-green-lime h-fit w-32 align-top rounded-tr-lg ml-auto">
                                        <Popup trigger={<button className="text-center m-auto text-white font-fredoka-medium p-5" onClick={()=>{setPopUpAddFood(true)}}>Add Food</button>} modal nested>
                                            <PopUpAddFood dataSession={session}></PopUpAddFood>
                                        </Popup>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 h-fit pb-10 pt-10 gap-2 text-black">
                                        {
                                            todayFood &&
                                            todayFood.map((food)=>
                                                <div key={food._id} className="w-auto h-fit ml-5 mr-5 py-5 px-10 bg-white rounded-lg drop-shadow-lg">
                                                    <h1 key={food._id}>{food.name}</h1>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <h1>Loading...</h1>
    )
}