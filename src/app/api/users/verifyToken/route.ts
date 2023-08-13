import { connect } from "@/helpers";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
const jwt = require('jsonwebtoken');
import { cookies } from 'next/headers'

connect()

export async function GET(request: NextRequest){
    try {
        const cookieStore = cookies()
        const token = cookieStore.get("token")?.value || '';
        if(token){
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);
            const user = await User.findById(decodedToken.id).select("-password -__v ")
            return NextResponse.json({...user, isLogged: true});
        }
        return NextResponse.json({},{status:200});
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}