import {AiFillEye} from 'react-icons/ai'
import {CircularProgressbarWithChildren} from 'react-circular-progressbar';
import ProgressBar from "@ramonak/react-progress-bar"

export default function Statistics(props) {
    const caloriesPercentage = props.caloriesPercentage;
    const calories = props.calories;
    const protein = props.protein;
    const weight = props.weight;
    const carbohydrates = props.carbohydrates;
    const fats = props.fats;

    return(
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
                            completed={carbohydrates}
                            customLabel={`${carbohydrates} g`}
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
    )
}