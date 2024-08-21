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
import { useFinancialContext } from "../contexts/FinancialContext";

const ExpenseComparison: React.FC = () => {
  const { financialData } = useFinancialContext();

  const data = financialData.expenses.map((expense) => ({
    category: expense.name,
    Uganda:
      expense.amountUganda * (expense.frequency === "recurring" ? 1 : 1 / 12),
    Kenya:
      expense.amountKenya * (expense.frequency === "recurring" ? 1 : 1 / 12),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Comparison</CardTitle>
      </CardHeader>
      <CardContent>
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

export default ExpenseComparison;
