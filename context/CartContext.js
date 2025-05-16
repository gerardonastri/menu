"use client"

import { createContext, useState, useContext, useEffect } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [tableNumber, setTableNumber] = useState("")
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    const storedTable = localStorage.getItem("tableNumber")

    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart)
        setCartItems(Array.isArray(parsedCart) ? parsedCart : [])
      } catch (error) {
        console.error("Error en el parsing del carrello:", error)
        setCartItems([])
      }
    }

    if (storedTable) {
      setTableNumber(storedTable)
    }
  }, [])

  // Salva il carrello nel localStorage quando cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  // Salva il numero del tavolo nel localStorage quando cambia
  useEffect(() => {
    if (tableNumber) {
      localStorage.setItem("tableNumber", tableNumber)
    }
  }, [tableNumber])

  // Aggiungi un elemento al carrello
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      // Controlla se l'elemento è già nel carrello
      const existingItemIndex = prevItems.findIndex((cartItem) => cartItem._id === item._id)

      if (existingItemIndex >= 0) {
        // Se l'elemento esiste, aumenta la quantità
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        }
        return updatedItems
      } else {
        // Altrimenti, aggiungi il nuovo elemento con quantità 1
        return [...prevItems, { ...item, quantity: 1 }]
      }
    })

    // Apri il mini-carrello quando aggiungi un elemento
    setIsCartOpen(true)

    // Chiudi il mini-carrello dopo 3 secondi
    setTimeout(() => {
      setIsCartOpen(false)
    }, 3000)
  }

  // Rimuovi un elemento dal carrello
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId))
  }

  // Aggiorna la quantità di un elemento nel carrello
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems((prevItems) =>
      prevItems.map((item) => (item._id === itemId ? { ...item, quantity: newQuantity } : item)),
    )
  }

  // Modifica las funciones getCartTotal y getCartItemsCount para manejar casos donde cartItems no sea un array
  const getCartTotal = () => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) return 0
    return cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0)
  }

  const getCartItemsCount = () => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) return 0
    return cartItems.reduce((count, item) => count + (item.quantity || 1), 0)
  }

  // Svuota il carrello
  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        tableNumber,
        setTableNumber,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getCartItemsCount,
        clearCart,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
