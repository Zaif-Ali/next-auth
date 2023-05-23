import { NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';


export async function middleware(request: NextRequest) {
    try {
        const ACCESS_DENIED = new URL('/access-denied', request.url);
        const token: any = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });
        // if the token was not present OR if the user was not admin then we redirect to the 404 page  operation otherwise we next();
        if (token == null || token.role !== 'admin') {
            return NextResponse.rewrite(ACCESS_DENIED);
        }
        return NextResponse.next();
    } catch (error) {
        console.error('Error in middleware:', error);
        return NextResponse.error();
    }

}

export const config = {
    matcher: ["/admin/:path*"],
};
