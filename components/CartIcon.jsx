"use client"

import { ShoppingBag } from 'lucide-react'
import { useCart } from "@/context/CartContext"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function CartIcon() {
  const { getCartItemsCount, getCartTotal, isCartOpen, setIsCartOpen, cartItems } = useCart()
  
  const itemCount = getCartItemsCount()
  const total = getCartTotal()
  
  return (
    <div className="relative">
      <Link href="/cart">
        <button 
          className="p-2 cursor-pointer rounded-full bg-white shadow-md relative"
          onClick={() => setIsCartOpen(false)}
        >
          <ShoppingBag size={20} className="text-amber-600" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          )}
        </button>
      </Link>
      
      <AnimatePresence>
        {isCartOpen && itemCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 overflow-hidden"
          >
            <div className="p-3 border-b">
              <p className="font-medium">Il tuo carrello</p>
              <p className="text-sm text-gray-500">{itemCount} prodotti</p>
            </div>
            
            <div className="max-h-60 overflow-y-auto">
              {cartItems.slice(0, 3).map((item) => (
                <div key={item._id} className="p-3 border-b flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">Quantità: {item.quantity}</p>
                  </div>
                  <p className="font-medium">{(item.price * item.quantity).toFixed(2)} €</p>
                </div>
              ))}
              
              {cartItems.length > 3 && (
                <div className="p-2 text-center text-sm text-gray-500">
                  + {cartItems.length - 3} altri prodotti
                </div>
              )}
            </div>
            
            <div className="p-3 bg-gray-50">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Totale:</span>
                <span className="font-bold">{total.toFixed(2)} €</span>
              </div>
              <Link href="/cart" className="block">
                <button 
                  className="w-full py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors text-sm font-medium"
                  onClick={() => setIsCartOpen(false)}
                >
                  Vai al carrello
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
