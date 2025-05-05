// scripts/seed.js

import { connectToDatabase } from "../lib/mongodb.js";
import MenuItem from "../models/MenuItem.js";

const menuData = {
  giorno: {
    cocktail: [
      {
        name: "Aperol spritz",
        description: "Aperol, prosecco, soda",
        price: 7,
        gradazione: "11°",
        colore: "Arancione",
        aroma: "Agrumato, amaro",
      },
      {
        name: "Campari spritz",
        description: "Campari, prosecco, soda",
        price: 7,
        gradazione: "11°",
        colore: "Rosso",
        aroma: "Amaro, erbe",
      },
      {
        name: "Hugò spritz",
        description: "Sciroppo di sambuco, prosecco, menta, lime",
        price: 7,
      },
      {
        name: "Limoncello spritz",
        description: "Limoncello, prosecco, soda",
        price: 7,
      },
      { name: "Bellini", description: "Prosecco, purea di pesca", price: 7 },
    ],
    "vino-e-spumanti": [
      {
        name: "Ravello",
        description: "E. Sammarco",
        price: 25,
        provenienza: "Campania",
        tipologia: "Bianco DOC",
        gradazione: "13°",
        colore: "Giallo paglierino",
        aroma: "Fruttato, note floreali",
      },
      {
        name: "B -------- R --------- Rosato",
        description: "",
        price: 22,
        provenienza: "Puglia",
        tipologia: "Rosato IGT",
        gradazione: "12.5°",
        colore: "Rosa tenue",
        aroma: "Frutti rossi, fresco",
      },
      {
        name: "PROSECCO",
        description: "",
        price: 20,
        provenienza: "Veneto",
        tipologia: "Spumante DOC",
        gradazione: "11°",
        colore: "Giallo paglierino",
        aroma: "Fresco, note di mela",
      },
    ],
    birre: [
      {
        name: "Peroni",
        description: "",
        price: 4,
        provenienza: "Italia",
        tipologia: "Lager",
        gradazione: "4.7°",
        colore: "Chiara",
        aroma: "Leggero, maltato",
        metodo: "Bassa fermentazione",
      },
      {
        name: "Nastro Azzurro",
        description: "",
        price: 4,
        provenienza: "Italia",
        tipologia: "Lager Premium",
        gradazione: "5.1°",
        colore: "Chiara",
        aroma: "Fresco, cereali",
        metodo: "Bassa fermentazione",
      },
      {
        name: "Nastro Azzurro Capri",
        description: "",
        price: 5,
        provenienza: "Italia",
        tipologia: "Lager Speciale",
        gradazione: "5.0°",
        colore: "Chiara",
        aroma: "Note di limone",
        metodo: "Bassa fermentazione",
      },
      {
        name: "Nastro Azzurro 0",
        description: "Analcolica",
        price: 4,
        provenienza: "Italia",
        tipologia: "Lager Analcolica",
        gradazione: "0.0°",
        colore: "Chiara",
        aroma: "Leggero, maltato",
        metodo: "Bassa fermentazione",
      },
      {
        name: "Corsendonk Rousse",
        description: "",
        price: 5,
        provenienza: "Belgio",
        tipologia: "Abbazia",
        gradazione: "8°",
        colore: "Ambrata",
        aroma: "Dolce e speziato",
        metodo: "Alta fermentazione",
      },
    ],
    bibite: [
      { name: "Coca-cola", description: "", price: 3 },
      { name: "Coca-cola 0", description: "", price: 3 },
      { name: "Fanta", description: "", price: 3 },
      { name: "Thè pesca", description: "", price: 3 },
      { name: "Thè limone", description: "", price: 3 },
      { name: "Lemon soda", description: "", price: 3 },
      { name: "Succhi di frutta", description: "", price: 3.5 },
      { name: "Acqua tonica", description: "", price: 3 },
    ],
    caffetteria: [
      { name: "Espresso", description: "", price: 1.5 },
      { name: "Espresso macchiato", description: "", price: 1.5 },
      { name: "Americano", description: "", price: 2 },
      { name: "Decaffeinato", description: "", price: 1.5 },
      { name: "Cappuccino", description: "", price: 2 },
      { name: "Latte macchiato", description: "", price: 2 },
      { name: "Latte", description: "", price: 1.5 },
      { name: "Thè", description: "", price: 2.5 },
      { name: "Tisane", description: "", price: 3 },
      { name: "Camomilla", description: "", price: 2.5 },
    ],
    food: [
      {
        name: "Pinse",
        description: "",
        items: [
          {
            name: "Italia",
            description:
              "Pomodori semi dry, mozzarella, pesto al basilico vegan",
            price: 10,
          },
          {
            name: "Marinara",
            description:
              "Pomodori semi dry, mozzarella, filetti di alici di Cetara",
            price: 12,
          },
          {
            name: "Golosa",
            description: "Mortadella, mozzarella, pistacchi",
            price: 11,
          },
          {
            name: "Vegetariana",
            description: "Pesto al basilico vegan, rucola, filetti di zucchine",
            price: 10,
          },
        ],
      },
      {
        name: "Toast",
        description: "",
        items: [
          { name: "N1", description: "Cotto e sottiletta", price: 5 },
          { name: "N2", description: "Crudo e sottiletta", price: 5.5 },
          { name: "N3", description: "Salame e sottiletta", price: 5 },
          { name: "N4", description: "Mortadella", price: 5 },
        ],
      },
      {
        name: "Fritti",
        description: "",
        items: [
          { name: "Patatine", description: "", price: 4 },
          { name: "Alghe", description: "", price: 5 },
          { name: "Misto", description: "", price: 7 },
        ],
      },
    ],
  },
  sera: {
    cocktail: [
      {
        name: "Aperol spritz",
        description: "Aperol, prosecco, soda",
        price: 8,
      },
      {
        name: "Campari spritz",
        description: "Campari, prosecco, soda",
        price: 8,
      },
      {
        name: "Hugò spritz",
        description: "Sciroppo di sambuco, prosecco, menta, lime",
        price: 8,
      },
      {
        name: "Limoncello spritz",
        description: "Limoncello, prosecco, soda",
        price: 8,
      },
      { name: "Bellini", description: "Prosecco, purea di pesca", price: 8 },
      {
        name: "Negroni",
        description: "Gin, vermouth rosso, Campari",
        price: 9,
      },
      {
        name: "Negroni sbagliato",
        description: "Prosecco, vermouth rosso, Campari",
        price: 9,
      },
      {
        name: "Americano",
        description: "Campari, vermouth rosso, soda",
        price: 8,
      },
      { name: "Gin tonic", description: "", price: 9 },
      { name: "Gin lemon", description: "", price: 9 },
    ],
    "vino-e-spumanti": [
      {
        name: "Ravello",
        description: "E. Sammarco",
        price: 25,
        provenienza: "Campania",
        tipologia: "Rosso",
      },
      {
        name: "B -------- R --------- Rosato",
        description: "",
        price: 22,
        provenienza: "Campania",
        tipologia: "Rosato",
      },
      {
        name: "PROSECCO",
        description: "",
        price: 20,
        provenienza: "Veneto",
        tipologia: "Spumante",
        gradazione: "11%",
      },
    ],
    food: [
      {
        name: "Pinse",
        description: "",
        items: [
          {
            name: "Italia",
            description:
              "Pomodori semi dry, mozzarella, pesto al basilico vegan",
            price: 10,
          },
          {
            name: "Marinara",
            description:
              "Pomodori semi dry, mozzarella, filetti di alici di Cetara",
            price: 12,
          },
          {
            name: "Golosa",
            description: "Mortadella, mozzarella, pistacchi",
            price: 11,
          },
          {
            name: "Vegetariana",
            description: "Pesto al basilico vegan, rucola, filetti di zucchine",
            price: 10,
          },
        ],
      },
      {
        name: "Taglieri",
        description: "",
        items: [
          {
            name: "Gran tagliere X2",
            description: "Mortadella, crudo, provolone, formaggi",
            price: 18,
          },
          {
            name: "Tagliere vegetariano",
            description: "Provolone, formaggio, noci, zucchine",
            price: 15,
          },
        ],
      },
      {
        name: "Fritti",
        description: "",
        items: [
          { name: "Patatine", description: "", price: 4 },
          { name: "Alghe", description: "", price: 5 },
        ],
      },
    ],
  },
};

async function seed() {
  await connectToDatabase();
  // 1) Svuota la collezione
  await MenuItem.deleteMany({});

  // 2) Costruisci i documenti
  const docs = [];
  for (const time of ["giorno", "sera"]) {
    const cats = menuData[time];
    for (const category in cats) {
      docs.push({
        time,
        category,
        items: cats[category],
      });
    }
  }

  // 3) Inserisci tutti i documenti
  await MenuItem.insertMany(docs);

  console.log("✅ Seed completato con successo!");
  process.exit();
}

seed().catch((err) => {
  console.error("Errore durante il seeding:", err);
  process.exit(1);
});
