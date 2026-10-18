import { LayoutDashboard } from 'lucide-react'

interface DashboardHeaderProps {
  period?: string
  startDate: string
  endDate: string
  minDate: string | null
  maxDate: string | null
  onStartDateChange: (value: string) => void
  onEndDateChange: (value: string) => void
}

export function DashboardHeader({
  period = '2024 — Full Year',
  startDate,
  endDate,
  minDate,
  maxDate,
  onStartDateChange,
  onEndDateChange,
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <LayoutDashboard size={18} />
        </span>
        <div>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Financial Overview</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Executive metrics dashboard</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          {period}
        </span>
      </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-xs text-muted-foreground">
            <span>Fecha de inicio</span>
            <input
              type="date"
              value={startDate}
              onChange={(event) => onStartDateChange(event.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-muted-foreground">
            <span>Fecha de fin</span>
            <input
              type="date"
              value={endDate}
              onChange={(event) => onEndDateChange(event.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
            />
          </label>
        </div>
        {minDate && maxDate ? (
          <p className="text-xs text-muted-foreground">
            Disponible: {minDate} - {maxDate}
          </p>
        ) : null}
      </div>
    </header>
  )
}
