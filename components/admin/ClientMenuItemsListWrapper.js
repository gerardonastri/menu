"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Importa il componente MenuItemsList con dynamic e ssr: false
const DynamicMenuItemsList = dynamic(() => import("./MenuItemsList"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
    </div>
  ),
})

export default function ClientMenuItemsListWrapper({ initialItems, time, category }) {
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

  return <DynamicMenuItemsList initialItems={initialItems} time={time} category={category} />
}
