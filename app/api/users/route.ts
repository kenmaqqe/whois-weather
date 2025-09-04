import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await fetch("https://randomuser.me/api/?results=12");
    const data = await res.json();

    const users = data.results.map((user: any) => ({
      name: `${user.name.title} ${user.name.first} ${user.name.last}`,
      gender: user.gender,
      email: user.email,
      picture: user.picture.large,
      location: user.location,
    }));

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
