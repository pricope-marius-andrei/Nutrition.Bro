'use client'
import {signOut, useSession} from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {AiFillEdit, AiFillEye, AiFillHome, AiOutlineLogout, AiFillDelete } from "react-icons/ai"
import {GiBodyHeight, GiWeight} from "react-icons/gi"
import { CircularProgressbar,CircularProgressbarWithChildren} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ProgressProvider from "../common/progress_provider";
import ProgressBar from "@ramonak/react-progress-bar"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PopUpAddFood from "../add-food"
import useSWR from "swr"
import randomNumber from "../../utils/random"

const fetcher = (url) => fetch(url).then((res)=>res.json());

let loadingImges = {
    "1": "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Person%20Bouncing%20Ball%20Light%20Skin%20Tone.png",
    "2": "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Man%20Running%20Light%20Skin%20Tone.png"
}



export default function ProfileComponent()
{
    const [caloriesPercentage, setCaloriesPercentage]= useState(0);
    const percentageDelay = 15;

    //useSWR - is another solution for get the user
    const {data:session,mutate} = useSWR("/api/auth/session", fetcher, {
        revalidateOnFocus: false,
    }); 
    const {status} = useSession()
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
    const [animationGoalPercentage, setAnimationGoalPercentage] = useState(0);
    const [calories, setCalories] = useState(0);
    const [protein, setProtein] = useState(0);
    const [carbohydrate, setCarb] = useState(0);
    const [fats, setFats] = useState(0);

    const email = session?.user.email

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

    const deleteHandler = async () => {
        try {
            const response = await fetch("/api/deleteFood", {
                method: 'DELETE',
                body: JSON.stringify({id_user:email}),
                headers: {
                'Content-Type': 'application/json',
                },
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleUpdateUser = async () => {

        try {
          const response = await fetch(`/api/${provider}`, {
            method: 'PUT',
            body: JSON.stringify({_id:email, height:height, weight:weight}),
            headers: {
              'Content-Type': 'application/json',
            },
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

    useEffect(()=> {
        mutate();
        if( todayFood )
        {
            let totalCalories = 0.0;
            let totalProtein = 0.0;
            let totalCarbohydrate = 0.0;
            let totalFats = 0.0;
            todayFood.map((item)=> {
                totalCalories += item.calories;
                totalProtein += item.protein;
                totalCarbohydrate += item.carbohydrates;
                totalFats += item.total_fats;
            });
            
            setCalories(totalCalories.toFixed(2));
            setProtein(totalProtein.toFixed(2));
            setCarb(totalCarbohydrate.toFixed(2));
            setFats(totalFats.toFixed(2));
            setCaloriesPercentage(calories * 100 / 2000);
        } 
    })

    if(status === "authenticated") {

        return( 
            <div className="bg-[#EAEAEA] h-full w-full flex heropattern-ilikefood-green-lime/10">
                {/*Menu section */}
                <div className="w-fit h-screen bg-white px-2 rounded-b-lg">
                    <a  className="flex wx-auto hover:bg-gray h-fit w-auto px-5 py-5 mt-5 rounded-lg" href="/">
                        <AiFillHome size={20}/>
                    </a>
                    <button className="flex wx-auto hover:bg-gray px-5 py-5 rounded-lg" onClick={()=>signOut()}><AiOutlineLogout size={20} color="black" fill="black"/></button>
                </div>

                <div className="m-5 w-full">
                    <div className="flex h-fit w-full">
                        {/*Goal section */}
                        <div className="flex rounded-s-lg px-10 py-4 w-full bg-gradient-to-tr to-green from-grass-green">
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
                                <div className="md:block hidden text-white my-auto">
                                    <h1 className="font-fredoka-medium">Complete Your Calories Goal</h1>
                                    <h2 className="font-fredoka-regular">If you want to change your goal just press the button from the right</h2>
                                </div>
                            </div>
                        
                        </div>
                        <div className="flex bg-white px-10 rounded-e-lg text-center align-middle">
                            <button><AiFillEdit size={30}/></button>
                        </div>
                    </div>
                    {/*Dashboard*/}
                    <div className="grid lg:grid-rows-1 grid-rows-2 gap-5 mt-5"> 
                    {/* O coloana cu Doua randuri / rep(O coloana cu Trei Randuri) */}
                        {/*First row */}
                        <div className="grid lg:grid-cols-3 lg:row-span-1 grid-cols-1 row-span-3 lg:gap-5"> 
                            {/*Left section */}
                            <div className="h-fit w-full">
                                <div className="bg-white w-full flex flex-col justify-between rounded-lg h-full">
                                    <div className="grid grid-rows-2 grid-cols-1 w-full">

                                        <div className="flex ml-auto h-fit w-fit">
                                            {
                                                height != 0.0 && weight != 0.0 && updateStatus && 
                                                <button className="text-center m-auto text-white font-fredoka-medium p-5 bg-gradient-to-tr from-green to-grass-green rounded-tr-lg" onClick={handleUpdateUser}>Save</button>
                                            }
                                        </div>
                                        {/*photo name section */}
                                        <div className="flex m-auto h-fit w-fit">
                                            <img className="h-20 rounded-full" src={session.user.image}></img>
                                            <h1 className="w-full font-fredoka-medium text-base m-auto ml-10">{session.user.name}</h1>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col justify-center items-center mt-5">
                                        <div className="flex items-center justify-center">
                                            <div className="flex items-center">
                                                <GiBodyHeight size={30}/>
                                                <h1>Height:</h1>
                                            </div>
                                            <input value={height ? height : 0} type="number" className="outline-none w-20 text-right" placeholder="Enter your height" onChange={(height)=>{setHeight(height.target.value); setUpdateStatus(true)}}></input>
                                        </div>
                                        <div className="flex items-center justify-center mt-2">
                                            <div className="flex items-center">
                                                <GiWeight size={30}/>
                                                <h1>Weight:</h1>
                                            </div>
                                            <input value={weight ? weight : 0} type="number" className="outline-none w-20 text-right" placeholder="Enter your height" onChange={(weight)=>{setWeight(weight.target.value);setUpdateStatus(true)}}></input>
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
                            {/*Statistics */}
                            <div className="col-span-2 h-full lg:mt-0 mt-5"> 
                                <div className="grid grid-cols-1 grid-rows-4 bg-white rounded-lg rounded-b-lg h-full">
                                    <div className="grid row-span-4 md:grid-cols-3 md:grid-row-2 grid-row-3 grid-cols-1">
                                        {/*Diagram */}
                                        <div className="grid md:row-span-3 grid-cols-1 h-full">
                                            <div className="p-10 m-auto">
                                                <CircularProgressbarWithChildren className="m-auto" value={caloriesPercentage} styles={
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
                                                        <span className="font-fredoka-medium text-center lg:text-5xl text-4xl">{calories}</span> <span className="lg:flex hidden justify-center text-2xl text-black opacity-50">kcal</span>
                                                    </div>
                                                </CircularProgressbarWithChildren>
                                            </div>
                                        </div>
                                        {/*Macronutrients */}
                                        <div className="md:row-span-3 grid-cols-1 md:col-span-2 flex flex-col justify-around items-start">
                                            <div className="m-auto w-full px-10">
                                                <h1 className="font-fredoka-medium text-black">Protein</h1>
                                                <ProgressBar
                                                    bgColor="#13815B"
                                                    completed={(protein * 100 / (weight ? weight : 1) * 2).toFixed(2)}
                                                    customLabel={`${protein} g`}
                                                    width="100%"
                                                    baseBgColor="#C2C2C2"
                                                />
                                            </div>
                                            <div className="m-auto w-full px-10">
                                                <h1 className="font-fredoka-medium text-black">Carbohydrates</h1>
                                                <ProgressBar
                                                    bgColor="#EFEEB4"
                                                    completed={carbohydrate}
                                                    customLabel={`${carbohydrate} g`}
                                                    labelColor="#454d66"
                                                    width="100%"
                                                    baseBgColor="#C2C2C2"
                                                />
                                            </div>
                                            <div className="m-auto w-full px-10">
                                                <h1 className="font-fredoka-medium text-black">Fats</h1>
                                                <ProgressBar
                                                    bgColor="#58B368"
                                                    completed={fats}
                                                    customLabel={`${fats} g`}
                                                    width="100%"
                                                    baseBgColor="#C2C2C2"
                                                />
                                            </div>
                                        </div>
                                        {/*View calories */}
                                        <div className="row-span-1 md:col-span-4 h-fit ">
                                            <div className="flex py-10 md:justify-end justify-center md:pr-32 w-full">
                                                <a className="flex" href="/">
                                                    <div className="flex h-fit w-fit">
                                                        <AiFillEye size={30} color="#309975"/>
                                                    </div>
                                                    <h1 className="my-auto text-[#309975] font-fredoka-medium">More details</h1>
                                                </a>
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                        </div>

                         {/*Second row */}
                        <div className="lg:row-span-3 row-span-1 h-fit lg:mt-0 mt-5">
                            <div className="bg-white h-fit w-full rounded-lg">
                                <div className="flex w-full h-fit justify-between">
                                    <h1 className="my-auto ml-10 font-fredoka-medium text-[#309975] text-xl">Today's list</h1>
                                    <div className="flex bg-gradient-to-tr from-grass-green to-green h-fit w-32 align-top rounded-tr-lg ml-auto">
                                    <Popup trigger={<button className="text-center m-auto text-white font-fredoka-medium p-5" onClick={()=>{setPopUpAddFood(true)}}>Add Food</button>} modal nested>
                                        <PopUpAddFood dataSession={session}></PopUpAddFood>
                                    </Popup>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 h-full pb-10 pt-10 gap-5 text-black">
                                    {
                                        todayFood &&
                                        todayFood.map((food)=>
                                            <div key={food._id} className="flex justify-between w-auto h-fit mx-5 bg-white rounded-lg drop-shadow-lg font-fredoka-medium">
                                                <h1 className="flex items-center ml-10">{food.name}</h1>
                                                <div className="flex ">
                                                    <button onClick={ async () => { await deleteHandler();}} className="flex justify-center bg-gradient-to-tr from-grass-green to-green h-full w-20 p-5 rounded-r-lg"><AiFillDelete size={30} color="white"/></button>
                                                </div>
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
        <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-tr from-grass-green to-green">
            <img src={loadingImges[randomNumber(1,2)]} alt="Loading..." width="10%" height="10%" />
        </div>
    )
}