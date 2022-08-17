import { NextRequest, NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';
// If the incoming request has the "beta" cookie
// then we'll rewrite the request to /beta
export function middleware(req) {

  if (req.nextUrl.pathname.startsWith('/onauth')) {
    const token = req.cookies.get('token')
    const url = req.nextUrl.clone()
    url.pathname = '/signin'
    if (token) {
      const bytes  = CryptoJS.AES.decrypt(token, process.env.JWT_SECRET);
      const plain = bytes.toString(CryptoJS.enc.Utf8);
      const user_id = localStorage.getItem('user_id')
      if (plain === user_id) return NextResponse.next()
      else return NextResponse.redirect(url)
    }
    else return NextResponse.redirect(url)
  }
  // if (!req.nextUrl.pathname.startsWith('/onauth')) {
  //   const token = req.cookies.get('token')
  //   if (token) {
  //     return NextResponse.next();
  //   }
  //   else {
  //     return NextResponse.next();
  //   }
  // }

}
