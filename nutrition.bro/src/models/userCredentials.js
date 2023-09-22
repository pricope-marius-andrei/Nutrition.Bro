import { Schema, model, models } from "mongoose";

const UserCredentialsSchema = new Schema(
    {
        first_name: String,
        last_name: String,
        email:String,
        password: String,
        height:String,
        weight:String
    }
    ,
    {
        timestamps: true
    }
)

const UserCredentials = models.UserCredentials || model("UserCredentials", UserCredentialsSchema)

export default UserCredentials