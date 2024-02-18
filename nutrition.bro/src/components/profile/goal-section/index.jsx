import ProgressProvider from "../../common/progress_provider";
import {AiFillEdit} from "react-icons/ai"
import {CircularProgressbar} from "react-circular-progressbar"


export default function GoalSection(props) {
return(
    <div className="flex h-fit w-full">
        <div className="flex rounded-s-lg px-10 py-4 w-full bg-gradient-to-tr to-green from-grass-green">
            <div className="flex">
                <div className="h-fit w-20 mr-5">
                    <ProgressProvider valueStart={0} valueEnd={props.goalPercentage}>
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
    </div>)
}