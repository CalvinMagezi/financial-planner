import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFinancialContext } from "../contexts/FinancialContext";

const RecurringExpenses: React.FC = () => {
  const { financialData, updateExpense, removeExpense } = useFinancialContext();

  const recurringExpenses = financialData.expenses.filter(
    (expense) => expense.frequency === "recurring"
  );
  const totalUganda = recurringExpenses.reduce(
    (total, expense) => total + expense.amountUganda,
    0
  );
  const totalKenya = recurringExpenses.reduce(
    (total, expense) => total + expense.amountKenya,
    0
  );

  const handleDataChange = (
    id: string,
    country: "uganda" | "kenya",
    value: string
  ) => {
    const numValue = parseFloat(value);
    if (country === "uganda") {
      updateExpense(id, { amountUganda: numValue });
    } else {
      updateExpense(id, { amountKenya: numValue });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recurring Expenses Comparison (in KES)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Category</TableHead>
              <TableHead className="text-center">Uganda</TableHead>
              <TableHead className="text-center">Kenya</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recurringExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium text-center">
                  {expense.name.replace("_", " ").charAt(0).toUpperCase() +
                    expense.name.replace("_", " ").slice(1)}
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    type="number"
                    value={expense.amountUganda}
                    onChange={(e) =>
                      handleDataChange(expense.id, "uganda", e.target.value)
                    }
                    className="w-24 text-center mx-auto"
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    type="number"
                    value={expense.amountKenya}
                    onChange={(e) =>
                      handleDataChange(expense.id, "kenya", e.target.value)
                    }
                    className="w-24 text-center mx-auto"
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    onClick={() => removeExpense(expense.id)}
                    variant="destructive"
                    size="sm"
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="font-bold">
              <TableCell className="text-center">Total</TableCell>
              <TableCell className="text-center">
                {totalUganda.toLocaleString()}
              </TableCell>
              <TableCell className="text-center">
                {totalKenya.toLocaleString()}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecurringExpenses;
