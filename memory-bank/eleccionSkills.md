# Elección de skill: Web Design Guidelines

## Justificación

En un dashboard financiero, el usuario vuelve con frecuencia para revisar métricas, comparar periodos y ajustar filtros. Que la API y los cálculos funcionen es necesario, pero no basta: si encontrar información, entender el estado de la pantalla o corregir una entrada resulta confuso, cada consulta añade fricción. Esa fricción puede reducir la confianza y las ganas de volver a usar el producto.

Por ese motivo se priorizó instalar la skill `web-design-guidelines` de Vercel. Sus criterios ayudan a revisar la experiencia desde la perspectiva del usuario: navegación y estado compartibles, formularios comprensibles, comportamiento móvil, accesibilidad, contenido y estados de carga o error. Aplicarlos no garantiza por sí solo la retención, pero ayuda a detectar y reducir obstáculos concretos en las tareas habituales del dashboard.

La elección también complementa `vercel-react-best-practices`: esa skill orienta decisiones de implementación y rendimiento de React; `web-design-guidelines` amplía la revisión a cómo se percibe y se usa la interfaz. Así, el rendimiento técnico se considera junto con la claridad, la previsibilidad y la facilidad de uso.

## Ejemplos aplicados

- La vista activa, el rango de fechas y el umbral de alertas se reflejan en la URL. El usuario puede guardar o compartir una consulta y usar Atrás/Adelante para recuperar estados anteriores.
- El campo de umbral permite escribir valores intermedios y muestra un mensaje cuando el valor final no es válido, en lugar de impedir silenciosamente la edición.
- Los campos de fecha y umbral usan texto de 16 px en móvil para reducir el zoom automático al enfocarlos en iOS.
- El título genérico `frontend` se sustituyó por `Financial Metrics Dashboard`, haciendo reconocible la aplicación en la pestaña y el historial del navegador.
- El documento declara el esquema oscuro y un color de tema acorde con el fondo, para que los controles nativos y la interfaz del navegador acompañen la apariencia de la aplicación.

Estos cambios reducen fricción en acciones repetidas y hacen más claro qué aplicación se está usando y cómo continuar. Su efecto real sobre la retención debe evaluarse con observación o métricas de uso, no darse por supuesto.
