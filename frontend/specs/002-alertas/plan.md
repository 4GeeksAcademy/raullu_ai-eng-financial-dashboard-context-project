# Plan mínimo: Alertas de anomalías

## Cambios en backend
- Ajustar `GET /api/metrics/alerts` para limitar `threshold` al rango `0.01`–`1.0`, con valor predeterminado `0.3`.
- Cambiar el cálculo para comparar cada mes con la media de los tres meses calendario inmediatamente anteriores dentro del rango de fechas activo. Mantener la respuesta actual con los cuatro campos requeridos.
- Ampliar las pruebas backend existentes para el umbral, la ventana de tres meses y el filtro de fechas.

## Cambios de frontend
- Añadir el tipo TypeScript para la respuesta de alertas.
- Consultar alertas con el umbral elegido y el rango de fechas activo.
- Mostrar debajo de los gráficos el control de umbral, la tabla de cuatro columnas y un estado vacío explícito cuando no haya resultados.

## Archivos afectados
- `backend/app/routes.py`
- `backend/tests/test_routes.py`
- `frontend/src/App.tsx`
- `frontend/src/lib/financial-types.ts`
- Nuevo: `frontend/src/components/dashboard/alerts-table.tsx`

## Orden recomendado
1. Ajustar el cálculo y la validación del umbral en backend.
2. Actualizar las pruebas backend del cálculo y los filtros.
3. Añadir el tipo de respuesta y conectar la consulta de alertas con el umbral y las fechas en frontend.
4. Mostrar la tabla y el estado vacío debajo de los gráficos.
5. Verificar el resultado.

## Verificación básica
- Ejecutar `pytest` desde `backend`.
- Ejecutar `npm test`, `npm run lint` y `npm run build` desde `frontend`.
- Comprobar el umbral predeterminado y sus límites, las alertas con y sin fechas activas, y el estado vacío cuando no haya resultados.

## Riesgo de regresión
- El endpoint existente cambiará el cálculo de alertas; los resultados pueden diferir de los actuales.
- Limitar el umbral puede rechazar con `422` valores que antes aceptaba fuera de `0.01`–`1.0`.
