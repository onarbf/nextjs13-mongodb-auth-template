import { verificationEmailState } from "@/app/consts";
import { connect } from "@/helpers/dbConfig";
import User from "@/models/userModel";
import { useRouter } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        const user = await User.findOne({ verifyToken: token})
        if (!user) {
            return NextResponse.json({ error: "User not found",success: false, verificationState: verificationEmailState.WRONG_TOKEN }, { status: 400 })
        }

        if(user.verifyTokenExpiry < Date.now() ){
            return NextResponse.json({ error: "Token expired",success: false, verificationState: verificationEmailState.EXPIRED_TOKEN },  { status: 400 })
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({message: 'Email verified successfully',success: true,  verificationState: verificationEmailState.VERIFIED_TOKEN}, {status: 200});
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}