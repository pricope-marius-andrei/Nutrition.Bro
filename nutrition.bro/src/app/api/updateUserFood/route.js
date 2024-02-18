import connectToDB from "../../../utils/database";
import User from "../../../models/user"
import { NextResponse } from "next/server";

export async function PUT(req) {

    const {
        _id,
        date_added,
        name,
        calories,
        serving_size,
        protein,
        carbohydrates,
        sugar,
        total_fats,
        saturated_fats,
        potassium,
        sodium,
        fiber,
        cholesterol} = await req.json();

        try {
        connectToDB();
        const id = await User.findOne({email:_id}).select("_id");
        // console.log(`Id:${id}`);
        console.log(date_added);
        const user = await User.findByIdAndUpdate(id, {$push:{food:[{
            name,
            date_added,
            calories,
            serving_size,
            protein,
            carbohydrates,
            sugar,
            total_fats,
            saturated_fats,
            potassium,
            sodium,
            fiber,
            cholesterol
        }]}});
        return NextResponse.json({ message: 'User updated successfully' }, {status:200});
    } catch (error) {
        return NextResponse.json({message: "The update is unsuccesfully"}, {status: 500})
    }
}