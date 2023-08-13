import {NextResponse} from 'next/server';
import { cookies } from 'next/headers'

export async function GET(){
  const cookieStorage = cookies()
 try {
    const response = NextResponse.json({
        message: "Logout successful",
        success:true
    },{status: 200})

    cookieStorage.delete("token")

    return response
 } catch (error: any) {
   console.log(error.message)
   return NextResponse.json({ error: error.message }, { status: 500 })
 }
}