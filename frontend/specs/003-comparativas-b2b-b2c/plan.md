# Plan mínimo: Comparativa B2B vs B2C

## Cambios en el backend
- No hacen falta cambios: `/api/metrics/categories/top` ya filtra por `operation_type`, `business_type` y fechas; `/api/metrics/summary` permite obtener ingresos por grupo y rango; `/api/metrics/facets` aporta las categorías candidatas globales.

## Cambios en frontend
- Añadir una vista de comparativa con selección desde la interfaz existente, sin incorporar un router nuevo.
- Consultar las categorías principales de ingreso y los resúmenes de B2B y B2C para el mismo rango; calcular el porcentaje de cada categoría sobre todos los ingresos de su grupo.
- Mostrar dos tablas paralelas y un gráfico único con los ingresos totales de ambos grupos; conservar estados de carga y error.

## Archivos afectados
- `frontend/src/App.tsx`
- `frontend/src/lib/financial-types.ts`
- `frontend/src/lib/financial-utils.ts`
- `frontend/src/lib/financial-utils.test.ts`
- Nuevo: `frontend/src/components/dashboard/b2b-b2c-comparison.tsx`

## Orden recomendado
1. Añadir los tipos y cálculos de totales y porcentajes por grupo.
2. Conectar las consultas existentes de categorías y resúmenes usando el mismo rango de fechas.
3. Añadir la vista de tablas y gráfico y conectarla a la navegación existente.
4. Verificar resultados con las pruebas actuales y los criterios de aceptación.

## Verificación básica
- Ejecutar `npm test`, `npm run lint` y `npm run build` desde `frontend`.
- Comprobar las dos tablas, categorías disponibles, totales, porcentajes y gráfico con y sin rango de fechas.

## Riesgo de romper funcionalidad existente
- La selección de vista y el filtro de fechas comparten el estado de `App.tsx`; un cambio podría alterar la navegación o el filtro del dashboard principal. Las rutas backend existentes no requieren cambios de contrato.
