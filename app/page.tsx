"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExpenseComparison from "./_components/ExpenseComparison";
import RecurringExpenses from "./_components/RecurringExpenses";
import OneTimeExpenses from "./_components/OneTimeExpenses";
import AddNewItem from "./_components/AddNewItem";
import ProjectionsChart from "./_components/ProjectionsChart";
import SavingsCalculator from "./_components/SavingsCalculator";
import { FinancialProvider } from "./contexts/FinancialContext";

const FinancialComparisonApp: React.FC = () => {
  return (
    <FinancialProvider>
      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Uganda vs Kenya Financial Comparison
        </h1>

        <Tabs defaultValue="comparison">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="projections">Projections</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
          </TabsList>
          <TabsContent value="comparison">
            <div className="space-y-8">
              <ExpenseComparison />
              <RecurringExpenses />
              <OneTimeExpenses />
              <AddNewItem />
            </div>
          </TabsContent>
          <TabsContent value="projections">
            <ProjectionsChart />
          </TabsContent>
          <TabsContent value="savings">
            <SavingsCalculator />
          </TabsContent>
        </Tabs>
      </div>
    </FinancialProvider>
  );
};

export default FinancialComparisonApp;
