"use client";

import { motion } from "framer-motion";
import { Coffee, Wine, Beer, Utensils } from "lucide-react";

export default function Stats({ stats }) {
  const statCards = [
    {
      title: "Cocktail",
      value: stats.cocktail || 0,
      icon: <Wine size={24} />,
      color: "bg-purple-500",
    },
    {
      title: "Vini e Spumanti",
      value: stats.vini || 0,
      icon: <Wine size={24} />,
      color: "bg-red-500",
    },
    {
      title: "Birre",
      value: stats.birre || 0,
      icon: <Beer size={24} />,
      color: "bg-amber-500",
    },
    {
      title: "Caffetteria",
      value: stats.caffetteria || 0,
      icon: <Coffee size={24} />,
      color: "bg-amber-950 ",
    },
    {
      title: "Food",
      value: stats.food || 0,
      icon: <Utensils size={24} />,
      color: "bg-green-500",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          variants={item}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-700">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color} text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
          <div className={`h-1 ${stat.color}`}></div>
        </motion.div>
      ))}
    </motion.div>
  );
}
