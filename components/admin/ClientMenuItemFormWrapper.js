"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Importa il componente MenuItemForm con dynamic e ssr: false
const DynamicMenuItemForm = dynamic(() => import("./MenuItemForm"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
    </div>
  ),
})

export default function ClientMenuItemFormWrapper({ menuItem }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
      </div>
    )
  }

  return <DynamicMenuItemForm menuItem={menuItem} />
}
