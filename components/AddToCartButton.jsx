"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import { Plus, Minus, ShoppingCart } from 'lucide-react'
import { motion } from "framer-motion"

export default function AddToCartButton({ item }) {
  const { addToCart, cartItems, updateQuantity } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  
  // Trova l'elemento nel carrello se esiste
  const cartItem = cartItems.find(cartItem => cartItem._id === item._id)
  const quantity = cartItem ? cartItem.quantity : 0
  
  const handleAddToCart = () => {
    addToCart(item)
    
    // Animazione
    setIsAdding(true)
    setTimeout(() => setIsAdding(false), 500)
  }
  
  const incrementQuantity = () => {
    updateQuantity(item._id, quantity + 1)
  }
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      updateQuantity(item._id, quantity - 1)
    }
  }
  
  return (
    <div className="mt-3">
      {quantity === 0 ? (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full text-white font-medium ${
            isAdding ? "bg-green-500" : "bg-amber-500 hover:bg-amber-600"
          } transition-colors`}
        >
          <ShoppingCart size={16} />
          Aggiungi al carrello
        </motion.button>
      ) : (
        <div className="flex items-center">
          <button
            onClick={decrementQuantity}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            <Minus size={16} />
          </button>
          <span className="mx-3 font-medium">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-500 text-white hover:bg-amber-600"
          >
            <Plus size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
