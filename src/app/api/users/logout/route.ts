import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/dbConfig/dbconfig";

connectToDb();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: ` Logout successfullly`,
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.messsage,
    });
  }
}
