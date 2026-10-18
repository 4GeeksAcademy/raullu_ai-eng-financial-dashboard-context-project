## Frontend

- [x] T1: Añadir en `financial-types.ts` el tipo de respuesta de facetas con las fechas mínima y máxima disponibles.
- [x] T2: Cargar las facetas y mostrar las fechas disponibles junto a los campos de inicio y fin en el dashboard.
- [x] T3: Mantener las fechas seleccionadas y enviarlas como parámetros opcionales `start_date` y `end_date` en formato `YYYY-MM-DD` al solicitar métricas.
- [x] T4: Calcular todos los KPI y gráficos con los movimientos recibidos para el rango seleccionado, conservando los estados actuales de carga y error.

## Verificación

- [x] T5: Ampliar la prueba existente de filtros backend para comprobar por separado el límite de inicio y el límite de fin.
- [x] T6: Verificar los criterios de aceptación: ambas fechas vacías, ambas seleccionadas, cada límite por separado, fechas disponibles visibles y KPI y gráficos consistentes; ejecutar `pytest` en backend y `npm test`, `npm run lint` y `npm run build` en frontend.
