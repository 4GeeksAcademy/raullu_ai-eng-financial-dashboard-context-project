# 001 - Filtro de rango de fechas

## Objetivo
Permitir consultar los datos del dashboard principal para un rango de fechas concreto.

## Usuario
Equipo de finanzas.

## Historias de usuario
- Como miembro del equipo de finanzas, quiero indicar una fecha de inicio y una fecha de fin para centrar el dashboard en el periodo que necesito.
- Como miembro del equipo de finanzas, quiero conocer el rango de fechas disponible para elegir un periodo valido.

## Requisitos funcionales
- Mostrar en la parte superior del dashboard dos campos de fecha: inicio y fin.
- Permitir dejar vacio cualquiera de los campos; si ambos estan vacios, mostrar todos los datos disponibles.
- Enviar las fechas seleccionadas en formato `YYYY-MM-DD`.
- Incluir en el rango los datos correspondientes a las fechas de inicio y fin seleccionadas.
- Aplicar el rango seleccionado a todos los datos que se muestran actualmente en el dashboard.
- Mostrar junto a los campos la fecha mas antigua y la mas reciente disponibles en el dataset.

## Criterios de aceptacion
- Se muestran los campos de fecha de inicio y fin en la parte superior del dashboard.
- Al seleccionar fechas, los KPI y graficos existentes reflejan unicamente los datos del rango seleccionado.
- Si ambos campos estan vacios, se muestran todos los datos disponibles.
- El rango de fechas disponible se muestra junto a los campos como referencia.

## Fuera del alcance
- Cambios a los KPI o graficos distintos de aplicarles el rango seleccionado.

## Casos de prueba
- Con ambas fechas vacias, el dashboard muestra todos los datos disponibles.
- Con fechas de inicio y fin seleccionadas, los valores se envian como `YYYY-MM-DD` y los KPI y graficos muestran los datos de ese rango.
- Con solo fecha de inicio seleccionada, se incluyen los datos desde esa fecha; con solo fecha de fin, se incluyen los datos hasta esa fecha.
- El rango disponible muestra la fecha mas antigua y la mas reciente del dataset.
