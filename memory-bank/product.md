# Resumen del producto

## Descripción

Dashboard web de métricas financieras. La interfaz consulta movimientos a una API FastAPI y presenta indicadores agregados y tendencias mensuales.

## Lo que muestra la interfaz

- Ingresos, egresos, beneficio y margen de beneficio.
- Gráfico mensual de ingresos frente a egresos y gráfico mensual de margen.
- Estados de carga y error para la consulta de datos.
- Filtro opcional de fecha de inicio y fin para KPI y gráficos, con el rango disponible mostrado junto a los campos.
- Tabla de alertas de gasto con umbral configurable y estado vacío explícito.
- Vista comparativa B2B/B2C con categorías principales, porcentaje de ingresos por grupo y gráfico de ingresos totales.
- Los cálculos de beneficio usan ingresos menos egresos; el porcentaje mostrado es beneficio dividido entre ingresos, o cero si no hay ingresos.
- Los importes se formatean en dólares estadounidenses.

La página consulta `GET /api/metrics` con fechas opcionales y `GET /api/metrics/facets` para mostrar el rango disponible. Calcula los indicadores y agregados mensuales a partir de los movimientos filtrados en el frontend. También consulta `GET /api/metrics/alerts` con el mismo rango y un umbral configurable para mostrar anomalías de gasto mensuales calculadas con los tres meses anteriores dentro del rango. La vista comparativa usa categorías y resúmenes de ingresos B2B/B2C para el mismo rango y calcula los porcentajes por grupo en el frontend.

## Datos y API

- La API genera movimientos simulados: no se observa una conexión a una fuente financiera real en el flujo revisado.
- Cada movimiento tiene fecha, importe, tipo de operación (`income`/`outcome`), categoría (`suppliers`, `sales`, `operational`, `administrative` u `others`) y tipo de negocio (`B2B`/`B2C`).
- El generador produce 360 movimientos y las rutas de métricas lo invocan con semilla `42`. Las fechas se asignan a una ventana móvil de doce meses completos basada en la fecha actual.
- La API ofrece endpoints de facetas, resúmenes por día/semana/mes, categorías principales, comparaciones, alertas y movimientos B2B/B2C; el dashboard integra movimientos, facetas y alertas, y la vista comparativa integra facetas, categorías principales y resúmenes.

## Estado conocido

El encabezado de la interfaz sigue fijado en `2024 - Full Year`, aunque los movimientos generados corresponden a una ventana relativa a la fecha actual y el dashboard permite filtrar por fechas. No asumir que ese texto describe correctamente el período de los datos.

## Límites de lo verificado

El código revisado no permite afirmar que el producto procese datos reales, los persista, autentique usuarios, se integre con un sistema contable o esté dirigido a un perfil específico.

## Referencias del repositorio

- [Frontend y estados de la página](../frontend/src/App.tsx)
- [Cálculos y formatos financieros](../frontend/src/lib/financial-utils.ts)
- [Tipos financieros del frontend](../frontend/src/lib/financial-types.ts)
- [Modelos, generación de datos y endpoints](../backend/app/routes.py)
- [Verificación del período mostrado](../verification.md)