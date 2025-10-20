import { NextRequest, NextResponse } from "next/server";
import {
  getDataByPath,
  getPath,
  READ_ERROR_MSG,
  UPDATE_SUCCESS_MSG,
  UPDATE_ERROR_MSG,
  updateByPath,
} from "@/services/apiUtils";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  try {
    const filePath = getPath(searchParams.get("name"));
    const data = getDataByPath(filePath);
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: { message: READ_ERROR_MSG } },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  try {
    const filePath = getPath(searchParams.get("name"));

    const body = await request.json();
    updateByPath(filePath, body);
    return NextResponse.json({ message: UPDATE_SUCCESS_MSG }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: { message: UPDATE_ERROR_MSG } },
      { status: 500 },
    );
  }
}
