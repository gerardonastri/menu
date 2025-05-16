"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Pusher from "pusher-js";
import {
  Bell,
  Check,
  ChevronDown,
  Clock,
  Edit,
  MoreHorizontal,
  Search,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Coffee,
} from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";

export default function OrdersManagement() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [notificationSound, setNotificationSound] = useState(true);
  const audioRef = useRef(null);

  console.log(orders);
  

  // Carica ordini e configura Pusher
  useEffect(() => {
    // 1️⃣ Fetch iniziale dal DB
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setFilteredOrders(data);
      })
      .catch(console.error);

    // 2️⃣ Setup Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });
    const channel = pusher.subscribe("orders");

    channel.bind("new-order", (newOrder) => {
      setOrders((prev) => {
        const updated = [...prev, newOrder];
        setFilteredOrders(filterOrders(updated, searchTerm, statusFilter));
        return updated;
      });
      if (notificationSound && audioRef.current) {
        audioRef.current.play().catch(console.error);
      }
    });

    channel.bind("order-updated", (upd) => {
      setOrders((prev) => {
        const updated = prev.map((o) => (o._id === upd._id ? upd : o));
        setFilteredOrders(filterOrders(updated, searchTerm, statusFilter));
        if (selectedOrder?._id === upd._id) setSelectedOrder(upd);
        return updated;
      });
    });

    channel.bind("order-deleted", (deletedId) => {
      setOrders((prev) => {
        const updated = prev.filter((o) => o._id !== deletedId);
        setFilteredOrders(filterOrders(updated, searchTerm, statusFilter));
        if (selectedOrder?._id === deletedId) setSelectedOrder(null);
        return updated;
      });
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe("orders");
    };
  }, [notificationSound, searchTerm, statusFilter, selectedOrder]);

  useEffect(() => {
    setFilteredOrders(filterOrders(orders, searchTerm, statusFilter));
  }, [orders, searchTerm, statusFilter]);

  function filterOrders(list, search, status) {
    return list.filter((order) => {
      const matchesSearch =
        !search ||
        order._id.includes(search) ||
        order.tableNumber.toString().includes(search) ||
        order.customerName?.toLowerCase().includes(search.toLowerCase()) ||
        order.items.some((i) => i.name.toLowerCase().includes(search.toLowerCase()));
      const matchesStatus = status === "all" || order.status === status;
      return matchesSearch && matchesStatus;
    });
  }

  function updateOrderStatus(orderId, newStatus) {
    fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    }).catch(console.error);
    setIsEditModalOpen(false);
  }

  function deleteOrder(orderId) {
    fetch(`/api/orders/${orderId}`, { method: "DELETE" }).catch(console.error);
    setIsDeleteModalOpen(false);
  }

  function formatDate(dateString) {
    return format(new Date(dateString), "dd MMM yyyy, HH:mm", { locale: it });
  }

  function getStatusColor(status) {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "preparing":
        return "bg-blue-100 text-blue-800";
      case "ready":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  function getStatusIcon(status) {
    switch (status) {
      case "pending":
        return <Clock size={16} />;
      case "preparing":
        return <Coffee size={16} />;
      case "ready":
        return <CheckCircle2 size={16} />;
      case "completed":
        return <Check size={16} />;
      case "cancelled":
        return <X size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  }

  function getStatusText(status) {
    switch (status) {
      case "pending":
        return "In attesa";
      case "preparing":
        return "In preparazione";
      case "ready":
        return "Pronto";
      case "completed":
        return "Completato";
      case "cancelled":
        return "Annullato";
      default:
        return status;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <audio ref={audioRef} src="/notification.mp3" />

      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">Gestione Ordini</h1>
            <button
              onClick={() => setNotificationSound((f) => !f)}
              className={`p-2 rounded-full ${
                notificationSound ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500"
              }`}
              title={notificationSound ? "Disattiva suono notifiche" : "Attiva suono notifiche"}
            >
              <Bell size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-3 gap-8">
        {/* Filtri e Lista */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-4 flex gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Cerca ordini..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="absolute right-3 top-2.5 text-gray-400">
                  <X size={18} />
                </button>
              )}
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-4 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">Tutti gli stati</option>
                <option value="pending">In attesa</option>
                <option value="preparing">In preparazione</option>
                <option value="ready">Pronto</option>
                <option value="completed">Completato</option>
                <option value="cancelled">Annullato</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200 overflow-hidden">
            <AnimatePresence initial={false}>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${
                      selectedOrder?._id === order._id ? "bg-indigo-50" : ""
                    }`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{order.item.name}</span>
                          <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Tavolo {order.tableNumber}</p>
                        <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{(order.item.price * order.quantity || 0).toFixed(2)} €</p>
                        <p className="text-sm text-gray-600 mt-1"> {order.quantity} prodotti</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">Nessun ordine trovato</div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dettagli Ordine */}
        <div className="bg-white rounded-lg shadow-sm h-full relative">
          {selectedOrder ? (
            <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">{selectedOrder.item.name}</h2>
                  <p className="text-sm text-gray-600">Creato {formatDate(selectedOrder.createdAt)}</p>
                </div>
                <button onClick={() => setIsEditModalOpen((f) => !f)} className="p-2 rounded-full hover:bg-gray-100">
                  <MoreHorizontal size={20} className="text-gray-500" />
                </button>
                {isEditModalOpen && (
                  <div className="absolute right-6 top-6 bg-white shadow border rounded-md z-10">
                    <button
                      className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
                      onClick={() => updateOrderStatus(selectedOrder._id, "preparing")}
                    >
                      <Edit size={16} className="mr-2" /> Modifica
                    </button>
                    <button
                      className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 w-full"
                      onClick={() => setIsDeleteModalOpen(true)}
                    >
                      <Trash2 size={16} className="mr-2" /> Elimina
                    </button>
                  </div>
                )}
              </div>

              <div className="flex-grow overflow-auto">
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Stato</h3>
                  <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    {getStatusText(selectedOrder.status)}
                  </span>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {["preparing","ready","completed","cancelled"].map((st) =>
                      st !== selectedOrder.status ? (
                        <button
                          key={st}
                          onClick={() => updateOrderStatus(selectedOrder._id, st)}
                          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            st === "preparing"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                              : st === "ready"
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : st === "completed"
                              ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                              : "bg-red-100 text-red-800 hover:bg-red-200"
                          }`}
                        >
                          {getStatusText(st)}
                        </button>
                      ) : null
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Informazioni</h3>
                  <p className="text-sm text-gray-500">Tavolo: <span className="font-medium">{selectedOrder.tableNumber}</span></p>
                  {selectedOrder.customerName && (
                    <p className="text-sm text-gray-500">Cliente: <span className="font-medium">{selectedOrder.customerName}</span></p>
                  )}
                </div>

                <div>
                  <h3 className="font-medium mb-3">Prodotti</h3>
                  <div className="space-y-3">
                    {(selectedOrder?.items ?? []).map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center text-xs font-medium mr-3">
                            {item.quantity}
                          </span>
                          <span>{item.item.name}</span>
                        </div>
                        <span className="font-medium">{(item.item.price * item.quantity).toFixed(2)} €</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-between items-center">
                <span className="font-bold">Totale</span>
                <span className="font-bold text-lg">
                  {(selectedOrder.item.price * selectedOrder.quantity || 0).toFixed(2)} €
                </span>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center flex flex-col items-center justify-center h-full text-gray-500">
              <Coffee size={32} className="mb-4" />
              <h3 className="text-lg font-medium">Nessun ordine selezionato</h3>
              <p>Seleziona un ordine per visualizzare i dettagli</p>
            </div>
          )}

          {/* Modal Elimina */}
          {isDeleteModalOpen && selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
              >
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-3">Conferma eliminazione</h3>
                  <p className="text-gray-600 mb-6">
                    Sei sicuro di voler eliminare l'ordine <strong>{selectedOrder._id}</strong>?
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setIsDeleteModalOpen(false)}
                      className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Annulla
                    </button>
                    <button
                      onClick={() => deleteOrder(selectedOrder._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Elimina
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
