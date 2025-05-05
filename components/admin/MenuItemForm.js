"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Plus, Minus, Save, ArrowLeft, Trash2 } from "lucide-react"

export default function MenuItemForm({ menuItem }) {
  const router = useRouter()
  const isEditing = !!menuItem
  const [isMounted, setIsMounted] = useState(false)

  const [formData, setFormData] = useState({
    time: menuItem?.time || "giorno",
    category: menuItem?.category || "",
    items: menuItem?.items || [],
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Ritorna null durante il rendering lato server
  if (!isMounted) {
    return null
  }

  const categories = ["cocktail", "vino-e-spumanti", "birre", "bibite", "caffetteria", "food"]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items]
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    }

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }))
  }

  const handleSubItemChange = (itemIndex, subItemIndex, field, value) => {
    const updatedItems = [...formData.items]

    if (!updatedItems[itemIndex].items) {
      updatedItems[itemIndex].items = []
    }

    updatedItems[itemIndex].items[subItemIndex] = {
      ...updatedItems[itemIndex].items[subItemIndex],
      [field]: field === "price" ? Number.parseFloat(value) || 0 : value,
    }

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }))
  }

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", description: "", price: 0 }],
    }))
  }

  const addSubItem = (itemIndex) => {
    const updatedItems = [...formData.items]

    if (!updatedItems[itemIndex].items) {
      updatedItems[itemIndex].items = []
    }

    updatedItems[itemIndex].items.push({ name: "", description: "", price: 0 })

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }))
  }

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index)
    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }))
  }

  const removeSubItem = (itemIndex, subItemIndex) => {
    const updatedItems = [...formData.items]
    updatedItems[itemIndex].items = updatedItems[itemIndex].items.filter((_, i) => i !== subItemIndex)

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.time) newErrors.time = "Seleziona un orario"
    if (!formData.category) newErrors.category = "Seleziona una categoria"
    if (formData.items.length === 0) newErrors.items = "Aggiungi almeno un elemento"

    formData.items.forEach((item, index) => {
      if (!item.name) {
        newErrors[`item_${index}_name`] = "Il nome è obbligatorio"
      }

      if (item.items && item.items.length > 0) {
        item.items.forEach((subItem, subIndex) => {
          if (!subItem.name) {
            newErrors[`item_${index}_subitem_${subIndex}_name`] = "Il nome è obbligatorio"
          }
        })
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const url = isEditing ? `/api/menu-items/${menuItem._id}` : "/api/menu-items"

      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/admin")
        router.refresh()
      } else {
        const data = await response.json()
        setErrors({ submit: data.error || "Si è verificato un errore" })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrors({ submit: "Si è verificato un errore durante l'invio del form" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{isEditing ? "Modifica Menu Item" : "Nuovo Menu Item"}</h2>
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={18} />
            <span>Indietro</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-6">
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{errors.submit}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Orario</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none ${
                  errors.time ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="giorno">Giorno</option>
                <option value="sera">Sera</option>
              </select>
              {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Seleziona categoria</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.replace(/-/g, " ").slice(1)}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Elementi</h3>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-1 text-rose-600 hover:text-rose-800"
              >
                <Plus size={18} />
                <span>Aggiungi elemento</span>
              </button>
            </div>

            {errors.items && <p className="mt-1 text-sm text-red-600 mb-4">{errors.items}</p>}

            <div className="space-y-6">
              {formData.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="border rounded-lg p-4 relative"
                >
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                      <input
                        type="text"
                        value={item.name || ""}
                        onChange={(e) => handleItemChange(index, "name", e.target.value)}
                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none ${
                          errors[`item_${index}_name`] ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors[`item_${index}_name`] && (
                        <p className="mt-1 text-sm text-red-600">{errors[`item_${index}_name`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Descrizione</label>
                      <input
                        type="text"
                        value={item.description || ""}
                        onChange={(e) => handleItemChange(index, "description", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prezzo</label>
                      <input
                        type="number"
                        step="0.01"
                        value={item.price || ""}
                        onChange={(e) => handleItemChange(index, "price", Number.parseFloat(e.target.value) || 0)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gradazione</label>
                      <input
                        type="text"
                        value={item.gradazione || ""}
                        onChange={(e) => handleItemChange(index, "gradazione", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Colore</label>
                      <input
                        type="text"
                        value={item.colore || ""}
                        onChange={(e) => handleItemChange(index, "colore", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Aroma</label>
                      <input
                        type="text"
                        value={item.aroma || ""}
                        onChange={(e) => handleItemChange(index, "aroma", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Provenienza</label>
                      <input
                        type="text"
                        value={item.provenienza || ""}
                        onChange={(e) => handleItemChange(index, "provenienza", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tipologia</label>
                      <input
                        type="text"
                        value={item.tipologia || ""}
                        onChange={(e) => handleItemChange(index, "tipologia", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Sub-items section (for food category) */}
                  {formData.category === "food" && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-md font-medium text-gray-800">Sotto-elementi</h4>
                        <button
                          type="button"
                          onClick={() => addSubItem(index)}
                          className="flex items-center gap-1 text-rose-600 hover:text-rose-800"
                        >
                          <Plus size={16} />
                          <span>Aggiungi sotto-elemento</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {item.items &&
                          item.items.map((subItem, subIndex) => (
                            <motion.div
                              key={subIndex}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="border border-dashed border-gray-300 rounded-lg p-3 relative"
                            >
                              <button
                                type="button"
                                onClick={() => removeSubItem(index, subIndex)}
                                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                              >
                                <Minus size={16} />
                              </button>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                                  <input
                                    type="text"
                                    value={subItem.name || ""}
                                    onChange={(e) => handleSubItemChange(index, subIndex, "name", e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none ${
                                      errors[`item_${index}_subitem_${subIndex}_name`]
                                        ? "border-red-500"
                                        : "border-gray-300"
                                    }`}
                                  />
                                  {errors[`item_${index}_subitem_${subIndex}_name`] && (
                                    <p className="mt-1 text-sm text-red-600">
                                      {errors[`item_${index}_subitem_${subIndex}_name`]}
                                    </p>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Descrizione</label>
                                  <input
                                    type="text"
                                    value={subItem.description || ""}
                                    onChange={(e) =>
                                      handleSubItemChange(index, subIndex, "description", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Prezzo</label>
                                  <input
                                    type="number"
                                    step="0.01"
                                    value={subItem.price || ""}
                                    onChange={(e) => handleSubItemChange(index, subIndex, "price", e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                                  />
                                </div>
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Salvataggio...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Salva</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
