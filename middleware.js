import { NextRequest, NextResponse } from 'next/server';
import jwt from "jsonwebtoken"
// If the incoming request has the "beta" cookie
// then we'll rewrite the request to /beta
export function middleware(req) {

    if(req.nextUrl.pathname.startsWith('/')) {
      const token = req.cookies.get('token')
      if(token) {
        jwt.verify(token,process.env.JWT_SECRET,(err,decodeToken)=>{
          if (err) return NextResponse.next();
          else {
            console.log(decodeToken);
          }
        })
      }
      else {
        return NextResponse.next();
      }
    }
    if(req.nextUrl.pathname.startsWith('/onauth')) {
      const token = req.cookies.get('token')
      const url = req.nextUrl.clone()
      url.pathname = '/signin'
      if(token) {
        jwt.verify(token,process.env.JWT_SECRET,(err,decodeToken)=>{
          if (err) return NextResponse.redirect(url);
          else return NextResponse.next()
        })
      }
      else {
        return NextResponse.redirect(url);
      }
    }
}
