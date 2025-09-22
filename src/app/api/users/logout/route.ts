import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = new NextResponse(
            JSON.stringify({
                message: "logout successful",
                success: true,
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}