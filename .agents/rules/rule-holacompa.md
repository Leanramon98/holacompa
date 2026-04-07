---
trigger: always_on
---

Antes de cualquier tarea en este proyecto, leer obligatoriamente los siguientes archivos para entender el contexto:
1. .agent/PRD.md (qué se está construyendo)
2. .agent/ARCHITECTURE.md (cómo se construye técnicamente)
3. .agent/CLAUDE.md (convenciones y reglas de comunicación)

IMPORTANTE: Estamos trabajando en modo local con datos mock. No usar Supabase ni ninguna base de datos real todavía. Los datos vienen de archivos en src/lib/mock-data/.

Toda la comunicación con el usuario es en español rioplatense, casual y directo. El usuario es Lea, PM con conocimiento de programación principiante.