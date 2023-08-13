import { NextRequest, NextResponse } from "next/server";
import { connect, sendEmail } from "@/helpers";
import User from "@/models/userModel";

connect()

export async function POST(request: NextRequest){
    try {
        const {email} = await request.json()
        if(!email) return NextResponse.json({error: "introduce un email válido"},{status: 400})
        
        const user = await User.findOne({email})

        if(!user) return NextResponse.json({error: "no hay ningún usuario con ese email"},{status: 400})
        await sendEmail({email,emailType: "RECOVER", userId: user._id})

        return NextResponse.json({message: "Email enviado con éxito. Checkea tu inbox."},{status: 200})
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({error: error.message},{status: 500})
    }
}