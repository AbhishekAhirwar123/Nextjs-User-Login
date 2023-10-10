import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest){
    try {
        
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);

        // Check User Exists or Not.
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User Does Not Exists."},
            {status: 400},)
            
        }

        // Check If Password is Correct.
        const validPassword = await bcryptjs.compare
        (password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid Password!!!"},
            {status: 400})
        }

        // Create A Token Data.
        const tokendata = {
            id : user._id,
            username : user.username,
            email: user.email
        }

        // Create Token.
        const token = await jwt.sign(tokendata, process.
        env.TOKEN_SECRET!, {expiresIn : "1d"})

        const response = NextResponse.json({
            message : "Login Successfully",
            success : true,
        })
        response.cookies.set("token", token, {
            httpOnly : true,
        })

        return response;


    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}