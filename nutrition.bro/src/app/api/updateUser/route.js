import connectToDB from "../../../utils/database"
import User from "@models/user";
import { NextResponse } from "next/server";

export async function PUT(req) {

    const {_id, height, weight } = await req.json()
    try 
    {
        await connectToDB()
        const id = await User.findOne({email:_id}).select("_id")
        const user = await User.findByIdAndUpdate(id, {measurements:{height, weight}})
        return NextResponse.json({ message: 'User updated successfully' }, {status:200})
    } catch (error) {
        return NextResponse.json({message: "The update is unsuccesfully"}, {status: 500})
    }
}


// export {handler as POST}