import { NextRequest, NextResponse } from "next/server";

cinst

const isAuthenticated = async (req: NextRequest) => {
    const authHeader = req.headers.get("Authorization");
    if (authHeader == null) {
        return false;
    }
    const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":");
    return username === process.env.ADMIN_USERNAME && password === await isValidPassword(password, process.env.HASHED_ADMIN_PASSWORD as string);
}   

export const middleware = async (req: NextRequest) => {
    if ((await isAuthenticated(req)) === false) {
        return new NextResponse("Unauthorized", { status: 401, headers: { "WWW-Authenticate": "Basic" } });
    }
}

export const config = {
    matcher: '/admin/:path*'
}