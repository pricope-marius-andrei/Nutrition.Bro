import connectToDB from "../../../utils/database";
import User from "../../../models/user"
import { NextResponse } from "next/server";

export async function PUT(req) {

    const {_id, name, calories} = await req.json();
    // console.log(food);
    try {
        connectToDB();
        const id = await User.findOne({email:_id}).select("_id");
        // console.log(`Id:${id}`);
        const user = await User.findByIdAndUpdate(id, {$push:{food:[{name,calories}]}});
        return NextResponse.json({ message: 'User updated successfully' }, {status:200});
    } catch (error) {
        return NextResponse.json({message: "The update is unsuccesfully"}, {status: 500})
    }
}