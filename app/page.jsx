"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Sun, Moon, MenuIcon, Search, X, Globe } from "lucide-react"

export default function Menu() {
  const [menuType, setMenuType] = useState("giorno") // "giorno" o "sera"
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredItems, setFilteredItems] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [language, setLanguage] = useState("it") // "it" o "en"

  // Traduzioni
  const translations = {
    it: {
      menuGiorno: "Menù Giorno",
      menuSerale: "Menù Serale",
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
      aperto: "Aperto tutti i giorni dalle 10:00 alle 24:00",
      cambiaLingua: "English",
    },
    en: {
      menuGiorno: "Day Menu",
      menuSerale: "Evening Menu",
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
      aperto: "Open daily from 10:00 AM to 12:00 AM",
      cambiaLingua: "Italiano",
    },
  }

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
  }

  const t = translations[language]

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
        { name: "Hugò spritz", description: "Sciroppo di sambuco, prosecco, menta, lime", price: 7 },
        { name: "Limoncello spritz", description: "Limoncello, prosecco, soda", price: 7 },
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
            { name: "Italia", description: "Pomodori semi dry, mozzarella, pesto al basilico vegan", price: 10 },
            { name: "Marinara", description: "Pomodori semi dry, mozzarella, filetti di alici di Cetara", price: 12 },
            { name: "Golosa", description: "Mortadella, mozzarella, pistacchi", price: 11 },
            { name: "Vegetariana", description: "Pesto al basilico vegan, rucola, filetti di zucchine", price: 10 },
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
        { name: "Aperol spritz", description: "Aperol, prosecco, soda", price: 8 },
        { name: "Campari spritz", description: "Campari, prosecco, soda", price: 8 },
        { name: "Hugò spritz", description: "Sciroppo di sambuco, prosecco, menta, lime", price: 8 },
        { name: "Limoncello spritz", description: "Limoncello, prosecco, soda", price: 8 },
        { name: "Bellini", description: "Prosecco, purea di pesca", price: 8 },
        { name: "Negroni", description: "Gin, vermouth rosso, Campari", price: 9 },
        { name: "Negroni sbagliato", description: "Prosecco, vermouth rosso, Campari", price: 9 },
        { name: "Americano", description: "Campari, vermouth rosso, soda", price: 8 },
        { name: "Gin tonic", description: "", price: 9 },
        { name: "Gin lemon", description: "", price: 9 },
      ],
      "vino-e-spumanti": [
        { name: "Ravello", description: "E. Sammarco", price: 25, provenienza: "Campania", tipologia: "Rosso" },
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
            { name: "Italia", description: "Pomodori semi dry, mozzarella, pesto al basilico vegan", price: 10 },
            { name: "Marinara", description: "Pomodori semi dry, mozzarella, filetti di alici di Cetara", price: 12 },
            { name: "Golosa", description: "Mortadella, mozzarella, pistacchi", price: 11 },
            { name: "Vegetariana", description: "Pesto al basilico vegan, rucola, filetti di zucchine", price: 10 },
          ],
        },
        {
          name: "Taglieri",
          description: "",
          items: [
            { name: "Gran tagliere X2", description: "Mortadella, crudo, provolone, formaggi", price: 18 },
            { name: "Tagliere vegetariano", description: "Provolone, formaggio, noci, zucchine", price: 15 },
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
  }

  const categories = {
    giorno: [
      { id: "cocktail", name: categoryTranslations[language].cocktail },
      { id: "vino-e-spumanti", name: categoryTranslations[language]["vino-e-spumanti"] },
      { id: "birre", name: categoryTranslations[language].birre },
      { id: "bibite", name: categoryTranslations[language].bibite },
      { id: "caffetteria", name: categoryTranslations[language].caffetteria },
      { id: "food", name: categoryTranslations[language].food },
    ],
    sera: [
      { id: "cocktail", name: categoryTranslations[language].cocktail },
      { id: "vino-e-spumanti", name: categoryTranslations[language]["vino-e-spumanti"] },
      { id: "food", name: categoryTranslations[language].food },
    ],
  }

  const contactInfo = {
    telefono: "+39 123 456 7890",
    email: "info@piscinaterrazze.it",
    indirizzo: "Via Panoramica, 123 - Ravello (SA)",
    orari: t.aperto,
  }

  const toggleMenuType = () => {
    setMenuType(menuType === "giorno" ? "sera" : "giorno")
    setSearchTerm("")
    setIsSearching(false)
  }

  const toggleLanguage = () => {
    setLanguage(language === "it" ? "en" : "it")
  }

  // Funzione per ottenere tutti gli elementi del menu corrente
  const getAllMenuItems = () => {
    const items = []

    // Aggiungi elementi standard
    Object.keys(menuData[menuType]).forEach((categoryId) => {
      if (categoryId !== "food") {
        menuData[menuType][categoryId].forEach((item) => {
          items.push({
            ...item,
            category: categoryId,
          })
        })
      }
    })

    // Aggiungi elementi food con sottocategorie
    if (menuData[menuType].food) {
      menuData[menuType].food.forEach((foodCategory) => {
        if (foodCategory.items) {
          foodCategory.items.forEach((item) => {
            items.push({
              ...item,
              category: "food",
              subcategory: foodCategory.name,
            })
          })
        }
      })
    }

    return items
  }

  // Effetto per filtrare gli elementi in base al termine di ricerca
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredItems([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const allItems = getAllMenuItems()

    const filtered = allItems.filter((item) => {
      const searchLower = searchTerm.toLowerCase()
      return (
        item.name.toLowerCase().includes(searchLower) ||
        (item.description && item.description.toLowerCase().includes(searchLower))
      )
    })

    setFilteredItems(filtered)
  }, [searchTerm, menuType, language])

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
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Piscina le Terrazze</h1>
            <p className="text-lg md:text-xl opacity-90">
              {language === "it" ? "Un'esperienza unica con vista sul mare" : "A unique experience with sea view"}
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
                onClick={toggleLanguage}
                className="px-4 py-2 rounded-full flex items-center gap-2 bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              >
                <Globe size={18} /> {t.cambiaLingua}
              </button>

              <button
                onClick={toggleMenuType}
                className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                  menuType === "giorno" ? "bg-indigo-900 text-white" : "bg-amber-500 text-white"
                }`}
              >
                {menuType === "giorno" ? (
                  <>
                    <Moon size={18} /> {t.menuSerale}
                  </>
                ) : (
                  <>
                    <Sun size={18} /> {t.menuGiorno}
                  </>
                )}
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md text-neutral-700">
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
                  onClick={toggleLanguage}
                  className="w-full px-4 py-2 rounded-full flex items-center justify-center gap-2 bg-neutral-100 text-neutral-700"
                >
                  <Globe size={18} /> {t.cambiaLingua}
                </button>

                <button
                  onClick={() => {
                    toggleMenuType()
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full px-4 py-2 rounded-full flex items-center justify-center gap-2 ${
                    menuType === "giorno" ? "bg-indigo-900 text-white" : "bg-amber-500 text-white"
                  }`}
                >
                  {menuType === "giorno" ? (
                    <>
                      <Moon size={18} /> {t.menuSerale}
                    </>
                  ) : (
                    <>
                      <Sun size={18} /> {t.menuGiorno}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

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
            <Search className="absolute left-3 top-3 text-neutral-400" size={18} />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="absolute right-3 top-3 text-neutral-400">
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Menu Type Indicator */}
      {!isSearching && (
        <div className={`py-6 ${menuType === "giorno" ? "bg-amber-50" : "bg-indigo-50"}`}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className={`text-2xl font-bold ${menuType === "giorno" ? "text-amber-600" : "text-indigo-800"}`}>
              {menuType === "giorno" ? t.menuGiorno : t.menuSerale}
            </h2>
          </div>
        </div>
      )}

      {/* Menu Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {isSearching ? (
          <div>
            <h2 className="text-2xl font-bold mb-6">{t.risultatiRicerca}</h2>
            {filteredItems.length > 0 ? (
              <div className="grid gap-4">
                {filteredItems.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-neutral-100">
                    <div>
                      <h4 className="text-lg font-semibold">{item.name}</h4>
                      {item.subcategory && <p className="text-sm text-amber-600 font-medium">{item.subcategory}</p>}
                      <div className="mt-2 space-y-1 text-sm">
                        {item.provenienza && (
                          <p className="text-neutral-600">
                            <span className="font-medium">Provenienza:</span> {item.provenienza}
                          </p>
                        )}
                        {item.tipologia && (
                          <p className="text-neutral-600">
                            <span className="font-medium">Tipologia:</span> {item.tipologia}
                          </p>
                        )}
                        {item.gradazione && (
                          <p className="text-neutral-600">
                            <span className="font-medium">Gradazione:</span> {item.gradazione}
                          </p>
                        )}
                        {item.colore && (
                          <p className="text-neutral-600">
                            <span className="font-medium">Colore:</span> {item.colore}
                          </p>
                        )}
                        {item.aroma && (
                          <p className="text-neutral-600">
                            <span className="font-medium">Aroma:</span> {item.aroma}
                          </p>
                        )}
                        {item.metodo && (
                          <p className="text-neutral-600">
                            <span className="font-medium">Metodo di produzione:</span> {item.metodo}
                          </p>
                        )}
                        {item.description && <p className="text-neutral-600">{item.description}</p>}
                      </div>
                      {item.description && item.description.length > 50 && (
                        <button className="text-blue-500 text-sm mt-2 hover:underline">
                          {language === "it" ? "Leggi di più" : "Read more"}
                        </button>
                      )}
                      <div className={`mt-3 text-lg font-bold ${menuType === "giorno" ? "text-amber-600" : "text-indigo-700"}`}>
                        {item.price ? `${item.price.toFixed(2)} €` : ""}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-500">
                  {t.nessunRisultato} "{searchTerm}"
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-12">
            {categories[menuType].map((category) => (
              <section key={category.id} className="scroll-mt-20" id={category.id}>
                <h3 className="text-xl font-bold mb-6 pb-2 border-b border-neutral-200">{category.name}</h3>

                {category.id === "food" ? (
                  <div className="space-y-10">
                    {menuData[menuType][category.id].map((foodCategory, index) => (
                      <div key={index}>
                        <h4 className="text-lg font-semibold mb-4">{foodCategory.name}</h4>
                        <div className="grid gap-4">
                          {foodCategory.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="bg-white rounded-lg p-4 shadow-sm border border-neutral-100"
                            >
                              <div>
                                <h5 className="text-lg font-semibold">{item.name}</h5>
                                <div className="mt-2 space-y-1 text-sm">
                                  {item.description && <p className="text-neutral-600">{item.description}</p>}
                                </div>
                                {item.description && item.description.length > 50 && (
                                  <button className="text-blue-500 text-sm mt-2 hover:underline">
                                    {language === "it" ? "Leggi di più" : "Read more"}
                                  </button>
                                )}
                                <div className={`mt-3 text-lg font-bold ${menuType === "giorno" ? "text-amber-600" : "text-indigo-700"}`}>
                                  {item.price ? `${item.price.toFixed(2)} €` : ""}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {menuData[menuType][category.id].map((item, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-neutral-100">
                        <div>
                          <h4 className="text-lg font-semibold">{item.name}</h4>
                          <div className="mt-2 space-y-1 text-sm">
                            {item.provenienza && (
                              <p className="text-neutral-600">
                                <span className="font-medium">Provenienza:</span> {item.provenienza}
                              </p>
                            )}
                            {item.tipologia && (
                              <p className="text-neutral-600">
                                <span className="font-medium">Tipologia:</span> {item.tipologia}
                              </p>
                            )}
                            {item.gradazione && (
                              <p className="text-neutral-600">
                                <span className="font-medium">Gradazione:</span> {item.gradazione}
                              </p>
                            )}
                            {item.colore && (
                              <p className="text-neutral-600">
                                <span className="font-medium">Colore:</span> {item.colore}
                              </p>
                            )}
                            {item.aroma && (
                              <p className="text-neutral-600">
                                <span className="font-medium">Aroma:</span> {item.aroma}
                              </p>
                            )}
                            {item.metodo && (
                              <p className="text-neutral-600">
                                <span className="font-medium">Metodo di produzione:</span> {item.metodo}
                              </p>
                            )}
                            {item.description && <p className="text-neutral-600">{item.description}</p>}
                          </div>
                          {item.description && item.description.length > 50 && (
                            <button className="text-blue-500 text-sm mt-2 hover:underline">
                              {language === "it" ? "Leggi di più" : "Read more"}
                            </button>
                          )}
                          <div className={`mt-3 text-lg font-bold ${menuType === "giorno" ? "text-amber-600" : "text-indigo-700"}`}>
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
        )}
      </div>

      {/* Category Navigation */}
      {!isSearching && (
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
      )}

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{t.contatti}</h3>
              <div className="space-y-2 text-neutral-300">
                <p>
                  <span className="text-neutral-500">{t.indirizzo}:</span> {contactInfo.indirizzo}
                </p>
                <p>
                  <span className="text-neutral-500">{t.telefono}:</span> {contactInfo.telefono}
                </p>
                <p>
                  <span className="text-neutral-500">{t.email}:</span> {contactInfo.email}
                </p>
                <p>
                  <span className="text-neutral-500">{t.orari}:</span> {contactInfo.orari}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{t.location}</h3>
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
              © {new Date().getFullYear()} Piscina le Terrazze. {t.diritti}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
