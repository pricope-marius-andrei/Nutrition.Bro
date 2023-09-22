import { getSession } from "next-auth/react";
import connectToDB from "../../../utils/database"
import User from "@models/user";
import { NextResponse } from "next/server";
import UserCredentials from "@models/userCredentials";

export async function PUT(req) {

    // const session = await getSession({req})

    // if (!session) {
    //     return NextResponse.json({ error: 'Not authenticated' }, {status: 400})
    //   }
    
    // const session = await getSession(req.json())
    // const userId = session?.user.id
    const {_id, height, weight } = await req.json()
    // console.log(`Id:${await req.json()}`)
    try 
    {
        await connectToDB()
        console.log(`Email: ${_id}, Height: ${height}, Weight: ${weight}`)
        const id = await User.findOne({email:_id}).select("_id")
        await User.findByIdAndUpdate(id, {height, weight})
        return NextResponse.json({ message: 'User updated successfully' }, {status:200})
    } catch (error) {
        return NextResponse.json({message: "The update is unsuccesfully"}, {status: 500})
    }
}


// export {handler as POST}