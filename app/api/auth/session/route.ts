import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();

  const uid = cookieStore.get("user_uid")?.value || null;
  const token = cookieStore.get("user_token")?.value || null;

  if (!uid || !token) {
    return NextResponse.json({
      authenticated: false,
      uid: null,
      token: null,
    });
  }

  return NextResponse.json({
    authenticated: true,
    uid,
    token,
  });
}
