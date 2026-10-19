# Estado del proyecto

Este documento separa comportamientos y limitaciones comprobados de los pasos sugeridos. Las verificaciones ejecutadas se registran con sus resultados; no se asume que otras pruebas hayan sido ejecutadas.

## Qué funciona

- El frontend consulta `GET /api/metrics` con fechas opcionales y `GET /api/metrics/facets` para mostrar el rango disponible. Calcula KPI y agregados mensuales desde los movimientos filtrados y conserva estados de carga y error. ([frontend/src/App.tsx](../frontend/src/App.tsx), [frontend/src/lib/financial-types.ts](../frontend/src/lib/financial-types.ts), [frontend/src/lib/financial-utils.ts](../frontend/src/lib/financial-utils.ts), [frontend/src/components/dashboard/dashboard-header.tsx](../frontend/src/components/dashboard/dashboard-header.tsx))
- El dashboard consulta `GET /api/metrics/alerts` con umbral y fechas activos y muestra la tabla de anomalías, estados de carga/error y el estado vacío. El cálculo mensual usa los tres meses calendario anteriores contiguos dentro del rango. ([frontend/src/App.tsx](../frontend/src/App.tsx), [frontend/src/components/dashboard/alerts-table.tsx](../frontend/src/components/dashboard/alerts-table.tsx), [backend/app/routes.py](../backend/app/routes.py))
- El frontend incorpora una vista de comparación B2B/B2C que obtiene categorías principales y resúmenes por segmento para el mismo rango, y muestra tablas y un gráfico de ingresos totales. ([frontend/src/App.tsx](../frontend/src/App.tsx), [frontend/src/lib/comparison-api.ts](../frontend/src/lib/comparison-api.ts), [frontend/src/components/dashboard/b2b-b2c-comparison.tsx](../frontend/src/components/dashboard/b2b-b2c-comparison.tsx), [frontend/src/lib/financial-utils.ts](../frontend/src/lib/financial-utils.ts))
- Las utilidades financieras tienen pruebas para totales, porcentajes, agregaciones mensuales y orden cronológico. ([frontend/src/lib/financial-utils.test.ts](../frontend/src/lib/financial-utils.test.ts))
- FastAPI define modelos de respuesta y endpoints para movimientos, facetas, resúmenes, categorías principales, comparaciones, alertas y segmentos B2B/B2C. Los helpers comunes aplican filtros y orden cronológico. ([backend/app/routes.py](../backend/app/routes.py))
- Las pruebas backend cubren generación, filtros, orden y respuestas de varios endpoints. ([backend/tests/test_routes.py](../backend/tests/test_routes.py))
- Docker Compose define frontend y backend; Vite reenvía `/api` al backend en desarrollo. ([docker-compose.yml](../docker-compose.yml), [frontend/vite.config.ts](../frontend/vite.config.ts))

## Limitaciones actuales

- La API genera movimientos simulados; el flujo revisado no muestra una conexión con una fuente financiera real ni persistencia. ([backend/app/routes.py](../backend/app/routes.py))
- El filtro de fechas, las alertas y la comparativa B2B/B2C están disponibles en el dashboard; otros endpoints secundarios aún no se presentan como controles de esa interfaz. ([frontend/src/App.tsx](../frontend/src/App.tsx), [backend/app/routes.py](../backend/app/routes.py))
- El encabezado todavía muestra el período fijo `2024 - Full Year`, incluso cuando se selecciona otro rango. ([frontend/src/App.tsx](../frontend/src/App.tsx))
- El encabezado fija `2024 - Full Year`, pero las fechas generadas dependen de la fecha actual y cubren doce meses completos relativos a ella. ([frontend/src/App.tsx](../frontend/src/App.tsx), [backend/app/routes.py](../backend/app/routes.py))
- La agregación frontend convierte fechas sin hora con `new Date(...)` y getters locales; en algunas zonas horarias puede asignar una fecha al mes equivocado. Las pruebas actuales no cubren el primer día del mes. ([frontend/src/lib/financial-utils.ts](../frontend/src/lib/financial-utils.ts), [frontend/src/lib/financial-utils.test.ts](../frontend/src/lib/financial-utils.test.ts))
- `generate_mock_movements` llama a `random.seed(seed)`, que modifica el estado aleatorio global. ([backend/app/routes.py](../backend/app/routes.py))
- `build_metrics_facets` accede al primer y último elemento de la lista ordenada sin manejar el caso de una lista vacía. El endpoint actual la llama con datos generados, pero la función no admite entradas vacías. ([backend/app/routes.py](../backend/app/routes.py))
- CORS permite cualquier origen, método y encabezado, además de credenciales; el alcance necesario no queda restringido en la configuración actual. ([backend/app/main.py](../backend/app/main.py))
- Los README mencionan `frontend/.env.example`, pero el archivo no existe en el repositorio. ([README.md](../README.md), [README.es.md](../README.es.md))

## Próximos pasos sugeridos

Estas son propuestas derivadas del código; no implican decisiones de producto ni cambios ya realizados.

1. Corregir la etiqueta del período o derivarla de las fechas efectivamente presentadas.
2. Tratar `create_date` como fecha de calendario sin conversión dependiente de zona horaria y añadir pruebas para límites de mes y año.
3. Usar un generador aleatorio local para conservar reproducibilidad sin alterar el estado global.
4. Definir y probar el comportamiento de `build_metrics_facets` cuando recibe una lista vacía.
5. Restringir CORS a los orígenes necesarios antes de un despliegue.
6. Decidir si los endpoints secundarios deben integrarse en la interfaz o documentarse como capacidades solo de API.
7. Corregir la referencia a `frontend/.env.example` o añadir ese archivo.
8. Ejecutar las verificaciones disponibles: `npm run lint`, `npm test` y `npm run build` desde `frontend`; `pytest` desde `backend`; y, si se requiere comprobar el conjunto, `docker compose up --build`. Los comandos están descritos en [AGENTS.md](../AGENTS.md) y sus scripts frontend en [frontend/package.json](../frontend/package.json).

## Verificaciones de la implementación de alertas

- `docker compose exec backend pytest -q`: 19 pruebas pasaron; apareció una advertencia deprecada de Starlette/httpx.
- Las pruebas de alertas cubren la ventana de tres meses, continuidad mensual, límites/default del umbral y el rango de fechas activo.
- `docker compose exec frontend npm test`: 5 pruebas pasaron.
- `docker compose exec frontend npm run lint`: pasó.
- `docker compose exec frontend npm run build`: pasó; Vite emitió una advertencia por tamaño de bundle superior a 500 kB.
- Los criterios se revisaron contra código y pruebas; no se ejecutó una prueba E2E visual del dashboard.

## Verificaciones de la implementación de comparativa B2B/B2C

- `docker compose exec frontend npm test`: 7 pruebas pasaron.
- `docker compose exec frontend npm run lint`: pasó.
- `docker compose exec frontend npm run build`: pasó; Vite emitió una advertencia por tamaño de bundle superior a 500 kB.
- Una comprobación con `TestClient` confirmó respuestas correctas de categorías principales y resúmenes para B2B y B2C, usando el mismo rango, con categorías presentes en facetas y totales que cubren las categorías top.
- Los criterios se revisaron contra el código y las respuestas de API; no se ejecutó una prueba E2E visual del dashboard.

## Verificaciones de la implementación del filtro de fechas

- `docker compose exec backend pytest -q`: 15 pruebas pasaron.
- `docker compose exec backend pytest -q tests/test_routes.py::test_metrics_endpoint_respects_date_filters`: 1 prueba pasó; apareció una advertencia deprecada de Starlette/httpx.
- `docker compose exec frontend npm test`: 5 pruebas pasaron.
- `docker compose exec frontend npm run lint`: pasó.
- `docker compose exec frontend npm run build`: pasó; Vite emitió una advertencia por tamaño de bundle superior a 500 kB.
- Los criterios se revisaron contra el flujo de frontend y la prueba backend; no se ejecutó una prueba E2E visual del dashboard.

## Verificación de mejoras React

- La vista de comparación se carga bajo demanda; las consultas de comparación comienzan sin esperar a las facetas y las categorías se filtran al presentar resultados para conservar el requisito de la spec.
- La consulta principal de métricas cancela solicitudes obsoletas al cambiar el rango, y `computeKPIs` suma ingresos y egresos en una sola iteración.
- `docker compose exec frontend npm test`: 7 pruebas pasaron.
- `docker compose exec frontend npm run lint`: pasó.
- `docker compose exec frontend npm run build`: pasó. Vite generó chunks de 227.17 kB para el entry, 371.51 kB para gráficos cartesianos y 20.04 kB para la comparativa; no emitió advertencia de tamaño.