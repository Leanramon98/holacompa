# PRD — Hola Compa

**Product Requirements Document**
**Versión**: 1.0
**Fecha**: Abril 2026
**Owner**: LESO Tech

---

## 1. Resumen ejecutivo

**Hola Compa** es una webapp que conecta adoptantes, refugios y vendedores de productos para mascotas en Argentina. Su propuesta de valor central es **unir el momento de la adopción con todo lo que viene después** (compra de productos, servicios y comunidad), aprovechando que un nuevo adoptante es el usuario con más alta intención de compra del rubro.

La plataforma combina tres experiencias principales:
1. Un **modo "Tinder" de adopción** donde los usuarios descubren mascotas con un sistema de swipe.
2. Un **marketplace tipo Mercado Libre** especializado en productos para mascotas.
3. Un **sistema de gestión** para refugios y vendedores que les permite publicar, recibir consultas y operar.

---

## 2. Objetivos del producto

### 2.1. Objetivos de negocio

- Validar la propuesta de valor con usuarios reales en AMBA en los primeros 6 meses post-lanzamiento.
- Onboardear 50 refugios verificados y 100 vendedores en el primer año.
- Procesar al menos 500 adopciones a través de la plataforma en el primer año.
- Generar ingresos sostenibles a través de seis vías combinadas: comisiones, welcome box, servicios, suscripciones, publicidad y donaciones.

### 2.2. Objetivos de usuario

- **Adoptante**: encontrar a su próxima mascota de forma fácil, confiable y emocionalmente positiva, y tener todo lo que necesita para empezar bien.
- **Refugio**: ganar visibilidad y herramientas para gestionar adopciones de manera profesional.
- **Vendedor**: llegar a una audiencia segmentada y de alta intención de compra.

### 2.3. Métricas de éxito (KPIs)

- DAU / MAU de adoptantes
- Tasa de conversión visita → postulación
- Tasa de conversión postulación → adopción concretada
- NPS de adoptantes y refugios
- GMV del marketplace
- Ingresos por línea de monetización
- Tasa de retención a 30 / 60 / 90 días

---

## 3. Tipos de usuario y permisos

### 3.1. Adoptante (usuario final)

Persona mayor de edad que busca adoptar una mascota o comprar productos.

**Permisos**:
- Crear perfil personal
- Explorar mascotas (modo Tinder)
- Postularse a adopciones
- Chatear con refugios
- Comprar en el marketplace
- Donar a refugios
- Dejar reseñas

**No puede**: publicar mascotas ni productos, acceder al admin.

### 3.2. Refugio

Organización (formal o informal) que rescata mascotas. Puede ser ONG, grupo de proteccionistas o rescatista independiente. **Requiere verificación manual antes de publicar.**

**Permisos**:
- Crear y gestionar perfil del refugio
- Publicar mascotas en adopción
- Gestionar postulaciones
- Chatear con postulantes
- Recibir donaciones
- Ver estadísticas del refugio

**No puede**: vender productos, acceder a datos de otros refugios.

### 3.3. Vendedor / Petshop

Comercio o emprendedor del rubro mascotas. **Requiere verificación manual (CUIT, documentación comercial).**

**Permisos**:
- Crear y gestionar perfil de tienda
- Publicar productos
- Gestionar inventario
- Recibir consultas y órdenes (V2)
- Ver estadísticas

**No puede**: publicar mascotas, acceder a datos de otros vendedores.

### 3.4. Admin

Equipo interno de Hola Compa con varios sub-roles: Super Admin, Moderador, Soporte, Marketing, Finanzas.

**Permisos**: acceso total al sistema, gestión de usuarios, moderación, configuración, reportes.

### 3.5. Matriz de permisos

| Acción | Adoptante | Refugio | Vendedor | Admin |
|---|:-:|:-:|:-:|:-:|
| Ver mascotas en adopción | ✅ | ✅ | ✅ | ✅ |
| Postularse a adopción | ✅ | ❌ | ❌ | ❌ |
| Publicar mascotas | ❌ | ✅ | ❌ | ✅ |
| Ver productos | ✅ | ✅ | ✅ | ✅ |
| Comprar productos | ✅ | ✅ | ✅ | ✅ |
| Publicar productos | ❌ | ❌ | ✅ | ✅ |
| Recibir donaciones | ❌ | ✅ | ❌ | ❌ |
| Donar | ✅ | ✅ | ✅ | ❌ |
| Moderar contenido | ❌ | ❌ | ❌ | ✅ |
| Configurar sistema | ❌ | ❌ | ❌ | ✅ |

---

## 4. Funcionalidades del MVP

Esta sección define **qué se construye en el MVP**. Las funcionalidades de V2 y V3 están en la sección 8 (Roadmap).

### 4.1. Autenticación y onboarding

- Registro con email + contraseña
- Login social: Google, Facebook, Apple
- Verificación de email con código o magic link
- Recuperación de contraseña
- Selección de tipo de cuenta (adoptante / refugio / vendedor)
- Onboarding personalizado por tipo de cuenta

### 4.2. Módulo Adoptante

**Onboarding**
- Datos personales: nombre, foto, ubicación (con Google Maps autocomplete)
- Preferencias: tipo de mascota, tamaño, edad, nivel de energía
- Situación de vida: tipo de vivienda, otros animales, niños

**Home / Feed**
- Sección "Mascotas para vos" (filtradas por preferencias)
- Sección "Recién llegados"
- Sección "Cerca tuyo"
- Sección "Marketplace destacado"
- Sección "Refugios verificados"

**Modo Tinder de adopción**
- Card con foto, nombre, edad, tamaño, distancia, tags
- Gestos: swipe izq (pasar), swipe der (favorito), swipe arriba (postular), tap (perfil completo)
- Filtros: tipo, tamaño, edad, sexo, distancia, refugio, características
- Smart matching basado en preferencias y situación de vida

**Perfil completo de mascota**
- Galería de fotos
- Datos básicos, historia, salud, compatibilidad
- Card del refugio con link
- Mapa con ubicación aproximada
- CTA principal: "Quiero adoptar a [nombre]"

**Postulación de adopción**
- Formulario multi-paso con datos personales, situación habitacional, experiencia previa, motivación
- Compromiso firmado
- Estados: pendiente, en revisión, entrevista, aceptada, concretada, rechazada, cancelada

**Mis adopciones**
- Postulaciones activas y su estado
- Historial de chats
- Mascotas favoritas
- Mi manada (mascotas adoptadas)

**Marketplace (visión adoptante)**
- Home con buscador, categorías destacadas, productos recomendados
- Listado con filtros y orden
- Página de producto con galería, descripción, reseñas
- **CTA en MVP**: "Ver en la tienda" → redirige al sitio del vendedor o WhatsApp
- Sin carrito ni checkout en MVP

**Donaciones**
- Botón "Donar" en perfil de cada refugio
- Monto sugerido o personalizado
- Pago vía Mercado Pago
- Donación única (recurrente en V2)
- Comprobante automático

**Perfil del adoptante**
- Datos editables
- Mi manada
- Historial de donaciones
- Configuración (notificaciones, privacidad)

### 4.3. Módulo Refugio

**Registro**
- Formulario con datos del refugio
- Carga de documentación para verificación
- Estado "En revisión" hasta aprobación del admin

**Dashboard**
- Resumen de actividad
- Acciones rápidas
- Métricas básicas
- Notificaciones

**Perfil público**
- Logo, nombre, descripción, ubicación, historia
- Galería de fotos
- Mascotas en adopción (grid)
- Reseñas
- Sello "Refugio verificado"
- Botón de donar y contactar

**Publicar mascota**
- Formulario completo: fotos, datos básicos, salud, personalidad, historia, requisitos
- Estados: disponible / en proceso / adoptado

**Gestión de postulaciones**
- Lista con filtros
- Detalle con datos del postulante
- Acciones: aceptar, rechazar, marcar entrevista, chatear

**Chat con postulantes**
- Chat 1 a 1
- Soporte para fotos
- Notificaciones
- Reporte de conducta inapropiada

**Donaciones recibidas**
- Lista con fecha, monto, donante, método
- Total acumulado
- Comprobantes automáticos

**Estadísticas básicas**
- Visitas al perfil
- Visitas a publicaciones
- Cantidad de postulaciones
- Adopciones concretadas

### 4.4. Módulo Vendedor

**Registro**
- Formulario con datos del comercio
- Carga de documentación (CUIT, AFIP, etc.)
- Estado "En revisión" hasta aprobación

**Dashboard**
- Resumen de productos, visitas, consultas
- Acciones rápidas
- Métricas
- Notificaciones

**Perfil público**
- Logo, foto de portada, descripción
- Categorías, ubicación
- Productos publicados (grid)
- Reseñas
- Sello "Vendedor verificado"

**Publicar producto**
- Formulario: fotos, info básica, variantes, precio, stock, tipo de mascota
- Opciones de contacto (MVP): link a web, WhatsApp, email
- Estados: activo / pausado / agotado

**Gestión de productos**
- Lista con filtros
- Edición rápida de stock y precio
- Acciones masivas

**Estadísticas básicas**
- Visitas a la tienda
- Visitas a productos
- Cantidad de consultas

### 4.5. Módulo Admin

**Dashboard global**
- Métricas en tiempo real
- Top refugios, top vendedores
- Alertas pendientes

**Gestión de usuarios**
- Listas con filtros y búsqueda
- Detalle de cada usuario
- Acciones: aprobar, rechazar, suspender, editar

**Cola de aprobación**
- Refugios pendientes de verificación
- Vendedores pendientes de verificación

**Moderación**
- Cola de publicaciones reportadas
- Cola de reseñas reportadas
- Cola de chats reportados
- Acciones: revisar, eliminar, advertir, suspender, banear

**Gestión del marketplace**
- Categorías y subcategorías
- Productos destacados
- Banners

**Configuración**
- Términos y condiciones
- Políticas de privacidad
- Plantillas de notificaciones
- Parámetros generales

**Reportes**
- Reportes pre-armados
- Exportación CSV / PDF

### 4.6. Funcionalidades transversales (MVP)

- Notificaciones por email y push
- Sistema de reportes y moderación
- Búsqueda global
- Verificación manual de refugios y vendedores
- Sistema de reseñas básico

---

## 5. Requisitos no funcionales

### 5.1. Performance

- Tiempo de carga inicial < 3 segundos en 4G
- Time to Interactive < 5 segundos
- Soporte para al menos 10.000 usuarios concurrentes en el MVP

### 5.2. Disponibilidad

- Uptime objetivo: 99.5% en MVP, 99.9% en V2
- Backups diarios automáticos
- Plan de disaster recovery

### 5.3. Seguridad

- Autenticación con tokens JWT
- Cifrado de datos sensibles en reposo y en tránsito
- Cumplimiento con la Ley de Protección de Datos Personales (Argentina)
- Protección contra ataques comunes (XSS, CSRF, SQL injection)
- Rate limiting en endpoints críticos
- Logs de auditoría para acciones del admin

### 5.4. Privacidad

- Los usuarios pueden descargar todos sus datos
- Los usuarios pueden eliminar su cuenta (con período de gracia de 30 días)
- Las direcciones exactas de refugios no se muestran públicamente
- Cumplimiento con políticas de cookies

### 5.5. Accesibilidad

- Cumplimiento con WCAG 2.1 nivel AA
- Soporte para lectores de pantalla
- Contraste de colores adecuado
- Navegación por teclado

### 5.6. Responsive

- Diseño mobile-first
- Soporte para resoluciones desde 320px hasta 4K
- Funcional en navegadores modernos: Chrome, Safari, Firefox, Edge (últimas 2 versiones)

### 5.7. Internacionalización (preparación)

- Estructura de base preparada para múltiples idiomas
- Idioma por defecto: español rioplatense
- Multi-moneda preparado pero no activo en MVP

---

## 6. Modelo de negocio

Hola Compa monetiza por seis vías combinadas:

1. **Comisión sobre marketplace** (V2): porcentaje sobre cada venta concretada en la plataforma.
2. **Welcome Box**: kit de bienvenida pago para nuevos adoptantes, sponsoreado por marcas.
3. **Servicios asociados** (V2): lead generation a veterinarias, peluquerías, paseadores.
4. **Suscripción premium**: planes pagos con beneficios extra para refugios y vendedores. Plan básico siempre gratuito.
5. **Publicidad nativa de marcas**: marcas grandes pagan por aparecer en momentos clave del flujo.
6. **Donaciones con fee**: fee operativo (2-5%) sobre donaciones procesadas.

---

## 7. Reglas de negocio

### 7.1. Verificación de cuentas

- Refugios y vendedores requieren verificación manual antes de poder publicar.
- Tiempo objetivo de verificación: 48-72 hs hábiles.
- Si se rechaza, se notifica el motivo y se permite re-enviar.
- Adoptantes no requieren verificación inicial.

### 7.2. Sistema de reputación

- Adoptantes pueden ser calificados por refugios después de una adopción concretada.
- Refugios y vendedores son calificados por los usuarios.
- Las reseñas son moderables y reportables.

### 7.3. Notificaciones

**Eventos que disparan notificaciones**:
- Nueva postulación recibida (refugio)
- Cambio de estado de postulación (adoptante)
- Nuevo mensaje de chat
- Nueva consulta sobre producto (vendedor)
- Nueva donación recibida (refugio)
- Mascota favorita actualizada o adoptada
- Notificaciones del admin

**Canales en MVP**: email + push web. WhatsApp en V3.

### 7.4. Moderación

- Filtros automáticos de contenido inapropiado
- Detección de duplicados
- Reportes con cola de moderación manual
- Sistema de strikes: 3 reportes válidos → suspensión temporal; reincidencia → ban

### 7.5. Pagos

**MVP**:
- Sin pagos integrados en el marketplace (redirección al vendedor)
- Donaciones procesadas vía Mercado Pago
- Suscripciones premium pagadas vía Mercado Pago

**V2**:
- Compras integradas con Mercado Pago Marketplace (split payments)
- Liquidación automática a vendedores con descuento de comisión

### 7.6. Comunicación entre usuarios

- Todo el chat ocurre dentro de la plataforma
- Prohibido pedir o compartir contactos personales fuera del flujo oficial
- Los mensajes se guardan por 12 meses
- Posibilidad de reportar conversaciones inapropiadas

### 7.7. Privacidad de refugios

- Las direcciones exactas no se muestran públicamente
- Solo se muestra zona aproximada en el mapa
- El contacto directo siempre pasa por la plataforma

---

## 8. Roadmap

### 8.1. MVP (3-4 meses)

**Objetivo**: validar la propuesta de valor con usuarios reales en AMBA.

Incluye todas las funcionalidades de la sección 4.

### 8.2. V2 (6-9 meses post-lanzamiento)

**Objetivo**: monetizar y escalar.

- Compra integrada en marketplace (Mercado Pago Marketplace)
- Liquidación automática a vendedores
- Welcome Box automatizado
- Suscripciones premium completas
- Servicios (veterinarias, paseadores) con reserva
- Sistema de reputación bidireccional avanzado
- App nativa iOS y Android
- Estadísticas avanzadas
- Integración con servicios de envío (Andreani, OCA)
- Expansión geográfica al resto del país

### 8.3. V3 (12+ meses post-lanzamiento)

**Objetivo**: convertirse en plataforma referente de LATAM.

- Expansión a Uruguay, Chile, México
- Multi-idioma y multi-moneda
- Wallet propia
- Integración con e-commerce externos (Tienda Nube, Shopify)
- Comunidad social (foros, grupos, eventos)
- Programa de afiliados
- IA avanzada para matching
- Recordatorios inteligentes de salud
- API pública

---

## 9. Glosario

- **Adoptante**: usuario final que busca adoptar o comprar.
- **Refugio**: organización o persona que rescata mascotas y las da en adopción.
- **Vendedor**: comercio del rubro mascotas.
- **Postulación**: solicitud de un adoptante para adoptar una mascota.
- **Welcome Box**: kit de bienvenida pago para nuevos adoptantes.
- **Manada**: conjunto de mascotas adoptadas por un usuario.
- **Match**: cuando una mascota encaja con las preferencias del adoptante.
- **Verificación**: validación manual de refugios y vendedores.
- **Sello "verificado"**: distintivo visual de cuenta validada.

---

**Documento vivo. Versión 1.0 — Abril 2026.**
