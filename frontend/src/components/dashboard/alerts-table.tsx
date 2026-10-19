import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MetricsAlert } from "@/lib/financial-types";
import { formatCurrency, formatPercent } from "@/lib/financial-utils";

interface AlertsTableProps {
  alerts: MetricsAlert[];
  threshold: number;
  onThresholdChange: (value: number) => void;
  loading: boolean;
  error: string | null;
}

export function AlertsTable({
  alerts,
  threshold,
  onThresholdChange,
  loading,
  error,
}: AlertsTableProps) {
  return (
    <Card className="border-border/60">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-base font-semibold">Expense alerts</CardTitle>
          <label
            htmlFor="alert-threshold"
            className="flex flex-col gap-1 text-xs text-muted-foreground"
          >
            <span>Alert threshold</span>
            <input
              id="alert-threshold"
              type="number"
              min={0.01}
              max={1}
              step="any"
              value={threshold}
              onChange={(event) => {
                const value = event.currentTarget.valueAsNumber;
                if (Number.isFinite(value) && value >= 0.01 && value <= 1) {
                  onThresholdChange(value);
                }
              }}
              className="w-32 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
            />
          </label>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {loading ? (
          <p role="status" className="py-6 text-center text-sm text-muted-foreground">
            Loading alerts...
          </p>
        ) : error ? (
          <p role="alert" className="py-6 text-center text-sm text-destructive">
            <span lang="es">{error}</span>
          </p>
        ) : alerts.length === 0 ? (
          <p role="status" className="py-6 text-center text-sm text-muted-foreground">
            No anomalies found for this threshold.
          </p>
        ) : (
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th scope="col" className="px-4 py-3 font-medium">Period</th>
                <th scope="col" className="px-4 py-3 text-right font-medium">
                  Recorded outcome
                </th>
                <th scope="col" className="px-4 py-3 text-right font-medium">
                  Average of previous 3 periods
                </th>
                <th scope="col" className="px-4 py-3 text-right font-medium">
                  Increase
                </th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr key={alert.period} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">
                    {alert.period}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatCurrency(alert.outcome_total)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatCurrency(alert.baseline_average)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatPercent(alert.increase_ratio * 100)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}
