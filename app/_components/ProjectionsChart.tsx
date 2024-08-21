import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFinancialContext } from "../contexts/FinancialContext";

const ProjectionsChart: React.FC = () => {
  const { financialData, updatePercentageGain, updateProjectionYears } =
    useFinancialContext();
  const { percentageGain, projectionYears, monthlyIncome, expenses } =
    financialData;

  const calculateMonthlyProjections = (
    country: "uganda" | "kenya"
  ): Array<{ month: number; savings: number }> => {
    const totalRecurring = expenses
      .filter((expense) => expense.frequency === "recurring")
      .reduce(
        (sum, expense) =>
          sum +
          expense[
            `amount${country.charAt(0).toUpperCase() + country.slice(1)}` as
              | "amountUganda"
              | "amountKenya"
          ],
        0
      );

    const income = monthlyIncome[country];
    const monthlySavings = income - totalRecurring;
    let projections = [];
    let cumulativeSavings = 0;

    for (let month = 1; month <= 12 * projectionYears; month++) {
      cumulativeSavings += monthlySavings;
      cumulativeSavings *= 1 + percentageGain / 100 / 12; // Monthly percentage gain
      projections.push({
        month,
        savings: cumulativeSavings,
      });
    }

    return projections;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Savings Projections</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Percentage Gain (%)</label>
            <Input
              type="number"
              value={percentageGain}
              onChange={(e) =>
                updatePercentageGain(parseFloat(e.target.value) || 0)
              }
            />
          </div>
          <div>
            <label className="block mb-2">Projection Years</label>
            <Input
              type="number"
              min="1"
              max="5"
              value={projectionYears}
              onChange={(e) =>
                updateProjectionYears(
                  Math.min(5, Math.max(1, parseInt(e.target.value) || 1))
                )
              }
            />
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart>
            <XAxis
              dataKey="month"
              type="number"
              domain={[1, 12 * projectionYears]}
              tickFormatter={(tick) =>
                `Year ${Math.floor((tick - 1) / 12) + 1}`
              }
            />
            <YAxis />
            <Tooltip
              labelFormatter={(label) =>
                `Month ${label} (Year ${Math.floor((label - 1) / 12) + 1})`
              }
            />
            <Legend />
            <Line
              data={calculateMonthlyProjections("uganda")}
              name="Uganda"
              dataKey="savings"
              stroke="#8884d8"
            />
            <Line
              data={calculateMonthlyProjections("kenya")}
              name="Kenya"
              dataKey="savings"
              stroke="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ProjectionsChart;
