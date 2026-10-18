# 003 - Comparativa B2B vs B2C

## Objetivo
Comparar el rendimiento de ingresos de las lineas de negocio B2B y B2C.

## Usuario
Equipo de finanzas.

## Historias de usuario
- Como miembro del equipo de finanzas, quiero comparar las principales categorias de ingreso y el total de ingresos de B2B y B2C para el periodo elegido.

## Requisitos funcionales
- Ofrecer una nueva pagina del dashboard con dos secciones en paralelo: B2B y B2C.
- Cada seccion muestra las cinco categorias de ingreso principales disponibles para su linea de negocio; si hay menos de cinco, muestra todas las disponibles.
- Cada tabla muestra el nombre de la categoria, su total de ingresos y su porcentaje sobre los ingresos totales de ese grupo dentro del rango de fechas seleccionado. El total del grupo incluye todas sus categorias de ingreso, no solo las que aparecen en la tabla.
- Mostrar debajo de ambas secciones un unico grafico que compare los ingresos totales de B2B y B2C.
- Permitir filtrar la comparativa por un rango de fechas, enviando las fechas como `YYYY-MM-DD`.
- Las categorias candidatas corresponden a las categorias de ingreso indicadas por las facetas; cada seccion muestra solo las que estan disponibles en su linea de negocio.

## Criterios de aceptacion
- La pagina muestra las secciones B2B y B2C en paralelo.
- Cada seccion presenta las cinco categorias principales disponibles, o todas si hay menos de cinco, con nombre, total y porcentaje sobre todos los ingresos del grupo en el rango seleccionado.
- El grafico compara los ingresos totales de ambas lineas de negocio para el rango seleccionado.
- Al cambiar el rango de fechas, las tablas y el grafico reflejan ese periodo.

## Fuera del alcance
- Comparaciones con lineas de negocio distintas de B2B y B2C.
- Metricas distintas de ingresos.

## Casos de prueba
- La pagina muestra las secciones B2B y B2C en paralelo, cada una con sus cinco categorias de ingreso principales disponibles, o todas si hay menos de cinco, y sus totales y porcentajes.
- Las categorias mostradas para cada grupo corresponden a las categorias de ingreso disponibles indicadas por las facetas.
- El grafico muestra la comparacion de los ingresos totales de B2B y B2C.
- Al seleccionar un rango de fechas, ambas tablas y el grafico muestran datos de ese mismo rango y las fechas usan `YYYY-MM-DD`.
