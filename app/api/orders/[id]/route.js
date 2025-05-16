// app/api/orders/[id]/route.js
export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import { connectToDatabase as connectToDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

export async function PATCH(req, context) {
  const { params } = await context;
  const { id } = params;
  const { status } = await req.json();

  await connectToDB();
  const updated = await Order.findByIdAndUpdate(
    id,
    { status, updatedAt: new Date() },
    { new: true }
  ).lean();

  // notifica real‑time
  await pusher.trigger("orders", "order-updated", updated);

  return NextResponse.json(updated);
}

export async function DELETE(req, context) {
  const { params } = await context;
  const { id } = params;

  await connectToDB();
  await Order.findByIdAndDelete(id);

  await pusher.trigger("orders", "order-deleted", id);
  return NextResponse.json({ success: true });
}
