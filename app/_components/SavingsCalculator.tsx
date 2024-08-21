import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFinancialContext } from "../contexts/FinancialContext";

const SavingsCalculator: React.FC = () => {
  const { financialData, updateMonthlyIncome } = useFinancialContext();
  const { monthlyIncome, expenses } = financialData;

  const totalRecurring = {
    uganda: expenses
      .filter((expense) => expense.frequency === "recurring")
      .reduce((sum, expense) => sum + expense.amountUganda, 0),
    kenya: expenses
      .filter((expense) => expense.frequency === "recurring")
      .reduce((sum, expense) => sum + expense.amountKenya, 0),
  };

  const data = [
    {
      category: "Income",
      Uganda: monthlyIncome.uganda,
      Kenya: monthlyIncome.kenya,
    },
    {
      category: "Recurring Expenses",
      Uganda: totalRecurring.uganda,
      Kenya: totalRecurring.kenya,
    },
    {
      category: "Monthly Savings",
      Uganda: monthlyIncome.uganda - totalRecurring.uganda,
      Kenya: monthlyIncome.kenya - totalRecurring.kenya,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Uganda Monthly Income</label>
            <Input
              type="number"
              value={monthlyIncome.uganda}
              onChange={(e) =>
                updateMonthlyIncome("uganda", parseFloat(e.target.value) || 0)
              }
            />
          </div>
          <div>
            <label className="block mb-2">Kenya Monthly Income</label>
            <Input
              type="number"
              value={monthlyIncome.kenya}
              onChange={(e) =>
                updateMonthlyIncome("kenya", parseFloat(e.target.value) || 0)
              }
            />
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Uganda" fill="#8884d8" />
            <Bar dataKey="Kenya" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SavingsCalculator;
