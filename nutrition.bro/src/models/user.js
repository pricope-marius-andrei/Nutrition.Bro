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
        height: {
            type: String
        },
        weight: {
            type: String
        }
    }
    
);

const User = models.User || model("User", UserSchema) //if the User model exist in the models
//return that model else create a new model with the model() method

export default User 