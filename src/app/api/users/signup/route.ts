import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password, number} = reqBody

        console.log(reqBody);

        // check if user already exists.
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "User Already Exists"}, {status: 400})
        }

        // hash Password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            number,
            password: hashedPassword,
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        return NextResponse.json({
            message: "User Created Successfully !!",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}