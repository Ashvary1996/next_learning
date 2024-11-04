import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendMail } from "@/helpers/mailer";
import { connectToDb } from "@/dbConfig/dbconfig";
const bcrypt = require("bcryptjs");

connectToDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password }: any = reqBody;
    console.log(reqBody);
    const user = await User.findOne({ email });

    if (user) {
      console.log("User already exists");

      return NextResponse.json({ error: "User already exists", status: 400 });
    }
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    await sendMail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      success: true,
      message: "User Registerd Successfully",
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
