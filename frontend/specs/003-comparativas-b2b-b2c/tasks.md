## Frontend

- [x] T1: Añadir en `financial-types.ts` los tipos de respuesta para categorías principales e ingresos resumidos por grupo.
- [x] T2: Añadir en `financial-utils.ts` los cálculos de total de ingresos por grupo y porcentaje por categoría, con pruebas en `financial-utils.test.ts`.
- [x] T3: Consultar las categorías principales y los resúmenes de B2B y B2C usando el mismo rango de fechas y las categorías candidatas de facetas.
- [x] T4: Añadir a `App.tsx` la selección de la vista comparativa, conservando el estado del filtro de fechas.
- [x] T5: Crear la vista comparativa con dos tablas paralelas, un gráfico único y estados de carga y error.

## Verificación

- [x] T6: Ejecutar `npm test`, `npm run lint` y `npm run build`; verificar los criterios de aceptación: categorías disponibles y principales, totales y porcentajes por grupo, gráfico comparativo y actualización de tablas y gráfico al cambiar el rango de fechas.
