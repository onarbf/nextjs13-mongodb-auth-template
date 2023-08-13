import { connect } from '@/helpers/dbConfig'
import User from '@/models/userModel'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
var bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
connect()

export async function POST(request: NextRequest) {
    const cookieStorage = cookies()
    try {
        const {email, password, isVerified} = await request.json()
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "Ese usuario no existe"},{status: 400})
        }
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Ese password es invalido"},{status: 400})
        }

        if(!user.isVerified){
            return NextResponse.json({error: "Tu email no está verificado. Revisa tu email"},{status: 400})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})
        const response = NextResponse.json({
            message: "Login successful",
            success: true
        })
        cookieStorage.set("token",token,{httpOnly: true})
        return response;
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

