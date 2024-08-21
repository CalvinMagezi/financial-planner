import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExpenseTable from "./ExpenseTable";
import { useFinancialContext } from "../contexts/FinancialContext";

const OneTimeExpenses: React.FC = () => {
  const { financialData, updateExpense, removeExpense } = useFinancialContext();

  const oneTimeExpenses = financialData.expenses.filter(
    (expense) => expense.frequency === "onetime"
  );
  const totalOneTimeUganda = oneTimeExpenses.reduce(
    (total, expense) => total + expense.amountUganda,
    0
  );
  const totalOneTimeKenya = oneTimeExpenses.reduce(
    (total, expense) => total + expense.amountKenya,
    0
  );

  const handleDataChange = (id: string, field: string, value: string) => {
    if (field === "uganda" || field === "kenya") {
      updateExpense(id, {
        [`amount${field.charAt(0).toUpperCase() + field.slice(1)}`]:
          parseFloat(value),
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>One-Time Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ExpenseTable
          expenses={oneTimeExpenses}
          totalUganda={totalOneTimeUganda}
          totalKenya={totalOneTimeKenya}
          handleDataChange={handleDataChange}
          handleRemoveItem={removeExpense}
        />
      </CardContent>
    </Card>
  );
};

export default OneTimeExpenses;
