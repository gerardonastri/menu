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

    // Recupera gli elementi del menu con i filtri applicati
    const menuItems = await MenuItem.find(query);

    // Ordine personalizzato delle categorie
    const categoryOrder = {
      bibite: 1, // Drink
      birre: 2, // Drink
      food: 3, // Food
      caffetteria: 4, // Caffetteria
      cocktail: 5, // Cocktail
      altro: 6, // Altro
      "vino-e-spumanti": 7, // Vino e spumanti (disponibile a breve)
    };

    // Ordina gli elementi per categoria secondo l'ordine personalizzato
    menuItems.sort((a, b) => {
      const orderA = categoryOrder[a.category] || 999;
      const orderB = categoryOrder[b.category] || 999;
      return orderA - orderB;
    });

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
