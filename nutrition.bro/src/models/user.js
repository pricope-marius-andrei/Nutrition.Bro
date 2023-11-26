import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: [true, "Email is already exists!"],
            required: [true, "Email is required!"],
        },
        username: {
            type: String,
            required: [true, 'Username is required!'],
            match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
        },
        image: {
            type: String,
        },
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
                    // required: [true, 'Name of food is required!']
                },
                calories: 
                {
                    type: Number,
                    // required: [true, 'Calories is required']
                },
                serving_size: 
                {
                    type: Number,
                    // required: [true, 'Serving_size is required']
                },
                protein: 
                {
                    type: Number,
                    // required: [true, 'Protein is required']
                },
                carbohydrates: 
                {
                    type: Number,
                    // required: [true, 'Carbohydrated is required']
                },
                sugar: 
                {
                    type: Number,
                    // required: [true, 'Sugar is required']
                },
                total_fats: 
                {
                    type: Number,
                    // required: [true, 'Total fats is required']
                },
                saturated_fats: 
                {
                    type: Number,
                    // required: [true, 'Saturated fats is required']
                },
                potassium: 
                {
                    type: Number,
                    // required: [true, 'Postassium is required']
                },
                sodium: 
                {
                    type: Number,
                    // required: [true, 'Sodium is required']
                },
                fiber: 
                {
                    type: Number,
                    // required: [true, 'Fiber is required']
                },
                cholesterol: 
                {
                    type: Number,
                    // required: [true, 'Cholesterol is required']
                }
            }
        ],
    }
);

const User = models.User || model("User", UserSchema) //if the User model exist in the models
//return that model else create a new model with the model() method

export default User 