"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sun, Moon, MenuIcon } from "lucide-react";

export default function Menu() {
  const [menuType, setMenuType] = useState("giorno"); // "giorno" o "sera"
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuData = {
    giorno: {
      cocktail: [
        {
          name: "Aperol spritz",
          description: "Aperol, prosecco, soda",
          price: 7,
        },
        {
          name: "Campari spritz",
          description: "Campari, prosecco, soda",
          price: 7,
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
        { name: "Ravello", description: "E. Sammarco", price: 25 },
        { name: "B -------- R --------- Rosato", description: "", price: 22 },
        { name: "PROSECCO", description: "", price: 20 },
      ],
      birre: [
        { name: "Peroni", description: "", price: 4 },
        { name: "Nastro Azzurro", description: "", price: 4 },
        { name: "Nastro Azzurro Capri", description: "", price: 5 },
        { name: "Nastro Azzurro 0", description: "Analcolica", price: 4 },
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
              description:
                "Pesto al basilico vegan, rucola, filetti di zucchine",
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
        { name: "Ravello", description: "E. Sammarco", price: 25 },
        { name: "B -------- R --------- Rosato", description: "", price: 22 },
        { name: "PROSECCO", description: "", price: 20 },
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
              description:
                "Pesto al basilico vegan, rucola, filetti di zucchine",
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

  const categories = {
    giorno: [
      { id: "cocktail", name: "Cocktail" },
      { id: "vino-e-spumanti", name: "Vino e Spumanti" },
      { id: "birre", name: "Birre" },
      { id: "bibite", name: "Bibite" },
      { id: "caffetteria", name: "Caffetteria" },
      { id: "food", name: "Food" },
    ],
    sera: [
      { id: "cocktail", name: "Cocktail" },
      { id: "vino-e-spumanti", name: "Vino e Spumanti" },
      { id: "food", name: "Food" },
    ],
  };

  const contactInfo = {
    telefono: "+39 123 456 7890",
    email: "info@piscinaterrazze.it",
    indirizzo: "Via Panoramica, 123 - Ravello (SA)",
    orari: "Aperto tutti i giorni dalle 10:00 alle 24:00",
  };

  const toggleMenuType = () => {
    setMenuType(menuType === "giorno" ? "sera" : "giorno");
  };

  return (
    <div className="min-h-screen bg-white text-neutral-800">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image
          src="/place/day.webp"
          alt="Piscina le Terrazze - Vista panoramica"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 flex items-center justify-center">
          <div className="text-center text-white p-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Piscina le Terrazze
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Un'esperienza unica con vista sul mare
            </p>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-10 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 font-bold text-xl">Le Terrazze</div>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleMenuType}
                className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                  menuType === "giorno"
                    ? "bg-indigo-900 text-white"
                    : "bg-amber-500 text-white"
                }`}
              >
                {menuType === "giorno" ? (
                  <>
                    <Moon size={18} /> Menù Serale
                  </>
                ) : (
                  <>
                    <Sun size={18} /> Menù Giorno
                  </>
                )}
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-neutral-700"
              >
                <MenuIcon size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="px-4 py-3 space-y-3">
                <button
                  onClick={() => {
                    toggleMenuType();
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-2 rounded-full flex items-center justify-center gap-2 ${
                    menuType === "giorno"
                      ? "bg-indigo-900 text-white"
                      : "bg-amber-500 text-white"
                  }`}
                >
                  {menuType === "giorno" ? (
                    <>
                      <Moon size={18} /> Menù Serale
                    </>
                  ) : (
                    <>
                      <Sun size={18} /> Menù Giorno
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Menu Type Indicator */}
      <div
        className={`py-6 ${
          menuType === "giorno" ? "bg-amber-50" : "bg-indigo-50"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className={`text-2xl font-bold ${
              menuType === "giorno" ? "text-amber-600" : "text-indigo-800"
            }`}
          >
            {menuType === "giorno" ? "Menù Giorno" : "Menù Serale"}
          </h2>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-12">
          {categories[menuType].map((category) => (
            <section
              key={category.id}
              className="scroll-mt-20"
              id={category.id}
            >
              <h3 className="text-xl font-bold mb-6 pb-2 border-b border-neutral-200">
                {category.name}
              </h3>

              {category.id === "food" ? (
                <div className="space-y-10">
                  {menuData[menuType][category.id].map(
                    (foodCategory, index) => (
                      <div key={index}>
                        <h4 className="text-lg font-semibold mb-4">
                          {foodCategory.name}
                        </h4>
                        <div className="grid gap-4">
                          {foodCategory.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="bg-white rounded-lg p-4 shadow-sm border border-neutral-100"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h5 className="text-lg font-semibold">
                                    {item.name}
                                  </h5>
                                  {item.description && (
                                    <p className="text-sm text-neutral-600 mt-1">
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                                <div
                                  className={`text-lg font-bold ${
                                    menuType === "giorno"
                                      ? "text-amber-600"
                                      : "text-indigo-700"
                                  }`}
                                >
                                  {item.price
                                    ? `${item.price.toFixed(2)} €`
                                    : ""}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="grid gap-4">
                  {menuData[menuType][category.id].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-4 shadow-sm border border-neutral-100"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold">{item.name}</h4>
                          {item.description && (
                            <p className="text-sm text-neutral-600 mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <div
                          className={`text-lg font-bold ${
                            menuType === "giorno"
                              ? "text-amber-600"
                              : "text-indigo-700"
                          }`}
                        >
                          {item.price ? `${item.price.toFixed(2)} €` : ""}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      {/* Category Navigation */}
      <div className="sticky bottom-0 bg-white border-t shadow-lg py-3 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="overflow-x-auto hide-scrollbar">
            <div className="flex space-x-4">
              {categories[menuType].map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
                    menuType === "giorno"
                      ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                      : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                  }`}
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Piscina le Terrazze</h3>
              <div className="space-y-2 text-neutral-300">
                <p>{contactInfo.indirizzo}</p>
                <p>Tel: {contactInfo.telefono}</p>
                <p>Email: {contactInfo.email}</p>
                <p>{contactInfo.orari}</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">La nostra location</h3>
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <Image
                  src="/place/night.webp"
                  alt="Piscina le Terrazze - Vista notturna"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-neutral-400">
            <p>
              © {new Date().getFullYear()} Piscina le Terrazze. Tutti i diritti
              riservati.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
