// pages/api/auth/register.js
import connectToDB from '@utils/database';
import UserCredentials from '@models/userCredentials';
import { NextResponse } from 'next/server';
import bcrypt from "bcrypt"

export async function POST(req) {
    const { first_name, last_name, email, password } = await req.json();
    try {
      await connectToDB()
      const hashPassword = await bcrypt.hash(password,10)
      // console.log(hashPassword)
      await UserCredentials.create({first_name, last_name, email, password: hashPassword})
      
      return NextResponse.json({
        msg: "The account was created",
        success : true,
      }, {status:201})
    } catch (error) {
      console.log(error)
    } 
}