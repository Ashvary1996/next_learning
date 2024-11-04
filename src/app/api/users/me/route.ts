import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectToDb } from "@/dbConfig/dbconfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectToDb();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    console.log(userId, user);

    return NextResponse.json({
      message: "User Found",
      data: user,
    });


  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
