# Plan mínimo: Filtro de fechas

## Cambios en backend
- No hacen falta: `GET /api/metrics` ya acepta fechas inclusivas y opcionales; `GET /api/metrics/facets` devuelve la fecha mínima y máxima.
- La prueba existente cubre el filtro por fecha en [test_routes.py](../../../backend/tests/test_routes.py).

## Cambios de frontend
- Cargar las facetas y mostrar las fechas disponibles junto a los campos.
- Mantener las fechas seleccionadas y solicitar los movimientos con los límites activos; vacío significa sin límite.
- Calcular KPI y gráficos con los movimientos filtrados, conservando los estados actuales de carga y error.

## Archivos afectados
- [App.tsx](../../src/App.tsx)
- [dashboard-header.tsx](../../src/components/dashboard/dashboard-header.tsx)
- [financial-types.ts](../../src/lib/financial-types.ts)
- Opcionalmente, [test_routes.py](../../../backend/tests/test_routes.py) para cubrir por separado inicio y fin.

## Orden recomendado
1. Añadir al frontend el tipo de facetas y mostrar el rango disponible.
2. Conectar los campos con la consulta de métricas y los resultados visibles.
3. Verificar los casos descritos abajo.

## Verificación básica
- Comprobar ambas fechas vacías, ambas seleccionadas y cada límite por separado.
- Confirmar que KPI y gráficos corresponden al rango.
- Ejecutar `pytest` en backend y `npm test`, `npm run lint` y `npm run build` en frontend.

## Riesgo de regresión
- El cambio en la carga podría dejar KPI y gráficos con rangos distintos o estados de carga desincronizados.
- Persisten riesgos ya conocidos: la etiqueta del período está fijada en `2024 - Full Year` y la agregación mensual puede desplazar fechas de calendario por zona horaria en [financial-utils.ts](../../src/lib/financial-utils.ts).
