"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, X, Globe } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import BookingButton from "./BookingButton";

export default function Menu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [language, setLanguage] = useState("it"); // "it" o "en"
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Traduzioni
  const translations = {
    it: {
      menu: "Il Nostro Menu",
      cerca: "Cerca nel menu...",
      risultatiRicerca: "Risultati della ricerca",
      nessunRisultato: "Nessun risultato trovato per",
      contatti: "Contatti",
      orari: "Orari",
      indirizzo: "Indirizzo",
      telefono: "Telefono",
      email: "Email",
      location: "La nostra location",
      diritti: "Tutti i diritti riservati",
      aperto: "Aperto tutti i giorni dalle 09:00 alle 18:00",
      cambiaLingua: "English",
      caricamento: "Caricamento menu...",
      errore: "Si è verificato un errore nel caricamento del menu",
      aggiungiAlCarrello: "Aggiungi al carrello",
      carrelloVuoto: "Il tuo carrello è vuoto",
      vaiAlCarrello: "Vai al carrello",
    },
    en: {
      menu: "Our Menu",
      cerca: "Search menu...",
      risultatiRicerca: "Search results",
      nessunRisultato: "No results found for",
      contatti: "Contacts",
      orari: "Opening Hours",
      indirizzo: "Address",
      telefono: "Phone",
      email: "Email",
      location: "Our location",
      diritti: "All rights reserved",
      aperto: "Open daily from 09:00 AM to 18:00 AM",
      cambiaLingua: "Italiano",
      caricamento: "Loading menu...",
      errore: "An error occurred while loading the menu",
      aggiungiAlCarrello: "Add to cart",
      carrelloVuoto: "Your cart is empty",
      vaiAlCarrello: "Go to cart",
    },
  };

  // Traduzioni delle categorie
  const categoryTranslations = {
    it: {
      cocktail: "Cocktail",
      "vino-e-spumanti": "Vino e Spumanti",
      birre: "Birre",
      bibite: "Bibite",
      caffetteria: "Caffetteria",
      food: "Food",
    },
    en: {
      cocktail: "Cocktails",
      "vino-e-spumanti": "Wine & Sparkling",
      birre: "Beers",
      bibite: "Soft Drinks",
      caffetteria: "Coffee Bar",
      food: "Food",
    },
  };

  const t = translations[language];

  const contactInfo = {
    telefono: "+393667280836",
    email: "leterrazzeravello@gmail.com",
    indirizzo: "Via della Repubblica n.9 - Ravello (SA)",
    orari: t.aperto,
  };

  // Fetch dei dati dal database - modificato per unificare giorno e sera senza duplicati
  useEffect(() => {
    const fetchMenuData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/menu-items");
        if (!response.ok) {
          throw new Error("Errore nel caricamento dei dati");
        }

        const data = await response.json();

        // Organizziamo i dati solo per categoria, unificando giorno e sera
        const organizedData = {};

        // Mappa per tenere traccia degli elementi già aggiunti (per evitare duplicati)
        const itemTracker = {};

        data.forEach((item) => {
          if (!organizedData[item.category]) {
            organizedData[item.category] = [];
            itemTracker[item.category] = {};
          }

          // Processa gli elementi normali
          item.items.forEach((menuItem, index) => {
            // Crea un ID univoco per l'elemento
            const uniqueId = `${item._id}_${index}`;

            // Usa il nome come chiave per identificare duplicati
            const itemKey = menuItem.name.toLowerCase().trim();

            if (!itemTracker[item.category][itemKey]) {
              // Se l'elemento non esiste ancora, aggiungilo
              const newItem = {
                ...menuItem,
                _id: uniqueId,
                availability: [item.time], // Tieni traccia della disponibilità
              };

              organizedData[item.category].push(newItem);
              itemTracker[item.category][itemKey] = newItem;
            } else {
              // Se l'elemento esiste già, aggiorna la disponibilità
              const existingItem = itemTracker[item.category][itemKey];
              if (!existingItem.availability.includes(item.time)) {
                existingItem.availability.push(item.time);
              }

              // Mantieni il prezzo più recente o più alto se diverso
              if (
                menuItem.price &&
                (!existingItem.price || menuItem.price > existingItem.price)
              ) {
                existingItem.price = menuItem.price;
              }

              // Mantieni la descrizione più completa
              if (
                menuItem.description &&
                (!existingItem.description ||
                  menuItem.description.length > existingItem.description.length)
              ) {
                existingItem.description = menuItem.description;
              }
              // Mantieni altri dettagli se disponibili
              [
                "provenienza",
                "tipologia",
                "gradazione",
                "colore",
                "aroma",
                "metodo",
              ].forEach((prop) => {
                if (menuItem[prop] && !existingItem[prop]) {
                  existingItem[prop] = menuItem[prop];
                }
              });
            }
          });
        });

        setMenuData(organizedData);
        setLoading(false);
      } catch (err) {
        console.error("Errore durante il fetch dei dati:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  // Genera le categorie disponibili in base ai dati
  const getCategories = () => {
    if (!menuData) return [];

    return Object.keys(menuData).map((categoryId) => ({
      id: categoryId,
      name: categoryTranslations[language][categoryId] || categoryId,
    }));
  };

  const categories = getCategories();

  const toggleLanguage = () => {
    setLanguage(language === "it" ? "en" : "it");
  };

  // Funzione per ottenere tutti gli elementi del menu
  const getAllMenuItems = () => {
    const items = [];

    if (!menuData) return items;

    // Aggiungi elementi standard
    Object.keys(menuData).forEach((categoryId) => {
      if (categoryId !== "food") {
        menuData[categoryId].forEach((item) => {
          items.push({
            ...item,
            category: categoryId,
          });
        });
      }
    });

    // Aggiungi elementi food con sottocategorie
    if (menuData.food) {
      menuData.food.forEach((foodCategory) => {
        if (foodCategory.items) {
          foodCategory.items.forEach((item) => {
            items.push({
              ...item,
              category: "food",
              subcategory: foodCategory.name,
            });
          });
        }
      });
    }

    return items;
  };

  // Effetto per filtrare gli elementi in base al termine di ricerca
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredItems([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const allItems = getAllMenuItems();

    const filtered = allItems.filter((item) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchLower) ||
        (item.description &&
          item.description.toLowerCase().includes(searchLower))
      );
    });

    setFilteredItems(filtered);
  }, [searchTerm, language, menuData]);

  // Varianti per le animazioni
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-lg text-neutral-600">{t.caricamento}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md p-6">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-600 mb-2">{t.errore}</h2>
          <p className="text-neutral-600">{error}</p>
        </div>
      </div>
    );
  }

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white p-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Piscina le Terrazze
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              {language === "it"
                ? "Un'esperienza unica con vista sul mare"
                : "A unique experience with sea view"}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-10 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 font-bold text-xl">Le Terrazze</div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLanguage}
                className="p-2 md:px-4 md:py-2 rounded-full flex items-center gap-1 md:gap-2 text-neutral-700 hover:bg-neutral-200"
                aria-label={
                  language === "it" ? "Switch to English" : "Passa all'italiano"
                }
              >
                <Image
                  width={30}
                  height={30}
                  alt="country flag"
                  src={language === "it" ? "/flags/GB.svg" : "/flags/IT.svg"}
                />
                <span className="hidden md:inline">{t.cambiaLingua}</span>
              </motion.button>
              {/* <BookingButton /> */}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Indicator */}
      <div className="md:hidden bg-white border-b px-4 py-2">
        <div className="flex justify-center items-center text-sm">
          <span className="text-neutral-500">
            {language === "it" ? "🇮🇹 Italiano" : "🇬🇧 English"}
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="sticky top-16 z-10 bg-white shadow-sm px-4 py-3">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder={t.cerca}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-neutral-100 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 text-neutral-800"
            />
            <Search
              className="absolute left-3 top-3 text-neutral-400"
              size={18}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-3 text-neutral-400"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Menu Header */}
      {!isSearching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-6 bg-amber-50"
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-amber-600">{t.menu}</h2>
          </div>
        </motion.div>
      )}

      {/* Menu Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {isSearching ? (
          <div>
            <h2 className="text-2xl font-bold mb-6">{t.risultatiRicerca}</h2>
            {filteredItems.length > 0 ? (
              <motion.div
                className="grid gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white rounded-lg p-4 shadow-sm border border-neutral-100"
                  >
                    <div>
                      <h4 className="text-lg font-semibold">{item.name}</h4>
                      {item.subcategory && (
                        <p className="text-sm text-amber-600 font-medium">
                          {item.subcategory}
                        </p>
                      )}
                      <div className="mt-2 space-y-1 text-sm">
                        {item.provenienza && (
                          <p className="text-neutral-600">
                            <span className="font-medium">Provenienza:</span>{" "}
                            {item.provenienza}
                          </p>
                        )}
                        {item.tipologia && (
                          <p className="text-neutral-600">
                            <span className="font-medium">Tipologia:</span>{" "}
                            {item.tipologia}
                          </p>
                        )}
                        {item.gradazione && (
                          <p className="text-neutral-600">
                            <span className="font-medium">Gradazione:</span>{" "}
                            {item.gradazione}
                          </p>
                        )}
                        {item.colore && (
                          <p className="text-neutral-600">
                            <span className="font-medium">Colore:</span>{" "}
                            {item.colore}
                          </p>
                        )}
                        {item.aroma && (
                          <p className="text-neutral-600">
                            <span className="font-medium">Aroma:</span>{" "}
                            {item.aroma}
                          </p>
                        )}
                        {item.metodo && (
                          <p className="text-neutral-600">
                            <span className="font-medium">
                              Metodo di produzione:
                            </span>{" "}
                            {item.metodo}
                          </p>
                        )}
                        {item.description && (
                          <p className="text-neutral-600">{item.description}</p>
                        )}
                      </div>
                      {item.description && item.description.length > 50 && (
                        <button className="text-blue-500 text-sm mt-2 hover:underline">
                          {language === "it" ? "Leggi di più" : "Read more"}
                        </button>
                      )}
                      <div className="flex justify-between items-center">
                        <div className="mt-3 text-lg font-bold text-amber-600">
                          {item.price ? `${item.price.toFixed(2)} €` : ""}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-500">
                  {t.nessunRisultato} "{searchTerm}"
                </p>
              </div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-12"
          >
            {categories.map((category) => (
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
                    {menuData[category.id] &&
                      menuData[category.id]
                        .filter((item) => item.items) // Solo elementi con sottocategorie
                        .map((foodCategory, index) => (
                          <div key={index}>
                            <h4 className="text-lg font-semibold mb-4">
                              {foodCategory.name}
                            </h4>
                            <motion.div
                              className="grid gap-4"
                              variants={containerVariants}
                              initial="hidden"
                              animate="visible"
                            >
                              {foodCategory.items &&
                                foodCategory.items.map((item, itemIndex) => (
                                  <motion.div
                                    key={itemIndex}
                                    variants={itemVariants}
                                    className="bg-white rounded-lg p-4 shadow-sm border border-neutral-100"
                                  >
                                    <div>
                                      <h5 className="text-lg font-semibold">
                                        {item.name}
                                      </h5>
                                      <div className="mt-2 space-y-1 text-sm">
                                        {item.description && (
                                          <p className="text-neutral-600">
                                            {item.description}
                                          </p>
                                        )}
                                      </div>
                                      {item.description &&
                                        item.description.length > 50 && (
                                          <button className="text-blue-500 text-sm mt-2 hover:underline">
                                            {language === "it"
                                              ? "Leggi di più"
                                              : "Read more"}
                                          </button>
                                        )}
                                      <div className="flex justify-between items-center">
                                        <div className="mt-3 text-lg font-bold text-amber-600">
                                          {item.price
                                            ? `${item.price.toFixed(2)} €`
                                            : ""}
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                            </motion.div>
                          </div>
                        ))}
                  </div>
                ) : (
                  <motion.div
                    className="grid gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {menuData[category.id] &&
                      menuData[category.id].map((item, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="bg-white rounded-lg p-4 shadow-sm border border-neutral-100"
                        >
                          <div>
                            <h4 className="text-lg font-semibold">
                              {item.name}
                            </h4>
                            <div className="mt-2 space-y-1 text-sm">
                              {item.provenienza && (
                                <p className="text-neutral-600">
                                  <span className="font-medium">
                                    Provenienza:
                                  </span>{" "}
                                  {item.provenienza}
                                </p>
                              )}
                              {item.tipologia && (
                                <p className="text-neutral-600">
                                  <span className="font-medium">
                                    Tipologia:
                                  </span>{" "}
                                  {item.tipologia}
                                </p>
                              )}
                              {item.gradazione && (
                                <p className="text-neutral-600">
                                  <span className="font-medium">
                                    Gradazione:
                                  </span>{" "}
                                  {item.gradazione}
                                </p>
                              )}
                              {item.colore && (
                                <p className="text-neutral-600">
                                  <span className="font-medium">Colore:</span>{" "}
                                  {item.colore}
                                </p>
                              )}
                              {item.aroma && (
                                <p className="text-neutral-600">
                                  <span className="font-medium">Aroma:</span>{" "}
                                  {item.aroma}
                                </p>
                              )}
                              {item.metodo && (
                                <p className="text-neutral-600">
                                  <span className="font-medium">
                                    Metodo di produzione:
                                  </span>{" "}
                                  {item.metodo}
                                </p>
                              )}
                              {item.description && (
                                <p className="text-neutral-600">
                                  {item.description}
                                </p>
                              )}
                            </div>
                            {item.description &&
                              item.description.length > 50 && (
                                <button className="text-blue-500 text-sm mt-2 hover:underline">
                                  {language === "it"
                                    ? "Leggi di più"
                                    : "Read more"}
                                </button>
                              )}
                            <div className="flex justify-between items-center">
                              <div className="mt-3 text-lg font-bold text-amber-600">
                                {item.price ? `${item.price.toFixed(2)} €` : ""}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </motion.div>
                )}
              </section>
            ))}
          </motion.div>
        )}
      </div>

      {/* Category Navigation */}
      {!isSearching && categories.length > 0 && (
        <div className="sticky bottom-0 bg-white border-t shadow-lg py-3 px-4 z-10">
          <div className="max-w-6xl mx-auto">
            <div className="overflow-x-auto hide-scrollbar">
              <div className="flex space-x-4">
                {categories.map((category) => (
                  <motion.a
                    key={category.id}
                    href={`#${category.id}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium bg-amber-100 text-amber-800 hover:bg-amber-200"
                  >
                    {category.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-4">{t.contatti}</h3>
              <div className="space-y-2 text-neutral-300">
                <p>
                  <span className="text-neutral-500">{t.indirizzo}:</span>{" "}
                  {contactInfo.indirizzo}
                </p>
                <p>
                  <span className="text-neutral-500">{t.telefono}:</span>{" "}
                  {contactInfo.telefono}
                </p>
                <p>
                  <span className="text-neutral-500">{t.email}:</span>{" "}
                  {contactInfo.email}
                </p>
                <p>
                  <span className="text-neutral-500">{t.orari}:</span>{" "}
                  {contactInfo.orari}
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-4">{t.location}</h3>
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <Image
                  src="/place/night.webp"
                  alt="Piscina le Terrazze - Vista notturna"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 pt-8 border-t border-neutral-800 text-center text-neutral-400"
          >
            <p>
              © {new Date().getFullYear()} Piscina le Terrazze.{" "}
              <Link className="underline" href="/policy">
                Privacy Policy
              </Link>
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
