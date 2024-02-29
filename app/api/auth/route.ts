import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  console.log(res, "000", req);
  return NextResponse.json({ mesasge: "Auth Done" }, { status: 200 });
}
