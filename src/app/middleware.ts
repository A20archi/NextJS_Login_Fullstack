//this is just for future reference when there will bve JWT-Token and cookie based logout feature instead of LocalStorage

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//The below function can be marked async if using the await keyoword inside

export function middleware(request:NextRequest){
   const path =  request.nextUrl.pathname
   const isPublicPath = path==='/login'|| path==='/signup'||path==="/verifyemail"
   const token = request.cookies.get("token")?.value || ''

   if(isPublicPath && token){
        return NextResponse.redirect(new URL('/',request.nextUrl))
   }

   if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login',request.nextUrl))
   }

   return NextResponse.next();
}

//see "Matching paths" below to learn more

export const config = {
    matcher:[
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail'
    ]
}