import React, { createContext, useContext, useState, ReactNode } from "react";

interface Expense {
  id: string;
  name: string;
  amountUganda: number;
  amountKenya: number;
  frequency: "recurring" | "onetime";
}

interface FinancialData {
  expenses: Expense[];
  monthlyIncome: {
    uganda: number;
    kenya: number;
  };
  percentageGain: number;
  projectionYears: number;
}

interface FinancialContextType {
  financialData: FinancialData;
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  updateExpense: (id: string, updatedExpense: Partial<Expense>) => void;
  updateMonthlyIncome: (country: "uganda" | "kenya", amount: number) => void;
  updatePercentageGain: (percentage: number) => void;
  updateProjectionYears: (years: number) => void;
}

const FinancialContext = createContext<FinancialContextType | undefined>(
  undefined
);

export const useFinancialContext = () => {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error(
      "useFinancialContext must be used within a FinancialProvider"
    );
  }
  return context;
};

interface FinancialProviderProps {
  children: ReactNode;
}

export const FinancialProvider: React.FC<FinancialProviderProps> = ({
  children,
}) => {
  const [financialData, setFinancialData] = useState<FinancialData>({
    expenses: [
      {
        id: "1",
        name: "Housing",
        amountUganda: 45000,
        amountKenya: 110000,
        frequency: "recurring",
      },
      {
        id: "2",
        name: "Parents Food",
        amountUganda: 10000,
        amountKenya: 16000,
        frequency: "recurring",
      },
      {
        id: "3",
        name: "Pampers and Wipes",
        amountUganda: 10000,
        amountKenya: 20000,
        frequency: "recurring",
      },
      {
        id: "4",
        name: "WiFi",
        amountUganda: 4500,
        amountKenya: 3000,
        frequency: "recurring",
      },
      {
        id: "5",
        name: "Transport",
        amountUganda: 6000,
        amountKenya: 8000,
        frequency: "recurring",
      },
      {
        id: "6",
        name: "House Help",
        amountUganda: 12000,
        amountKenya: 12000,
        frequency: "recurring",
      },
      {
        id: "7",
        name: "Prenatal Services",
        amountUganda: 5000,
        amountKenya: 3000,
        frequency: "recurring",
      },
      {
        id: "8",
        name: "Child Birth",
        amountUganda: 140000,
        amountKenya: 300000,
        frequency: "onetime",
      },
    ],
    monthlyIncome: {
      uganda: 200000,
      kenya: 250000,
    },
    percentageGain: 5,
    projectionYears: 1,
  });

  const addExpense = (expense: Expense) => {
    setFinancialData((prevData) => ({
      ...prevData,
      expenses: [...prevData.expenses, expense],
    }));
  };

  const removeExpense = (id: string) => {
    setFinancialData((prevData) => ({
      ...prevData,
      expenses: prevData.expenses.filter((expense) => expense.id !== id),
    }));
  };

  const updateExpense = (id: string, updatedExpense: Partial<Expense>) => {
    setFinancialData((prevData) => ({
      ...prevData,
      expenses: prevData.expenses.map((expense) =>
        expense.id === id ? { ...expense, ...updatedExpense } : expense
      ),
    }));
  };

  const updateMonthlyIncome = (country: "uganda" | "kenya", amount: number) => {
    setFinancialData((prevData) => ({
      ...prevData,
      monthlyIncome: {
        ...prevData.monthlyIncome,
        [country]: amount,
      },
    }));
  };

  const updatePercentageGain = (percentage: number) => {
    setFinancialData((prevData) => ({
      ...prevData,
      percentageGain: percentage,
    }));
  };

  const updateProjectionYears = (years: number) => {
    setFinancialData((prevData) => ({
      ...prevData,
      projectionYears: years,
    }));
  };

  return (
    <FinancialContext.Provider
      value={{
        financialData,
        addExpense,
        removeExpense,
        updateExpense,
        updateMonthlyIncome,
        updatePercentageGain,
        updateProjectionYears,
      }}
    >
      {children}
    </FinancialContext.Provider>
  );
};
