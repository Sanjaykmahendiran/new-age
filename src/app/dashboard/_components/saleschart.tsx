import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const SalesChart = () => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const earnings = [300, 750, 700, 840, 850, 999, 900, 999, 850, 470, 400, 500];
  const expenses = [300, 150, 250, 270, 400, 420, 600, 420, 400, 700, 600, 200];

  const chartData = months.map((month, i) => ({
    name: month,
    Earnings: earnings[i],
    Expenses: expenses[i],
  }));

  return (
    <motion.div
      className="min-w-[400px] h-72"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.1 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
        >
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            tickMargin={10}
            stroke="#888"
          />
          <YAxis stroke="#888" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Earnings"
            fill="#4ead91"
            radius={[4, 4, 0, 0]}
            onMouseOver={(_, i) => setHoveredBar(i)}
            onMouseOut={() => setHoveredBar(null)}
          />
          <Bar
            dataKey="Expenses"
            fill="#f87171"
            radius={[4, 4, 0, 0]}
            onMouseOver={(_, i) => setHoveredBar(i)}
            onMouseOut={() => setHoveredBar(null)}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default SalesChart;
