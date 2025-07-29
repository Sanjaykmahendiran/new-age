import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", orders: 32, earnings: 60, refunds: 25 },
  { month: "Feb", orders: 47, earnings: 40, refunds: 18 },
  { month: "Mar", orders: 42, earnings: 58, refunds: 15 },
  { month: "Apr", orders: 48, earnings: 75, refunds: 32 },
  { month: "May", orders: 38, earnings: 62, refunds: 16 },
  { month: "Jun", orders: 58, earnings: 45, refunds: 22 },
  { month: "Jul", orders: 45, earnings: 68, refunds: 18 },
  { month: "Aug", orders: 52, earnings: 42, refunds: 24 },
  { month: "Sep", orders: 47, earnings: 55, refunds: 15 },
  { month: "Oct", orders: 42, earnings: 48, refunds: 22 },
  { month: "Nov", orders: 38, earnings: 52, refunds: 19 },
  { month: "Dec", orders: 45, earnings: 38, refunds: 24 },
];

export default function SalesReportChart() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="bg-white p-4 min-w-[400px]  rounded-xl shadow-lg w-full overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Sales Report</h2>
        <div className="flex gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-indigo-600 rounded-full"></span> Orders
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-amber-500 rounded-full"></span> Earnings
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-gray-500 rounded-full"></span> Refunds
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          onMouseMove={(state) => {
            if (state && state.activeTooltipIndex !== undefined) {
              setHoveredIndex(state.activeTooltipIndex);
            } else {
              setHoveredIndex(null);
            }
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#6366f1"
            strokeWidth={3}
            activeDot={{ r: 6 }}
            dot={{ r: 3 }}
            animationDuration={600}
          />
          <Line
            type="monotone"
            dataKey="earnings"
            stroke="#f59e0b"
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={false}
            animationDuration={600}
          />
          <BarChart data={data}>
            <Bar
              dataKey="refunds"
              fill="#9ca3af"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
