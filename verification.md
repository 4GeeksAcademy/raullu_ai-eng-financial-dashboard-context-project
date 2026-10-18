# Verificacion del proyecto

| Afirmacion original | Archivos revisados | Resultado | Correccion |
|---|---|---|---|
| Compose define y publica los servicios de frontend y backend. | `docker-compose.yml` | Confirmado | No necesaria. |
| La pagina carga React y renderiza el dashboard desde `App`. | `frontend/index.html`, `frontend/src/main.tsx`, `frontend/src/App.tsx` | Confirmado | No necesaria. |
| El dashboard consulta `/api/metrics` y calcula KPI y agregados mensuales en el cliente. | `frontend/src/App.tsx`, `frontend/src/lib/financial-utils.ts` | Confirmado | No necesaria. |
| El backend genera movimientos simulados y define los endpoints de metricas. | `backend/app/routes.py` | Confirmado | No necesaria. |
| Vite reenvia las solicitudes `/api` al backend. | `frontend/vite.config.ts` | Confirmado | No necesaria. |
| El periodo mostrado coincide con las fechas de los datos. | `frontend/src/App.tsx`, `backend/app/routes.py` | Incorrecto | El texto esta fijado en `2024 - Full Year`; las fechas se generan con `date.today()`. Al 2026-10-16, los movimientos corresponden a octubre de 2025-septiembre de 2026. |

## Verificación del proyecto SPECS

### 1) Frontend

- `App.tsx` realiza una petición `fetch` a `GET /api/metrics` sin parámetros de consulta; después calcula los KPI y los agregados mensuales en el cliente. Mantiene estados de carga y error. ([frontend/src/App.tsx](frontend/src/App.tsx), [frontend/src/lib/financial-utils.ts](frontend/src/lib/financial-utils.ts))
- La interfaz actual no contiene controles de rango de fechas, tabla de alertas ni página comparativa B2B/B2C. El encabezado muestra el período fijo `2024 - Full Year`. ([frontend/src/App.tsx](frontend/src/App.tsx), [frontend/src/components/dashboard/dashboard-header.tsx](frontend/src/components/dashboard/dashboard-header.tsx))
- Los tipos TypeScript existentes describen movimientos, KPI y puntos mensuales; no definen tipos para alertas, facetas, categorías agregadas ni comparación por grupo. ([frontend/src/lib/financial-types.ts](frontend/src/lib/financial-types.ts))

### 2) Backend

- El endpoint `GET /api/metrics` admite `start_date` y `end_date` opcionales y filtra `create_date` con ambos extremos inclusivos. `GET /api/metrics/facets` devuelve `min_date` y `max_date` del conjunto generado. ([backend/app/routes.py](backend/app/routes.py))
- `GET /api/metrics/alerts` acepta `threshold` con valor predeterminado `0.3` y mínimo `0`, además de agrupación, fechas y tipo de negocio. La detección compara cada período con el promedio de todos los períodos anteriores disponibles; no limita la media a los tres anteriores. La prueba existente comprueba el formato general de la respuesta, no esa ventana móvil. ([backend/app/routes.py](backend/app/routes.py), [backend/tests/test_routes.py](backend/tests/test_routes.py))
- `GET /api/metrics/categories/top` admite tipo de operación, límite, fechas y tipo de negocio; devuelve categoría, tipo de operación y total, sin porcentaje. `GET /api/metrics/facets` devuelve una lista global de categorías, sin separación por B2B/B2C. ([backend/app/routes.py](backend/app/routes.py))
- Existen endpoints separados `/api/metrics/b2b` y `/api/metrics/b2c`, así como `/api/metrics/summary` con filtro para un único `business_type`. `/api/metrics/comparison` compara períodos temporales y devuelve métricas netas, no una comparación conjunta de ingresos B2B frente a B2C. ([backend/app/routes.py](backend/app/routes.py))

### 3) Comunicación frontend-backend

- Vite reenvía las solicitudes `/api` a `http://backend:8000`; la petición actual del frontend usa la ruta relativa `/api/metrics`. ([frontend/vite.config.ts](frontend/vite.config.ts), [frontend/src/App.tsx](frontend/src/App.tsx))
- El frontend no consume actualmente las rutas de facetas, alertas, categorías principales, resúmenes ni segmentos B2B/B2C. Las pruebas backend cubren filtros de métricas, facetas, categorías, alertas y comparación temporal. ([frontend/src/App.tsx](frontend/src/App.tsx), [backend/tests/test_routes.py](backend/tests/test_routes.py))

### 4) Desajustes entre el wording del PM y campos reales de la API

- El rango de fechas del PM se expresa como inicio/fin; los parámetros reales son `start_date` y `end_date`, y el campo de fecha del movimiento es `create_date`. ([backend/app/routes.py](backend/app/routes.py), [frontend/src/lib/financial-types.ts](frontend/src/lib/financial-types.ts))
- El gasto del PM corresponde al tipo de operación `outcome`; la respuesta de alertas usa `outcome_total`, `baseline_average` e `increase_ratio`. El requisito de media móvil de tres períodos no coincide con el promedio acumulado de todos los períodos previos que calcula el backend. ([backend/app/routes.py](backend/app/routes.py))
- El incremento porcentual del PM se representa en la API como `increase_ratio`, una razón numérica. El contrato no proporciona un campo porcentual separado. ([backend/app/routes.py](backend/app/routes.py))
- Para la comparativa, la API devuelve `total_amount` por categoría, pero no el porcentaje sobre el total del grupo; las facetas exponen `categories` globales y no las categorías por grupo. Los recursos B2B y B2C existentes devuelven movimientos o resúmenes separados, no una respuesta comparativa conjunta. ([backend/app/routes.py](backend/app/routes.py))