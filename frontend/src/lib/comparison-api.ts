import type {
  BusinessIncomeComparison,
  BusinessType,
  Category,
  MetricsSummaryItem,
  TopCategoryItem,
} from "./financial-types";
import { computeBusinessIncomeComparison } from "./financial-utils";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch comparison data: ${response.status}`);
  }
  return response.json();
}

function addDateRange(query: URLSearchParams, startDate: string, endDate: string) {
  if (startDate) query.set("start_date", startDate);
  if (endDate) query.set("end_date", endDate);
}

async function fetchBusinessComparison(
  businessType: BusinessType,
  startDate: string,
  endDate: string,
  availableCategories: Category[],
  signal?: AbortSignal,
): Promise<BusinessIncomeComparison> {
  const categoryQuery = new URLSearchParams({
    operation_type: "income",
    limit: "5",
    business_type: businessType,
  });
  const summaryQuery = new URLSearchParams({
    group_by: "month",
    business_type: businessType,
  });
  addDateRange(categoryQuery, startDate, endDate);
  addDateRange(summaryQuery, startDate, endDate);

  const [topCategories, summaries] = await Promise.all([
    fetchJson<TopCategoryItem[]>(
      `${API_BASE_URL}/api/metrics/categories/top?${categoryQuery}`,
      signal,
    ),
    fetchJson<MetricsSummaryItem[]>(
      `${API_BASE_URL}/api/metrics/summary?${summaryQuery}`,
      signal,
    ),
  ]);

  const facetCategories = new Set(availableCategories);
  return computeBusinessIncomeComparison(
    businessType,
    topCategories.filter((item) => facetCategories.has(item.category)),
    summaries,
  );
}

export function fetchBusinessIncomeComparisons(
  startDate: string,
  endDate: string,
  availableCategories: Category[],
  signal?: AbortSignal,
): Promise<BusinessIncomeComparison[]> {
  return Promise.all(
    (["B2B", "B2C"] as const).map((businessType) =>
      fetchBusinessComparison(
        businessType,
        startDate,
        endDate,
        availableCategories,
        signal,
      ),
    ),
  );
}
