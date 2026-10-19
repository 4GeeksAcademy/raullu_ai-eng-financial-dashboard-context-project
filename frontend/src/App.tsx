import { lazy, Suspense, useEffect, useState, type KeyboardEvent } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { AlertsTable } from "@/components/dashboard/alerts-table";
import { KPIRow } from "@/components/dashboard/kpi-row";
import { IncomeOutcomeChart } from "@/components/dashboard/income-outcome-chart";
import { ProfitPercentChart } from "@/components/dashboard/profit-percent-chart";
import {
  type BusinessIncomeComparison,
  type FinancialMovement,
  type KPIMetrics,
  type MetricsAlert,
  type MetricsFacets,
  type MonthlyDataPoint,
} from "@/lib/financial-types";
import { computeKPIs, computeMonthlyData } from "@/lib/financial-utils";
import { fetchBusinessIncomeComparisons } from "@/lib/comparison-api";

const B2BvsB2CComparison = lazy(() =>
  import("@/components/dashboard/b2b-b2c-comparison").then((module) => ({
    default: module.B2BvsB2CComparison,
  })),
);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

async function fetchFinancialData(
  startDate: string,
  endDate: string,
  signal?: AbortSignal,
): Promise<FinancialMovement[]> {
  const query = new URLSearchParams();
  if (startDate) query.set("start_date", startDate);
  if (endDate) query.set("end_date", endDate);
  const queryString = query.toString();
  const url = `${API_BASE_URL}/api/metrics${queryString ? `?${queryString}` : ""}`;
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch financial data: ${response.status}`);
  }
  return response.json();
}

async function fetchFinancialFacets(): Promise<MetricsFacets> {
  const response = await fetch(`${API_BASE_URL}/api/metrics/facets`);
  if (!response.ok) {
    throw new Error(`Failed to fetch financial facets: ${response.status}`);
  }
  return response.json();
}

async function fetchFinancialAlerts(
  threshold: number,
  startDate: string,
  endDate: string,
  signal?: AbortSignal,
): Promise<MetricsAlert[]> {
  const query = new URLSearchParams({ threshold: String(threshold) });
  if (startDate) query.set("start_date", startDate);
  if (endDate) query.set("end_date", endDate);
  const response = await fetch(`${API_BASE_URL}/api/metrics/alerts?${query}`, {
    signal,
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch financial alerts: ${response.status}`);
  }
  return response.json();
}

function App() {
  const [activeView, setActiveView] = useState<"dashboard" | "comparison">(
    "dashboard",
  );
  const [metrics, setMetrics] = useState<KPIMetrics | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyDataPoint[]>([]);
  const [facets, setFacets] = useState<MetricsFacets | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [alertThreshold, setAlertThreshold] = useState(0.3);
  const [alerts, setAlerts] = useState<MetricsAlert[]>([]);
  const [alertsLoading, setAlertsLoading] = useState(true);
  const [alertsError, setAlertsError] = useState<string | null>(null);
  const [comparisons, setComparisons] = useState<BusinessIncomeComparison[]>([]);
  const [comparisonLoading, setComparisonLoading] = useState(false);
  const [comparisonError, setComparisonError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleStartDateChange = (value: string) => {
    setLoading(true);
    setError(null);
    setAlertsLoading(true);
    setAlertsError(null);
    setComparisonLoading(true);
    setComparisonError(null);
    setStartDate(value);
  };

  const handleEndDateChange = (value: string) => {
    setLoading(true);
    setError(null);
    setAlertsLoading(true);
    setAlertsError(null);
    setComparisonLoading(true);
    setComparisonError(null);
    setEndDate(value);
  };

  const handleViewChange = (view: "dashboard" | "comparison") => {
    if (view === "comparison") {
      setComparisonLoading(true);
      setComparisonError(null);
    }
    setActiveView(view);
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentView: "dashboard" | "comparison",
  ) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const nextView =
      event.key === "Home"
        ? "dashboard"
        : event.key === "End"
          ? "comparison"
          : currentView === "dashboard"
            ? "comparison"
            : "dashboard";
    handleViewChange(nextView);
    document.getElementById(`${nextView}-tab`)?.focus();
  };

  const handleAlertThresholdChange = (value: number) => {
    setAlertsLoading(true);
    setAlertsError(null);
    setAlertThreshold(value);
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchFinancialData(startDate, endDate, controller.signal)
      .then((movements) => {
        setMetrics(computeKPIs(movements));
        setMonthlyData(computeMonthlyData(movements));
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setError(
            "No se pudo cargar la informacion financiera. Revisa la API de backend.",
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [startDate, endDate]);

  useEffect(() => {
    fetchFinancialFacets()
      .then(setFacets)
      .catch(() => {
        setError(
          "No se pudo cargar la informacion financiera. Revisa la API de backend.",
        );
      });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchFinancialAlerts(
      alertThreshold,
      startDate,
      endDate,
      controller.signal,
    )
      .then(setAlerts)
      .catch(() => {
        if (!controller.signal.aborted) {
          setAlertsError("No se pudieron cargar las alertas del backend.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setAlertsLoading(false);
        }
      });

    return () => controller.abort();
  }, [alertThreshold, startDate, endDate]);

  useEffect(() => {
    if (activeView !== "comparison") return;

    const controller = new AbortController();
    fetchBusinessIncomeComparisons(
      startDate,
      endDate,
      controller.signal,
    )
      .then(setComparisons)
      .catch(() => {
        if (!controller.signal.aborted) {
          setComparisonError("No se pudo cargar la comparativa de ingresos.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setComparisonLoading(false);
        }
      });

    return () => controller.abort();
  }, [activeView, startDate, endDate]);

  const visibleComparisons = facets
    ? comparisons.map((comparison) => ({
        ...comparison,
        categories: comparison.categories.filter((item) =>
          facets.categories.includes(item.category),
        ),
      }))
    : [];

  return (
    <main className="dark min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <DashboardHeader
            period="2024 - Full Year"
            startDate={startDate}
            endDate={endDate}
            minDate={facets?.min_date ?? null}
            maxDate={facets?.max_date ?? null}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
          />

          <div
            role="tablist"
            aria-label="Dashboard views"
            className="flex gap-1 border-b border-border"
          >
            <button
              type="button"
              role="tab"
              id="dashboard-tab"
              aria-controls="dashboard-panel"
              aria-selected={activeView === "dashboard"}
              tabIndex={activeView === "dashboard" ? 0 : -1}
              onKeyDown={(event) => handleTabKeyDown(event, "dashboard")}
              className={`border-b-2 px-3 py-2 text-sm font-medium ${activeView === "dashboard" ? "border-primary text-foreground" : "border-transparent text-muted-foreground"}`}
              onClick={() => handleViewChange("dashboard")}
            >
              Dashboard
            </button>
            <button
              type="button"
              role="tab"
              id="comparison-tab"
              aria-controls="comparison-panel"
              aria-selected={activeView === "comparison"}
              tabIndex={activeView === "comparison" ? 0 : -1}
              onKeyDown={(event) => handleTabKeyDown(event, "comparison")}
              className={`border-b-2 px-3 py-2 text-sm font-medium ${activeView === "comparison" ? "border-primary text-foreground" : "border-transparent text-muted-foreground"}`}
              onClick={() => handleViewChange("comparison")}
            >
              <span lang="es">Comparativa B2B vs B2C</span>
            </button>
          </div>

          <p role="status" aria-live="polite" className="sr-only">
            {loading ? "Loading financial data..." : ""}
          </p>

          {error ? (
            <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive-foreground">
              <span lang="es">{error}</span>
            </div>
          ) : null}

          {activeView === "dashboard" ? (
            <div role="tabpanel" id="dashboard-panel" aria-labelledby="dashboard-tab" tabIndex={0}>
              <div className="flex flex-col gap-8">
                <section aria-label="Key performance indicators" aria-busy={loading}>
                  <KPIRow metrics={metrics} loading={loading} />
                </section>

                <section
                  aria-label="Financial charts"
                  aria-busy={loading}
                  className="grid grid-cols-1 gap-4 xl:grid-cols-2"
                >
                  <IncomeOutcomeChart data={monthlyData} loading={loading} />
                  <ProfitPercentChart data={monthlyData} loading={loading} />
                </section>

                <AlertsTable
                  alerts={alerts}
                  threshold={alertThreshold}
                  onThresholdChange={handleAlertThresholdChange}
                  loading={alertsLoading}
                  error={alertsError}
                />
              </div>
            </div>
          ) : (
            <section role="tabpanel" id="comparison-panel" aria-labelledby="comparison-tab" tabIndex={0}>
              <Suspense
                fallback={
                  <p role="status" className="py-10 text-center text-sm text-muted-foreground">
                    Loading comparison...
                  </p>
                }
              >
                <B2BvsB2CComparison
                  comparisons={visibleComparisons}
                  loading={comparisonLoading || !facets}
                  error={comparisonError}
                />
              </Suspense>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
