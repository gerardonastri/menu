"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PieChart, Clock } from "lucide-react";
import Stats from "./Stats";

export default function Dashboard() {
  const [stats, setStats] = useState({
    cocktail: 0,
    vini: 0,
    birre: 0,
    caffetteria: 0,
    food: 0,
    total: 0,
    giorno: 0,
    sera: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const fetchStats = async () => {
      try {
        const res = await fetch("/api/menu-items");
        const data = await res.json();
        console.log(res, data);

        // Calculate stats
        const newStats = {
          cocktail: data.filter((item) => item.category === "cocktail").length,
          vini: data.filter((item) => item.category === "vino-e-spumanti")
            .length,
          birre: data.filter((item) => item.category === "birre").length,
          caffetteria: data.filter((item) => item.category === "caffetteria")
            .length,
          food: data.filter((item) => item.category === "food").length,
          total: data.length,
          giorno: data.filter((item) => item.time === "giorno").length,
          sera: data.filter((item) => item.time === "sera").length,
        };

        setStats(newStats);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Ritorna null durante il rendering lato server
  if (!isMounted) {
    return null;
  }

  const chartData = [
    { name: "Cocktail", value: stats.cocktail, color: "#8b5cf6" },
    { name: "Vini", value: stats.vini, color: "#ef4444" },
    { name: "Birre", value: stats.birre, color: "#f59e0b" },
    { name: "Caffetteria", value: stats.caffetteria, color: "#84cc16" },
    { name: "Food", value: stats.food, color: "#06b6d4" },
  ];

  const timeData = [
    { name: "Giorno", value: stats.giorno, color: "#f59e0b" },
    { name: "Sera", value: stats.sera, color: "#8b5cf6" },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
          </div>
        ) : (
          <>
            <Stats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-100 rounded-lg">
                      <PieChart className="h-6 w-6 text-rose-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Distribuzione Categorie
                    </h2>
                  </div>
                </div>
                <div className="p-6 h-80 flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="relative w-64 h-64">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {chartData.map((item, i) => {
                          // Calculate pie chart segments
                          const total = chartData.reduce(
                            (sum, item) => sum + item.value,
                            0
                          );
                          if (total === 0) return null;

                          let startAngle = 0;
                          for (let j = 0; j < i; j++) {
                            startAngle += (chartData[j].value / total) * 360;
                          }

                          const angle = (item.value / total) * 360;
                          const endAngle = startAngle + angle;

                          // Convert angles to radians
                          const startRad = ((startAngle - 90) * Math.PI) / 180;
                          const endRad = ((endAngle - 90) * Math.PI) / 180;

                          // Calculate path
                          const x1 = 50 + 40 * Math.cos(startRad);
                          const y1 = 50 + 40 * Math.sin(startRad);
                          const x2 = 50 + 40 * Math.cos(endRad);
                          const y2 = 50 + 40 * Math.sin(endRad);

                          const largeArcFlag = angle > 180 ? 1 : 0;

                          const pathData = [
                            `M 50 50`,
                            `L ${x1} ${y1}`,
                            `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                            `Z`,
                          ].join(" ");

                          return (
                            <path
                              key={item.name}
                              d={pathData}
                              fill={item.color}
                              stroke="#fff"
                              strokeWidth="1"
                            />
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {chartData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-600">
                        {item.name}: {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Distribuzione Orari
                    </h2>
                  </div>
                </div>
                <div className="p-6 h-80">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-full max-w-md">
                      {timeData.map((item, index) => (
                        <div key={item.name} className="mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              {item.name}
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {item.value}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${
                                  (item.value / (stats.giorno + stats.sera)) *
                                  100
                                }%`,
                              }}
                              transition={{
                                duration: 1,
                                delay: 0.5 + index * 0.2,
                              }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: item.color }}
                            ></motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
