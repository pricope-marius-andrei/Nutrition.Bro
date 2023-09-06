// pages/api/auth/register.js
import connectToDB from '@utils/database';
import UserCredentials from '../../../models/userCredentials';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function POST(req) {
    const { first_name, last_name, email, password } = req.json;
    try {
      await connectToDB()
      await UserCredentials.create({first_name, last_name, email, password})
      
      return NextResponse.json({
        msg: "The account was created",
        success : true,
      })
    } catch (error) {
      if(error instanceof mongoose.Error.ValidationError) {
        let errorList = []
        for(let e in error.errors)
        {
          errorList.push(e.message);
        }
      }
    } 
}