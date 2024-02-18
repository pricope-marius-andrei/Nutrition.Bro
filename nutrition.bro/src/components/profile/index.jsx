'use client'
import {useSession} from "next-auth/react"
import Menu from "./menu"
import GoalSection from "./goal-section"
import AccountDetails from "./account-details"
import Statistics from "./statistics"
import ListOfFoods from "./list-foods"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import 'react-circular-progressbar/dist/styles.css';
import 'reactjs-popup/dist/index.css';
import useSWR from "swr"
import randomNumber from "../../utils/random"

const fetcher = (url) => fetch(url).then((res)=>res.json());

let loadingImges = {
    "1": "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Person%20Bouncing%20Ball%20Light%20Skin%20Tone.png",
    "2": "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Man%20Running%20Light%20Skin%20Tone.png"
}



export default function ProfileComponent()
{
    const [startDate, setStartDate] = useState(new Date());
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
    const [carbohydrates, setCarb] = useState(0);
    const [fats, setFats] = useState(0);

    const email = session?.user.email

    useEffect(() => {
        setHeight(heightDb);
        setWeight(weightDb);
        const listOfFoods = todayFood?.filter((food) => new Date(food.date_added).getDate() == startDate.getDate()) 
        setFood(listOfFoods);
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

    const deleteHandler = async (food_id) => {
        try {
            const response = await fetch("/api/deleteFood", {
                method: 'DELETE',
                body: JSON.stringify({id_user:email, food_id: food_id}),
                headers: {
                'Content-Type': 'application/json',
                },
            })

            console.log(response);
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
        if( food )
        {
            let totalCalories = 0.0;
            let totalProtein = 0.0;
            let totalcarbohydrate = 0.0;
            let totalFats = 0.0;
            food.map((item)=> {
                totalCalories += item.calories;
                totalProtein += item.protein;
                totalcarbohydrate += item.carbohydrates;
                totalFats += item.total_fats;
            });
            
            setCalories(totalCalories.toFixed(2));
            setProtein(totalProtein.toFixed(2));
            setCarb(totalcarbohydrate.toFixed(2));
            setFats(totalFats.toFixed(2));
            setCaloriesPercentage(calories * 100 / 2000);
        } 
    })

    if(status === "authenticated") {

        return( 
            <div className="bg-[#EAEAEA] h-full w-full flex heropattern-ilikefood-green-lime/10">
                <Menu />

                <div className="m-5 w-full">
                    <GoalSection goalPercentage={goalPercentage}/>
                    {/*Dashboard*/}
                    <div className="grid lg:grid-rows-1 grid-rows-2 gap-5 mt-5"> 
                    {/* O coloana cu Doua randuri / rep(O coloana cu Trei Randuri) */}
                        {/*First row */}
                        <div className="grid lg:grid-cols-3 lg:row-span-1 grid-cols-1 row-span-3 lg:gap-5"> 
                            {/*Left section */}
                            <AccountDetails 
                                weight={weight}
                                height={height}
                                setHeight={setHeight}
                                setWeight={setWeight}
                                updateStatus={updateStatus}
                                setUpdateStatus={setUpdateStatus}
                                handleUpdateUser={handleUpdateUser}
                                image={session?.user.image}
                                name={session?.user.name}
                            />

                            <div className="col-span-2 h-full lg:mt-0 mt-5"> 
                                <Statistics 
                                    caloriesPercentage={caloriesPercentage}
                                    calories={calories}
                                    protein={protein}
                                    carbohydrates={carbohydrates}
                                    fats={fats}
                                    weight={weight}
                                />
                            </div>
                        </div>

                         {/*Second row */}
                        <div className="lg:row-span-3 row-span-1 h-fit lg:mt-0 mt-5">
                              <ListOfFoods
                                session={session}
                                setPopUpAddFood={setPopUpAddFood}
                                todayFood={food}
                                deleteHandler={deleteHandler}
                                setStartDate={setStartDate}
                                startDate={startDate}
                              />
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