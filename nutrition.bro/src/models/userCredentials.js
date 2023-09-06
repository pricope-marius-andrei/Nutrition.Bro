import { Schema, model, models } from "mongoose";

const UserCredentialsSchema = new Schema(
    {
        first_name: {
            type: String,
            unique: false,
            required: [true, "First name is required"]
        },
        last_name: {
            type: String,
            unique: false,
            required: [true, "Last name is required"]
        },
        email:{
            type: String,
            unique: [true, "Email is already exists!"],
            required: [true, "Email is required!"],
        },
        password: {
            type: String,
            validate: {
                validator: function (value) {
                  // Check for at least 10 characters, lowercase, uppercase, and symbol
                  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(value);
                },
                message: 'Password must be at least 10 characters and contain lowercase, uppercase, and a symbol.',
            },
            required: [true, "Email is required!"],
        }
    }
)

const UserCredentials = models.UserCredentials || model("UserCredentials", UserCredentialsSchema)

export default UserCredentials