import { Schema, model, models } from "mongoose";

const UserCredentialsSchema = new Schema(
    {
        first_name: String,
        last_name: String,
        email:String,
        password: String,
        measurements : {
            height: {
                type: Number
            },
            weight: {
                type: Number
            },
        },
        food: [
            {
                name: 
                { 
                    type: String,
                    required: [true, 'Name of food is required!']
                },
                calories: 
                {
                    type: Number,
                    required: [true, 'Calories is required']
                },
                serving_size: 
                {
                    type: Number,
                    required: [true, 'Serving_size is required']
                },
                protein: 
                {
                    type: Number,
                    required: [true, 'Protein is required']
                },
                carbohydrates: 
                {
                    type: Number,
                    required: [true, 'Carbohydrated is required']
                },
                sugar: 
                {
                    type: Number,
                    required: [true, 'Sugar is required']
                },
                total_fats: 
                {
                    type: Number,
                    required: [true, 'Total fats is required']
                },
                saturated_fats: 
                {
                    type: Number,
                    required: [true, 'Saturated fats is required']
                },
                potassium: 
                {
                    type: Number,
                    required: [true, 'Postassium is required']
                },
                sodium: 
                {
                    type: Number,
                    required: [true, 'Sodium is required']
                },
                fiber: 
                {
                    type: Number,
                    required: [true, 'Fiber is required']
                },
                cholesterol: 
                {
                    type: Number,
                    required: [true, 'Cholesterol is required']
                }
            }
        ],
        caloriesGoal : {
            type: Number
        }
    }
    ,
    {
        timestamps: true
    }
)

const UserCredentials = models.UserCredentials || model("UserCredentials", UserCredentialsSchema)

export default UserCredentials