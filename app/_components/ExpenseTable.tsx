import React from "react";
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

interface Expense {
  id: string;
  name: string;
  amountUganda: number;
  amountKenya: number;
  frequency: "recurring" | "onetime";
}

interface ExpenseTableProps {
  expenses: Expense[];
  totalUganda: number;
  totalKenya: number;
  handleDataChange: (id: string, field: string, value: string) => void;
  handleRemoveItem: (id: string) => void;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  totalUganda,
  totalKenya,
  handleDataChange,
  handleRemoveItem,
}) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="text-center">Category</TableHead>
        <TableHead className="text-center">Amount (UGX)</TableHead>
        <TableHead className="text-center">Amount (KES)</TableHead>
        <TableHead className="text-center">Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {expenses.map((expense) => (
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
                handleDataChange(expense.id, "amountUganda", e.target.value)
              }
              className="w-24 text-center mx-auto"
            />
          </TableCell>
          <TableCell className="text-center">
            <Input
              type="number"
              value={expense.amountKenya}
              onChange={(e) =>
                handleDataChange(expense.id, "amountKenya", e.target.value)
              }
              className="w-24 text-center mx-auto"
            />
          </TableCell>
          <TableCell className="text-center">
            <Button
              onClick={() => handleRemoveItem(expense.id)}
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
);

export default ExpenseTable;
