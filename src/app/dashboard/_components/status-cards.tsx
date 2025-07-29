import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import revenueIcon from "@/assets/dashboard/revenue.png";
import expenseIcon from "@/assets/dashboard/expense.png";
import profitIcon from "@/assets/dashboard/profit.png";
import dueIcon from "@/assets/dashboard/due.png";

const statusData = [
  { title: "Total Revenue", value: "7,795,800", icon: "revenue" },
  { title: "Total Expense", value: "6,653,061", icon: "expense" },
  { title: "Total Profit", value: "1,142,739", icon: "profit" },
  { title: "Total Due", value: "3,251,200", icon: "due" },
];

const icons = {
  revenue: (
    <div className="flex items-center justify-center w-20 h-20 rounded-full">
      <Image src={revenueIcon} alt="Revenue Icon" width={80} height={80} />
    </div>
  ),
  expense: (
    <div className="flex items-center justify-center w-20 h-20 rounded-full">
      <Image src={expenseIcon} alt="Expense Icon" width={80} height={80} />
    </div>
  ),
  profit: (
    <div className="flex items-center justify-center w-20 h-20 rounded-full">
      <Image src={profitIcon} alt="Profit Icon" width={80} height={80} />
    </div>
  ),
  due: (
    <div className="flex items-center justify-center w-20 h-20 rounded-full">
      <Image src={dueIcon} alt="Due Icon" width={80} height={80} />
    </div>
  ),
};

export default function StatusCards({ data = statusData }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((item, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent >
            <div className="flex items-center gap-4">
              {icons[item.icon]}
              <div>
                <div className="text-2xl font-bold text-gray-800">{item.value}</div>
                <p className="text-sm text-gray-500">{item.title}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
