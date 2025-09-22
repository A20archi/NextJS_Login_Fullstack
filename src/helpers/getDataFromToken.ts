import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"
export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value;
        if (!token) {
            throw new Error("Token not found");
        }
        const secret = process.env.TOKEN_SECRET;
        if (!secret) {
            throw new Error("TOKEN_SECRET environment variable not set");
        }
        const decodedToken = jwt.verify(token, secret);
        return decodedToken;
    } catch (error: any) {
        throw new Error(error?.message || "An error occurred while verifying token");
    }
}

