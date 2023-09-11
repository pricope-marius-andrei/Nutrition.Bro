import connectToDB from '@utils/database';
import UserCredentials from '@models/userCredentials';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
      const { email } = await req.json();
      await connectToDB()
      const user = await UserCredentials.findOne({email}).select("_id")
      return NextResponse.json({user})
    } catch (error) {
      console.log(error)
    } 
}