import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFinancialContext } from "../contexts/FinancialContext";

const AddNewItem: React.FC = () => {
  const { addExpense } = useFinancialContext();
  const [newItemName, setNewItemName] = useState("");
  const [newItemAmountUganda, setNewItemAmountUganda] = useState("");
  const [newItemAmountKenya, setNewItemAmountKenya] = useState("");
  const [newItemType, setNewItemType] = useState<"recurring" | "onetime">(
    "recurring"
  );

  const handleAddItem = () => {
    if (newItemName && newItemAmountUganda && newItemAmountKenya) {
      addExpense({
        id: Date.now().toString(),
        name: newItemName,
        amountUganda: parseFloat(newItemAmountUganda),
        amountKenya: parseFloat(newItemAmountKenya),
        frequency: newItemType,
      });
      setNewItemName("");
      setNewItemAmountUganda("");
      setNewItemAmountKenya("");
      setNewItemType("recurring");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Item</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Input
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Item name"
          />
          <Input
            type="number"
            value={newItemAmountUganda}
            onChange={(e) => setNewItemAmountUganda(e.target.value)}
            placeholder="Amount Uganda (UGX)"
          />
          <Input
            type="number"
            value={newItemAmountKenya}
            onChange={(e) => setNewItemAmountKenya(e.target.value)}
            placeholder="Amount Kenya (KES)"
          />
          <Select
            value={newItemType}
            onValueChange={(value: "recurring" | "onetime") =>
              setNewItemType(value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recurring">Recurring</SelectItem>
              <SelectItem value="onetime">One-time</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddItem}>Add Item</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddNewItem;
