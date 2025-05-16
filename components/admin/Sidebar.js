"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Coffee,
  Wine,
  Beer,
  Utensils,
  Sun,
  Moon,
  Menu,
  X,
  Settings,
  LogOut,
  ConciergeBell
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const { logout } = useAuth();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <Home size={20} /> },
    {
      name: "Giorno",
      href: "/admin/menu-items?time=giorno",
      icon: <Sun size={20} />,
    },
    {
      name: "Sera",
      href: "/admin/menu-items?time=sera",
      icon: <Moon size={20} />,
    },
    {
      name: "Cocktail",
      href: "/admin/menu-items?category=cocktail",
      icon: <Wine size={20} />,
    },
    {
      name: "Vini e Spumanti",
      href: "/admin/menu-items?category=vino-e-spumanti",
      icon: <Wine size={20} />,
    },
    {
      name: "Birre",
      href: "/admin/menu-items?category=birre",
      icon: <Beer size={20} />,
    },
    {
      name: "Caffetteria",
      href: "/admin/menu-items?category=caffetteria",
      icon: <Coffee size={20} />,
    },
    {
      name: "Food",
      href: "/admin/menu-items?category=food",
      icon: <Utensils size={20} />,
    },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-rose-600 text-white shadow-lg md:hidden"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar for mobile */}
      <motion.div
        className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 md:hidden"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-rose-600">Menu Admin</h2>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                pathname === item.href ||
                (item.href.includes("?") &&
                  pathname.startsWith(item.href.split("?")[0]))
                  ? "bg-rose-50 text-rose-600"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </motion.div>

      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white shadow-lg">
        <div className="flex items-center justify-center h-16 border-b">
          <h2 className="text-2xl font-bold text-rose-600">Menu Admin</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  pathname === item.href ||
                  (item.href.includes("?") &&
                    pathname.startsWith(item.href.split("?")[0]))
                    ? "bg-rose-50 text-rose-600"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t">
          <div className="space-y-2">
            <Link
              href="/admin/orders"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
            >
              <ConciergeBell size={20} />
              <span>Ordini</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
            >
              <Settings size={20} />
              <span>Impostazioni</span>
            </Link>
            <button
              onClick={() => logout()}
              className="cursor-pointer flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50 w-full"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
