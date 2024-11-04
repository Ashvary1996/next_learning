import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectToDb } from "@/dbConfig/dbconfig";

connectToDb();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { token } = reqbody;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid Token",
        },
        { status: 400 }
      );
    }

    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "email verified successfullly",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.messsage,
    });
  }
}
