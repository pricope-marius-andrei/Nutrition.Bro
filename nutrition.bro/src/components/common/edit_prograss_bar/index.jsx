import ProgressBar from "@ramonak/react-progress-bar"

export default function EditProgressBar(props) {

    let totalFats = props.totalFats;
    let totalCarbo = props.totalCarbohydrates;
    let totalNutientValue = props.totalNutientValue;
    let servingSize = props.servingSize;
    let calories = props.calories;
    let theSmallestEnergy = props.smallestEnergy;
    let errorPrecentage = props.error;

    return (
        !props.editMode ? 
            <ProgressBar
                bgColor="#13815B"
                completed={(props.unit == "mg" ? totalNutientValue * 0.001 : totalNutientValue) * servingSize / (calories !== 0 ? calories / theSmallestEnergy : 0.1) + errorPrecentage}
                customLabel={`${(totalNutientValue * servingSize / 100).toFixed(2)}${props.unit}`}
                labelSize={props.labelSize}
                width={props.width}
                baseBgColor="#C2C2C2"
            />
            :
            <input type="number" min={0} className="py-1 px-2 w-auto font-fredoka-regular text-black text-md animate-pulse focus:animate-none focus:border-dark-grass focus:rounded-lg focus:border-2 outline-none" 
                onChange={
                    (currentTotalNutrient)=>
                    { 
                        let lastTotalNutrient = totalNutientValue;
                        props.setNutritionalValue(currentTotalNutrient.target.value);
                        props.setTotalFats && props.setTotalFats(parseFloat(totalFats) + (currentTotalNutrient.target.value - lastTotalNutrient));
                        props.setTotalCarbohydrates && props.setTotalCarbohydrates(parseFloat(totalCarbo) + (currentTotalNutrient.target.value - lastTotalNutrient));
                        props.setCalories(calories + props.nutritionalParameter * (currentTotalNutrient.target.value - lastTotalNutrient))
                    }
                }
                value={totalNutientValue}>
            </input>
    )
}