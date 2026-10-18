import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { BusinessIncomeComparison } from "@/lib/financial-types";
import { formatCurrency, formatPercent } from "@/lib/financial-utils";

interface B2BvsB2CComparisonProps {
  comparisons: BusinessIncomeComparison[];
  loading: boolean;
  error: string | null;
}

export function B2BvsB2CComparison({
  comparisons,
  loading,
  error,
}: B2BvsB2CComparisonProps) {
  if (loading) {
    return (
      <p role="status" className="py-10 text-center text-sm text-muted-foreground">
        Loading comparison...
      </p>
    );
  }

  if (error) {
    return (
      <p role="alert" className="py-10 text-center text-sm text-destructive">
        {error}
      </p>
    );
  }

  const chartData = comparisons.map((comparison) => ({
    businessType: comparison.businessType,
    totalIncome: comparison.totalIncome,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {comparisons.map((comparison) => (
          <Card key={comparison.businessType} className="border-border/60">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">
                {comparison.businessType}
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th scope="col" className="px-4 py-3 font-medium">
                      Category
                    </th>
                    <th scope="col" className="px-4 py-3 text-right font-medium">
                      Total income
                    </th>
                    <th scope="col" className="px-4 py-3 text-right font-medium">
                      Group share
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.categories.map((item) => (
                    <tr
                      key={item.category}
                      className="border-b border-border/60 last:border-0"
                    >
                      <td className="px-4 py-3 font-medium text-foreground">
                        {item.category}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums">
                        {formatCurrency(item.totalIncome)}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums">
                        {formatPercent(item.percentageOfGroup)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/60">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">
            Total income by business line
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ top: 8, right: 12, left: 8, bottom: 8 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
                strokeOpacity={0.6}
              />
              <XAxis dataKey="businessType" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Bar
                dataKey="totalIncome"
                name="Total income"
                fill="var(--chart-income)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
