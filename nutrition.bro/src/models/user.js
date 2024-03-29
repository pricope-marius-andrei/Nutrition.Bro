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
                    required: false
                },
                date_added: 
                {
                    type: Date,
                    required: true
                },
                calories: 
                {
                    type: Number,
                    required: false
                },
                serving_size: 
                {
                    type: Number,
                    required: false
                },
                protein: 
                {
                    type: Number,
                    required: false
                },
                carbohydrates: 
                {
                    type: Number,
                    required: false
                },
                sugar: 
                {
                    type: Number,
                    required: false
                },
                total_fats: 
                {
                    type: Number,
                    required: false
                },
                saturated_fats: 
                {
                    type: Number,
                    required: false
                },
                potassium: 
                {
                    type: Number,
                    required: false
                },
                sodium: 
                {
                    type: Number,
                    required: false
                },
                fiber: 
                {
                    type: Number,
                    required: false
                },
                cholesterol: 
                {
                    type: Number,
                    required: false
                }
            }
        ],
    }
);

const User = models.User || model("User", UserSchema) //if the User model exist in the models
//return that model else create a new model with the model() method

export default User 