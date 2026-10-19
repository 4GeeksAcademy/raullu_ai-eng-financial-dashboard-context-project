## Backend

- [x] T1: Ajustar el cálculo de alertas para comparar cada mes con la media de los tres meses calendario anteriores dentro del rango activo, sin evaluar meses que no tengan esos tres meses disponibles.
- [x] T2: Validar `threshold` entre `0.01` y `1.0`, manteniendo `0.3` como valor predeterminado.
- [x] T3: Ampliar las pruebas backend existentes para cubrir el cálculo de tres meses, los límites del umbral y el filtro de fechas.

## Frontend

- [x] T4: Añadir el tipo TypeScript de alerta y conectar la consulta con el umbral seleccionado y el rango de fechas activo.
- [x] T5: Mostrar debajo de los gráficos el campo numérico de umbral, la tabla con sus cuatro columnas y un estado vacío explícito cuando no haya alertas.

## Verificación

- [x] T6: Ejecutar `pytest` en backend y `npm test`, `npm run lint` y `npm run build` en frontend.
- [x] T7: Verificar los criterios de aceptación: cuatro datos por alerta, umbral inicial `0.3` y configurable entre `0.01` y `1.0`, respeto del rango de fechas y mensaje vacío cuando no haya resultados.
