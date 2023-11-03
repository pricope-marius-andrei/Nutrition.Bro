import connectToDB from "../../../utils/database";
import UserCredentials from "../../../models/userCredentials"
import { NextResponse } from "next/server";

export async function PUT(req) {

    const {
        _id,
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
        const id = await UserCredentials.findOne({email:_id}).select("_id");
        const user = await UserCredentials.findByIdAndUpdate(id, {$push:{food:[{
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
            cholesterol
        }]}});
        return NextResponse.json({ message: 'User updated successfully' }, {status:200});
    } catch (error) {
        return NextResponse.json({message: "The update is unsuccesfully"}, {status: 500})
    }
}