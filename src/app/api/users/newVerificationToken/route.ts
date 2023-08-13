import { connect } from "@/helpers/dbConfig";
import { sendEmail } from "@/helpers";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function POST(request: NextRequest){
    
    try {
        const {token} = await request.json()
        const user = await User.findOne({verifyToken: token})
        const emailSent = await sendEmail({email: user.email,emailType:"VERIFY",userId: user._id})

        return NextResponse.json({message: "Email with new token sent", success: true}, {status: 200})
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}