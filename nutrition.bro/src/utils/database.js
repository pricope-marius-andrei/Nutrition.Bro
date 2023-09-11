import mongoose from "mongoose";

let isConnected = false;

const connectToDB = async () => {

    // mongoose.set('strictQuery',true);

    if(isConnected)
    {
        console.log("Mongo DB is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,
        //      {
        //     dbName: "nutrition_bro_users",
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // }
        )

        isConnected = true;
    } catch (error) {
        console.log(error)        
    }
}

export default connectToDB