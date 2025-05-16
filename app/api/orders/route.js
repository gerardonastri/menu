import { NextResponse } from "next/server";
import { connectToDatabase as connectToDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Pusher from "pusher";

// Configurazione di Pusher
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || "",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || "",
  secret: process.env.PUSHER_SECRET || "",
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "",
  useTLS: true,
});
export async function GET() {
  await connectToDB()
  const orders = await Order.find()
  .sort({ createdAt: -1 })
  .lean()
  return NextResponse.json(orders)
}

export async function POST(req) {
  try {
    const { item, quantity, tableNumber } = await req.json();

    if (!item || !quantity || !tableNumber) {
      return NextResponse.json({ error: "Dati mancanti" }, { status: 400 });
    }

    await connectToDB();

    // Crea nuovo ordine nel DB
    const newOrder = await Order.create({
      item,
      quantity,
      tableNumber,
      status: "in attesa",
    });

    // Invia evento in tempo reale a Pusher
    await pusher.trigger("orders", "new-order", {
      _id: newOrder._id,
      item,
      quantity,
      tableNumber,
      status: newOrder.status,
      createdAt: newOrder.createdAt,
    });

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    console.error("Errore creazione ordine:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}
