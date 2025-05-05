import { connectToDatabase } from "@/lib/mongodb";
import MenuItem from "@/models/MenuItem";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const time = searchParams.get("time");
    const category = searchParams.get("category");

    const query = {};
    if (time) query.time = time;
    if (category) query.category = category;

    const menuItems = await MenuItem.find(query);
    return NextResponse.json(menuItems);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();

    const newMenuItem = new MenuItem(data);
    await newMenuItem.save();

    return NextResponse.json(newMenuItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
