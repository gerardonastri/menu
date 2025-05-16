"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart, tableNumber, setTableNumber } = useCart()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderError, setOrderError] = useState("")

  const total = getCartTotal()
  console.log(cartItems);
  

  // Gestisci l'invio dell'ordine
  const handleSubmitOrder = async () => {
    if (!tableNumber) {
      setOrderError("Inserisci il numero del tavolo")
      return
    }

    if (cartItems.length === 0) {
      setOrderError("Il carrello è vuoto")
      return
    }

    setIsSubmitting(true)
    setOrderError("")

    try {
      // Crea un ordine per ogni elemento nel carrello
      const orderPromises = cartItems.map((item) => {
        
        return fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item: item,
            quantity: item.quantity,
            tableNumber: Number.parseInt(tableNumber),
          }),
        }).then((res) => {
          if (!res.ok) throw new Error("Errore nell'invio dell'ordine")
          return res.json()
        })
      })

      await Promise.all(orderPromises)

      // Ordine completato con successo
      setOrderSuccess(true)
      clearCart()

      // Reimposta lo stato dopo 5 secondi
      setTimeout(() => {
        setOrderSuccess(false)
      }, 5000)
    } catch (error) {
      console.error("Errore nell'invio dell'ordine:", error)
      setOrderError("Si è verificato un errore nell'invio dell'ordine. Riprova più tardi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {orderSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-8 text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Ordine inviato con successo!</h1>
            <p className="text-gray-600 mb-6">Il tuo ordine è stato ricevuto e sarà preparato a breve.</p>
            <Link href="/">
              <button className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                Torna al menu
              </button>
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="mr-2" size={20} />
                <span>Torna al menu</span>
              </Link>
              <h1 className="text-2xl font-bold">Il tuo carrello</h1>
            </div>

            {cartItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-lg font-semibold mb-4">Prodotti nel carrello</h2>
                      <div className="divide-y">
                        <AnimatePresence initial={false}>
                          {cartItems.map((item) => (
                            <motion.div
                              key={item._id}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="py-4"
                            >
                              <div className="flex justify-between">
                                <div className="flex-1">
                                  <h3 className="font-medium">{item.name}</h3>
                                  {item.description && <p className="text-sm text-gray-500 mt-1">{item.description}</p>}
                                  <div className="flex items-center mt-2">
                                    <button
                                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                      disabled={item.quantity <= 1}
                                      className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                        item.quantity <= 1
                                          ? "bg-gray-100 text-gray-400"
                                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                      }`}
                                    >
                                      <Minus size={16} />
                                    </button>
                                    <span className="mx-3 font-medium">{item.quantity}</span>
                                    <button
                                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                      className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200"
                                    >
                                      <Plus size={16} />
                                    </button>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end">
                                  <span className="font-bold">{(item.price * item.quantity).toFixed(2)} €</span>
                                  <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="text-red-500 hover:text-red-700 mt-2"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                    <h2 className="text-lg font-semibold mb-4">Riepilogo ordine</h2>

                    <div className="mb-6">
                      <label htmlFor="tableNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Numero del tavolo *
                      </label>
                      <input
                        type="number"
                        id="tableNumber"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Inserisci il numero del tavolo"
                        required
                      />
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotale</span>
                        <span>{total.toFixed(2)} €</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-bold">
                          <span>Totale</span>
                          <span>{total.toFixed(2)} €</span>
                        </div>
                      </div>
                    </div>

                    {orderError && (
                      <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">{orderError}</div>
                    )}

                    <button
                      onClick={handleSubmitOrder}
                      disabled={isSubmitting || cartItems.length === 0}
                      className={`w-full py-3 rounded-md flex items-center justify-center gap-2 font-medium ${
                        isSubmitting || cartItems.length === 0
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-amber-500 text-white hover:bg-amber-600"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                          Invio in corso...
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={18} />
                          Invia ordine
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2">Il tuo carrello è vuoto</h2>
                <p className="text-gray-600 mb-6">Aggiungi qualche prodotto dal menu per iniziare a ordinare.</p>
                <Link href="/">
                  <button className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                    Sfoglia il menu
                  </button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
