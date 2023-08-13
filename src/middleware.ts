import { NextRequest, NextResponse } from "next/server"



export function middleware(request: NextRequest){
    const path = request.nextUrl.pathname
    const isPublicPath = (
    path === '/user/login'
    || path === '/user/signup'
    || path === '/'
    || path === '/user/verifyEmail'
    || path === '/user/recoverPassword/one'
    || path === '/user/recoverPassword/two'
    )

    const token = request.cookies.get('token')?.value || ''
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/user/login', request.nextUrl))
    }
}

export const config ={
    matcher: [
        '/profile/:path*',
        '/user/login',
        '/user/signup',
        '/user/verifyEmail',
        '/user/recoverPassword/:path*'
    ]
}