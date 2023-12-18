import connectToDB from "../../../utils/database"
import User from "@models/user";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    const {id_user} = await req.json()
    console.log(id_user);
    try 
    {
        await connectToDB()
        const user = await User.find({email:id_user});
        // console.log(user);
        return NextResponse.json({ message: 'Item deleted successfully' }, {status:200})
    } catch (error) {
        return NextResponse.json({message: "The update is unsuccesfully"}, {status: 500})
    }
}