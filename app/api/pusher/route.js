import { NextResponse } from "next/server"
import Pusher from "pusher"

// Configurazione di Pusher
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || "",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || "",
  secret: process.env.PUSHER_SECRET || "",
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "",
  useTLS: true,
})

// Esempio di endpoint per inviare un nuovo ordine
export async function POST(request) {
  try {
    const body = await request.json()

    // Validazione dei dati
    if (!body.event || !body.data) {
      return NextResponse.json({ error: "Dati mancanti" }, { status: 400 })
    }

    // Invia l'evento a Pusher
    await pusher.trigger("orders", body.event, body.data)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Errore nell'invio dell'evento Pusher:", error)
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 })
  }
}
