# 002 - Alertas de anomalias en gastos

## Objetivo
Destacar periodos en los que el gasto haya aumentado de forma inesperada.

## Usuario
Equipo de finanzas.

## Historias de usuario
- Como miembro del equipo de finanzas, quiero identificar en una tabla los periodos con aumentos inesperados de gasto y ajustar el umbral de alerta.

## Requisitos funcionales
- Mostrar debajo de los graficos existentes una tabla con las columnas: periodo, gasto registrado (`outcome`), media de los tres periodos anteriores e incremento porcentual.
- Considerar cada periodo como un mes calendario y calcular la media con los tres meses calendario inmediatamente anteriores.
- Permitir configurar el umbral mediante un campo numerico que acepte ratios entre `0.01` y `1.0`, con valor predeterminado `0.3`.
- Respetar el rango de fechas seleccionado en el dashboard cuando este activo.
- Mostrar alertas solo para meses dentro del rango activo; para calcular su media, usar los tres meses anteriores que tambien esten dentro del rango. No evaluar un mes si no hay tres meses anteriores en ese rango.
- Calcular el incremento porcentual respecto a la media de los tres meses anteriores; considerar alerta solo cuando el incremento supere el umbral, interpretado como ratio.
- Si no hay anomalías para el umbral seleccionado, mostrar un mensaje explicito de estado vacio.

## Criterios de aceptacion
- La tabla presenta los cuatro datos requeridos para cada periodo con anomalia.
- El usuario puede establecer un umbral entre `0.01` y `1.0`; inicialmente es `0.3`.
- Al cambiar el rango de fechas activo, las alertas corresponden a ese rango.
- Cuando no hay resultados, se muestra un mensaje de estado vacio en lugar de ocultar la tabla.

## Fuera del alcance
- Alertas sobre ingresos u otras metricas distintas del gasto.

## Casos de prueba
- Sin cambiar la configuracion inicial, el umbral es `0.3` y la tabla muestra las alertas correspondientes.
- Al configurar un umbral dentro del rango `0.01` a `1.0`, la tabla refleja las alertas para ese umbral.
- Con un rango de fechas activo, la tabla muestra alertas correspondientes a ese rango.
- Si no se detectan alertas para el umbral actual, se muestra el mensaje de estado vacio.
- Cada alerta muestra el periodo, el gasto, la media de los tres periodos anteriores y el incremento porcentual.
- El incremento se muestra como porcentaje y se compara con el umbral como ratio; un mes sin tres meses anteriores en el rango no genera una alerta evaluable.
