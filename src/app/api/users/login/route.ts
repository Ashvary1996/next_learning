import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectToDb } from "@/dbConfig/dbconfig";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectToDb();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();

    const { email, password } = reqbody;
    console.log(reqbody);

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not Found",
        },
        { status: 400 }
      );
    }

    console.log("user Found", user);

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      return NextResponse.json(
        {
          message: `Check Credentials`,
        },
        {
          status: 400,
        }
      );
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: `${user.username} Log in successfullly`,
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
    });
  }
}
