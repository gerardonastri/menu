import { connectToDatabase } from "@/lib/mongodb";
import MenuItem from "@/models/MenuItem";

export async function GET() {
  await connectToDatabase();
  const data = await MenuItem.find();
  return Response.json(data);
}

export async function POST(req) {
  await connectToDatabase();
  const body = await req.json();

  try {
    const item = await MenuItem.create(body);
    return Response.json(item, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}
