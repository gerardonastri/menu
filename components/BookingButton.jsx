"use client";

import { useState } from "react";
import { Calendar, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function BookingButton({
  externalLink = "https://www.supersaas.it/schedule/la_piscina_le_terrazze/prenotazioni",
  className = "",
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={externalLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md hover:shadow-lg transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Calendar
        size={18}
        className={`transition-transform duration-300 ${
          isHovered ? "rotate-12" : ""
        }`}
      />
      <span className="hidden sm:block">Prenota Ora</span>
      <motion.span
        animate={{ x: isHovered ? 3 : 0 }}
        transition={{ duration: 0.2 }}
        className="hidden sm:block"
      >
        <ExternalLink size={16} />
      </motion.span>
    </motion.a>
  );
}
