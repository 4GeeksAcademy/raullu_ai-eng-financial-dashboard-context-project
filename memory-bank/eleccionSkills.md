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

# Creación de skill propia: sdd-raullu

Se ha creado la skill [sdd-raullu](../.agents/skills/sdd-raullu/SKILL.md) para mejorar el proceso de desarrollo de nuevas funcionalidades y ampliaciones del dashboard. A diferencia de las skills centradas en diseño, accesibilidad o rendimiento, su objetivo es organizar la colaboración con el agente: acordar qué se quiere construir antes de decidir cómo hacerlo y comprobar después si el resultado cumple lo acordado.

Se escogió el enfoque SDD (*Spec-Driven Development*, desarrollo guiado por especificaciones) porque el proyecto ya utiliza especificaciones, planes y listas de tareas. La skill convierte esa estructura en un procedimiento reutilizable, con un orden explícito: especificación, plan, tareas, implementación y verificación. Así evita que cada petición se aborde de una forma distinta o que el agente empiece a programar basándose en supuestos no confirmados.

El procedimiento exige aprobación del usuario después de redactar la especificación, después de preparar el plan y después de desglosar las tareas, antes de implementar. Estas pausas permiten corregir interpretaciones, revisar los archivos afectados y mantener el control del alcance. Si cambia un requisito importante, el agente debe revisar los documentos y solicitar las aprobaciones pertinentes, en lugar de ampliar el trabajo silenciosamente.

También vincula los criterios de aceptación con las tareas y las verificaciones. No basta con escribir código o conseguir que compile: hay que aportar evidencia del comportamiento esperado y distinguir lo verificado de lo fallido o pendiente. Por ejemplo, ante un botón para limpiar las fechas, primero se acordaría si debe conservar la vista y el umbral de alertas; después se planificarían los cambios y se comprobaría tanto el estado de los campos como los filtros de la URL y las consultas.

Se eligió crear una skill propia para adaptar este flujo al proyecto, respetando las especificaciones existentes y los cambios previos del usuario. Todo el procedimiento está contenido en un único `SKILL.md`, sin scripts, referencias externas ni assets adicionales. Su valor esperado es facilitar cambios revisables, reducir malentendidos y evitar regresiones; su activación real en Copilot y su eficacia durante el desarrollo siguen pendientes de comprobar.
