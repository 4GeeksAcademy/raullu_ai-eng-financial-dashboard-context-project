import {
  type FinancialMovement,
  type BusinessIncomeComparison,
  type BusinessType,
  type DashboardUrlState,
  type KPIMetrics,
  type MetricsSummaryItem,
  type MonthlyDataPoint,
  type TopCategoryItem,
} from "./financial-types";

const DEFAULT_ALERT_THRESHOLD = 0.3;

export function readDashboardUrlState(search: string): DashboardUrlState {
  const params = new URLSearchParams(search);
  const threshold = Number(params.get("threshold"));

  return {
    view: params.get("view") === "comparison" ? "comparison" : "dashboard",
    startDate: params.get("start_date") ?? "",
    endDate: params.get("end_date") ?? "",
    alertThreshold:
      Number.isFinite(threshold) && threshold >= 0.01 && threshold <= 1
        ? threshold
        : DEFAULT_ALERT_THRESHOLD,
  };
}

export function writeDashboardUrlState(
  search: string,
  state: DashboardUrlState,
): string {
  const params = new URLSearchParams(search);

  if (state.view === "dashboard") params.delete("view");
  else params.set("view", state.view);

  if (state.startDate) params.set("start_date", state.startDate);
  else params.delete("start_date");

  if (state.endDate) params.set("end_date", state.endDate);
  else params.delete("end_date");

  if (state.alertThreshold === DEFAULT_ALERT_THRESHOLD) params.delete("threshold");
  else params.set("threshold", String(state.alertThreshold));

  return params.toString();
}

function toYearMonthKey(value: Date): string {
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}`;
}

function formatMonthYearLabel(yearMonthKey: string): string {
  const [yearText, monthText] = yearMonthKey.split("-");
  const year = Number(yearText);
  const month = Number(monthText) - 1;
  return new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function computeKPIs(movements: FinancialMovement[]): KPIMetrics {
  let totalIncome = 0;
  let totalOutcome = 0;

  for (const movement of movements) {
    if (movement.operation_type === "income") {
      totalIncome += movement.amount;
    } else {
      totalOutcome += movement.amount;
    }
  }

  const profit = totalIncome - totalOutcome;
  const profitPercent = totalIncome > 0 ? (profit / totalIncome) * 100 : 0;

  return { totalIncome, totalOutcome, profit, profitPercent };
}

export function computeBusinessIncomeComparison(
  businessType: BusinessType,
  topCategories: TopCategoryItem[],
  summaries: MetricsSummaryItem[],
): BusinessIncomeComparison {
  const totalIncome = summaries.reduce((sum, item) => sum + item.income, 0);
  const categories = topCategories
    .filter((item) => item.operation_type === "income")
    .map((item) => ({
      category: item.category,
      totalIncome: item.total_amount,
      percentageOfGroup:
        totalIncome > 0 ? (item.total_amount / totalIncome) * 100 : 0,
    }));

  return { businessType, totalIncome, categories };
}

export function computeMonthlyData(
  movements: FinancialMovement[],
): MonthlyDataPoint[] {
  const monthlyMap: Record<string, { income: number; outcome: number }> = {};

  for (const m of movements) {
    const yearMonthKey = toYearMonthKey(new Date(m.create_date));
    if (!monthlyMap[yearMonthKey]) {
      monthlyMap[yearMonthKey] = { income: 0, outcome: 0 };
    }

    if (m.operation_type === "income") {
      monthlyMap[yearMonthKey].income += m.amount;
    } else {
      monthlyMap[yearMonthKey].outcome += m.amount;
    }
  }

  return Object.keys(monthlyMap)
    .sort()
    .map((yearMonthKey) => {
      const { income, outcome } = monthlyMap[yearMonthKey];
      const profit = income - outcome;
      const profitPercent = income > 0 ? (profit / income) * 100 : 0;
      return {
        month: formatMonthYearLabel(yearMonthKey),
        income,
        outcome,
        profitPercent,
      };
    });
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}
