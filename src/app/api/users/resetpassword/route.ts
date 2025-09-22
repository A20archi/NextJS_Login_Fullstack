import { NextResponse,NextRequest } from "next/server";
import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connectDB();

export async function POST(req:NextRequest)
{
    try{
    const {token,password} = await req.json();

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry:{$gt:Date.now()},
    });

    if(!user)
    {
        return NextResponse.json(
            {error:"Invalid user or link expired"},{status:404});
    }

    const hashedPassword = await bcryptjs.hash(password,10);

    user.password = hashedPassword;

    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry=undefined

    await user.save();

    return NextResponse.json({message:"password changed successfully"});
}catch(error:any){
    return NextResponse.json({error:error.message},{status:500});
}
}