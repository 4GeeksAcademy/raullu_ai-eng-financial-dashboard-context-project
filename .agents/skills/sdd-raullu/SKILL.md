---
name: sdd-raullu
description: "Guía funcionalidades con SDD y aprobación de especificación, plan y tareas antes de implementar y verificar. Úsala para crear o ampliar funciones; no para teoría, auditorías ni retoques triviales."
---

# Desarrollo con SDD: sdd-raullu

## 1. Propósito y alcance

Desarrolla funcionalidades siguiendo este orden:
Especificación > Plan > Tareas > Implementación > Verificación.

Usa este procedimiento cuando el usuario pida crear o ampliar una funcionalidad
mediante SDD o invoque explícitamente `sdd-raullu`. No lo actives para consultas
teóricas, explicaciones de código, auditorías sin implementación ni retoques
triviales de texto o estilo, salvo invocación explícita.

Mantén los documentos sencillos. No añadas funcionalidades fuera de la
especificación aprobada. No sustituyas las reglas generales del proyecto ni
dupliques en esta skill los hechos de su banco de memoria.

## 2. Entradas y comprobaciones previas

1. Obtén una descripción de la funcionalidad: es la única entrada obligatoria.
   Identifica también restricciones, ejemplos y especificaciones proporcionadas.
2. Lee las instrucciones aplicables del repositorio y consulta su banco de memoria
   si existe. Contrasta los hechos relevantes con el código actual.
3. Lee las especificaciones afectadas y sus documentos de planificación y tareas.
   Consulta las reglas de frontend o backend según las capas involucradas.
4. Inspecciona el código cercano, las pruebas y los cambios locales. Conserva los
   cambios del usuario; no reviertas ni sobrescribas trabajo ajeno.
5. Pregunta solo por información ausente que cambie materialmente los requisitos,
   el alcance o los criterios de aceptación. Si hay funcionalidades independientes,
   propone separarlas.

Usa `frontend/specs/<spec-id>/`, la ubicación establecida en este proyecto, incluso
para funcionalidades con cambios backend. Reutiliza la carpeta de la funcionalidad
existente; para otra nueva, elige el siguiente identificador numérico libre y un
nombre descriptivo según las convenciones existentes.

Si un documento de destino ya existe, léelo y modifica únicamente lo necesario.
Conserva requisitos vigentes y tareas completadas. Si la petición contradice una
especificación aprobada, pide una decisión antes de cambiar el alcance.

## 3. Procedimiento

### Análisis previo: sin modificar archivos

1. Resume objetivo, comportamiento actual, resultado esperado y límites.
2. Identifica las capas afectadas y la especificación que crearás o actualizarás.
3. Aclara las decisiones imprescindibles antes de redactar requisitos.

### Especificación

4. Crea o actualiza `spec.md` con objetivo, usuario, historias o comportamientos,
   requisitos, criterios de aceptación, fuera del alcance y casos de prueba.
5. Identifica los criterios como `CA-01`, `CA-02`, etc. Describe resultados
   observables, incluidos límites y errores relevantes, sin presuponer implementación.
6. Presenta la especificación y solicita aprobación explícita. DETENTE hasta
   recibirla. Si hay correcciones, actualiza el documento y vuelve a pedir aprobación.

### Plan

7. Tras aprobar la especificación, crea o actualiza `plan.md`: cambios por capa,
   archivos afectados, orden de implementación, riesgos y verificación de cada criterio.
8. Distingue archivos existentes de archivos nuevos propuestos. Reutiliza código y
   pruebas adecuados. Si cambia el contrato API, planifica modelos backend y tipos
   frontend en el mismo cambio. Incluye límites de mes y año si cambian agregaciones.
9. Presenta el plan y solicita aprobación explícita. DETENTE hasta recibirla.

### Tareas

10. Tras aprobar el plan, crea o actualiza `tasks.md` con tareas pequeñas y
    checkboxes, identificadas como `T1`, `T2`, etc. Incluye implementación,
    verificaciones y documentación requerida; vincúlalas con los criterios `CA-xx`.
11. Separa tareas de implementación y de verificación para no confundir código
    escrito con comportamiento probado.
12. Presenta las tareas y solicita aprobación explícita antes de implementar.
    DETENTE hasta recibirla. Aprobar una fase no aprueba las siguientes.

### Implementación

13. Implementa las tareas aprobadas una a una, mediante cambios acotados y sin
    refactorizaciones ni dependencias ajenas al alcance.
14. Tras cada cambio significativo, ejecuta la comprobación más específica
    disponible. Repara regresiones introducidas antes de continuar.
15. Marca las tareas completadas en `tasks.md` solo cuando estén realizadas.
    Marca una tarea de verificación únicamente después de ejecutar su comprobación.
16. Si cambian requisitos o decisiones técnicas importantes, actualiza los documentos
    afectados y solicita de nuevo las aprobaciones pertinentes antes de continuar.

### Verificación y entrega

17. Contrasta cada criterio con evidencia real: prueba o comando, resultado y
    limitaciones. Distingue pruebas automatizadas de comprobaciones manuales.
18. Ejecuta los controles requeridos para las capas modificadas, consultando los
    comandos vigentes. No des por probada una interacción porque el build compile.
19. Actualiza los documentos y la memoria conforme a las instrucciones del repo.
    Informa del resultado final sin ocultar verificaciones pendientes.

Si el usuario pide solo especificar o planificar, detente en esa fase. Crear esta
skill no autoriza ejecutar una funcionalidad ni generar especificaciones de ejemplo.

## 4. Recursos de apoyo y cuándo utilizarlos

Esta skill es autosuficiente: no necesita scripts, referencias externas ni assets.

- Consulta instrucciones y especificaciones existentes durante el análisis y
  cuando cambie el alcance. Son contexto del proyecto, no recursos empaquetados.
- Consulta código y pruebas cercanas al planificar e implementar cada tarea.
- Usa otras skills disponibles solo si el trabajo concreto lo requiere; no las
  conviertas en dependencias obligatorias de este procedimiento.

Si falta un recurso imprescindible o no es accesible, explica el bloqueo y pide
lo necesario. No inventes contenidos ni eludas restricciones de acceso.

## 5. Formato de salida

En cada fase documental, entrega la fase actual, las rutas creadas o actualizadas,
un resumen de decisiones y cuestiones pendientes, y la solicitud de aprobación
para pasar a la siguiente fase.

Al entregar la implementación, resume:

- Archivos modificados y su finalidad.
- Criterios de aceptación: verificado, fallido o pendiente, con evidencia.
- Pruebas y comandos ejecutados y sus resultados.
- Limitaciones, bloqueos y comprobaciones manuales pendientes.

Declara la tarea terminada solo si existen los tres documentos vigentes, las tres
aprobaciones, todas las tareas completadas y evidencia de cumplimiento de los
requisitos. De lo contrario, informa de una entrega parcial.

## 6. Ejemplos

### Caso habitual: debe activar la skill

Petición: "Usa sdd-raullu para añadir un botón que limpie las fechas sin cambiar
la vista activa ni el umbral de alertas."

Salida esperada inicial: actualiza la especificación pertinente con estos criterios,
presenta el documento y espera aprobación:

- `CA-01`: el botón vacía ambas fechas.
- `CA-02`: elimina de la URL solo los filtros de fecha.
- `CA-03`: conserva la vista y el umbral.
- `CA-04`: las consultas dejan de aplicar los límites de fecha.

Después de cada aprobación, continúa con plan y tareas. No programes antes de la
tercera aprobación.

### Caso límite: petición incompleta y documentos existentes

Petición: "Usa sdd-raullu para mejorar las alertas; su especificación ya existe."

Comportamiento esperado: lee sus tres documentos y pregunta qué comportamiento
debe cambiar. No inventes requisitos, dupliques la especificación ni reinicies
tareas completadas. Si faltan aprobaciones de una sesión anterior, confírmalas.

### Caso cercano excluido: no debe activar la skill

Petición: "Explícame cómo calcula computeKPIs el margen de beneficio."

Comportamiento esperado: explica el código sin crear documentos de especificación,
plan o tareas y sin solicitar aprobaciones de desarrollo.

## 7. Validación y tratamiento de errores

1. Comprueba antes de cada aprobación la coherencia entre petición, documentos y
   decisiones ya aprobadas. Vincula requisitos, criterios, tareas y verificaciones.
2. Distingue pruebas previstas de pruebas ejecutadas. Si una falla, determina si
   es un fallo previo o una regresión; no arregles problemas ajenos sin autorización.
3. Si faltan herramientas, dependencias o permisos, registra la comprobación
   intentada y el bloqueo. No declares resultados satisfactorios sin ejecutarlos.
4. Al retomar una sesión, lee los documentos y las aprobaciones disponibles.
   Si no puedes confirmar la aprobación necesaria, solicítala antes de avanzar.
5. Para revisar esta skill, valida el YAML con solo `name` y `description`, nombre
   coherente con la carpeta, descripción menor de 200 caracteres, menos de 500
   líneas y ausencia de recursos obligatorios no incluidos.
6. Prueba las tres peticiones de la sección de ejemplos en conversaciones separadas.
   Respeta las pausas de aprobación. Distingue revisión estática del archivo de
   activación real en Copilot y comunica cuál has realizado. No ejecutes estos
   escenarios como parte de crear o instalar la skill.