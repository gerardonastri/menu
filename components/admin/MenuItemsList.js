"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Edit, Trash2, Plus, Search, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

export default function MenuItemsList({ initialItems = [], time, category }) {
  const [items, setItems] = useState(initialItems)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("category")
  const [sortDirection, setSortDirection] = useState("asc")
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const fetchItems = async () => {
      setIsLoading(true)
      try {
        let url = "/api/menu-items"
        const params = new URLSearchParams()
        if (time) params.append("time", time)
        if (category) params.append("category", category)
        if (params.toString()) url += `?${params.toString()}`

        const res = await fetch(url)
        const data = await res.json()
        setItems(data)
      } catch (error) {
        console.error("Error fetching menu items:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchItems()
  }, [time, category])

  // Ritorna null durante il rendering lato server
  if (!isMounted) {
    return null
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedItems = [...items].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const filteredItems = sortedItems.filter((item) => {
    const searchRegex = new RegExp(searchTerm, "i")
    return (
      searchRegex.test(item.category) ||
      item.items.some((subItem) => searchRegex.test(subItem.name) || searchRegex.test(subItem.description))
    )
  })

  const confirmDelete = (item) => {
    setItemToDelete(item)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    if (!itemToDelete) return

    try {
      const res = await fetch(`/api/menu-items/${itemToDelete._id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setItems(items.filter((item) => item._id !== itemToDelete._id))
        setShowDeleteModal(false)
        setItemToDelete(null)
      } else {
        console.error("Failed to delete item")
      }
    } catch (error) {
      console.error("Error deleting item:", error)
    }
  }

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {time ? (time === "giorno" ? "Menu Giorno" : "Menu Sera") : "Tutti i Menu"}
            {category && ` - ${category.charAt(0).toUpperCase() + category.slice(1)}`}
          </h2>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Cerca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
              />
            </div>

            <Link
              href="/admin/menu-items/new"
              className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={18} />
              <span>Nuovo</span>
            </Link>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="p-8 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-8 text-center text-gray-500">Nessun elemento trovato</div>
      ) : (
        <div className="overflow-x-auto">
          <motion.table
            className="min-w-full divide-y divide-gray-200"
            variants={tableVariants}
            initial="hidden"
            animate="visible"
          >
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("time")}
                >
                  <div className="flex items-center gap-1">
                    Orario
                    {sortField === "time" &&
                      (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("category")}
                >
                  <div className="flex items-center gap-1">
                    Categoria
                    {sortField === "category" &&
                      (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Elementi
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {filteredItems.map((item) => (
                  <motion.tr
                    key={item._id}
                    variants={rowVariants}
                    exit={{ opacity: 0, y: -20 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.time === "giorno" ? "bg-yellow-100 text-yellow-800" : "bg-indigo-100 text-indigo-800"
                        }`}
                      >
                        {item.time === "giorno" ? "Giorno" : "Sera"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{item.items.length} elementi</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/menu-items/${item._id}`}
                          className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50"
                        >
                          <Edit size={18} />
                          <span className="sr-only">Modifica</span>
                        </Link>
                        <button
                          onClick={() => confirmDelete(item)}
                          className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                          <span className="sr-only">Elimina</span>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </motion.table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-lg p-6 max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-lg font-bold mb-4">Conferma eliminazione</h3>
            <p className="mb-6">
              Sei sicuro di voler eliminare questa categoria? Questa azione non può essere annullata.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Annulla
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Elimina
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
