import connectToDB from "../../../utils/database"
import User from "@models/user";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    try 
    {
        const {id_user, food_id} = await req.json()
        await connectToDB()
        
        const user = await User.find({email:id_user});
        const newFoodList = user[0].food.filter(food => 
            food_id != food._id 
        )

        await User.updateOne(
            {email:id_user},
            {food: newFoodList}
        );
        return NextResponse.json({ message: 'Item deleted successfully' }, {status:200})
    } catch (error) {
        return NextResponse.json({message: "The update is unsuccesfully"}, {status: 500})
    }
}