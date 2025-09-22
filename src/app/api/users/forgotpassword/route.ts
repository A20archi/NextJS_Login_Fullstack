import { NextResponse,NextRequest } from "next/server";
import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connectDB();

export async function POST(request:NextRequest){
    try{
        const {email} = await request.json();

        const user = await User.findOne({email});
        if(!user)
        {
            return NextResponse.json({error:"User not found"},{status:404});
        }

        //sending reset email if user found

        await sendEmail({email,emailType:"RESET",userID:user._id})

        return NextResponse.json({message:"Reset email sent successfully"})

    }catch(error:any){
       return NextResponse.json({error:error.message},{status:500}); 
    }
}