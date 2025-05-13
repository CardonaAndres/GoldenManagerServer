# 📘 GoldenManager

Plataforma web en tiempo real para el análisis, monitoreo, predicción y comercialización del precio del oro en Colombia. Dirigida a joyerías e inversores, con capacidades de inteligencia artificial y análisis estadístico.

## 🎯 Objetivo General

Desarrollar una plataforma web en tiempo real para el análisis, monitoreo, predicción y comercialización del precio del oro en Colombia, con capacidades de inteligencia artificial y análisis estadístico, orientada tanto a joyerías como a inversores del sector.

---

## 🎯 Objetivos Específicos

- Obtener información del precio del oro en tiempo real desde fuentes confiables.
- Minimizar el uso de bases de datos; almacenar únicamente precios diarios para historial.
- Analizar tendencias del mercado usando modelos de IA/ML (Prophet, LSTM).
- Calcular precios por unidad de medida (gramo, onza, kilogramo).
- Calcular precios por quilataje (24K, 22K, 18K, etc.).
- Generar alertas personalizadas por cambios de precio significativos.
- Proporcionar gráficas y reportes detallados.
- Ofrecer predicciones de precios a futuro.
- Medir el índice de volatilidad del oro.
- Enviar notificaciones automáticas a los usuarios (email, WhatsApp, SMS).

---

## ⚙️ Tecnologías a Utilizar

### 🧱 Backend

- **NestJS (TypeScript):** Arquitectura modular, escalable, soporte WebSocket.
- **WebSockets (NestJS Gateway):** Comunicación en tiempo real.
- **PostgreSQL:** Base de datos relacional para historial diario, alertas, usuarios.
- **Python (microservicio):** Modelos de IA/ML (Prophet, LSTM).
- **REST & WebSocket APIs:** Para comunicación con frontend.

### 💻 Frontend

- **React + TypeScript**
- **Vite:** Compilación y desarrollo veloz.
- **Tailwind CSS:** Diseño moderno y flexible.
- **Chart.js / Recharts / ApexCharts:** Visualización de datos.
- **Socket.IO / WebSocket API:** Actualización en tiempo real.

### 🔗 Integraciones Externas

- **APIs públicas de precios del oro** (o scraping si es necesario)
- **Notificaciones:**
  - Email: SendGrid / Mailgun
  - WhatsApp: Twilio / WhatsApp Business API
  - SMS: Twilio / Nexmo

---

## 📦 Módulos del Proyecto

### 1. Módulo de Datos en Tiempo Real

- Conexión con fuente de precios del oro.
- Transmisión vía WebSocket.
- Adaptación a unidades: gramo, onza, kilo.
- Cálculo por quilataje.

### 2. Módulo de Historial

- Registro diario en la base de datos.
- Filtros por fecha.
- Gráficas interactivas.

### 3. Módulo de IA/ML

- Microservicio en Python (Prophet o LSTM).
- Entrenamiento con datos históricos.
- Predicciones de precios y tendencias.

### 4. Módulo de Alertas

- Configuración por usuario (valor o %).
- Envío por email, WhatsApp y SMS.
- Gestión desde el panel de usuario.

### 5. Módulo de Reportes

- Informes personalizados.
- Índice de volatilidad.
- Exportación en PDF / CSV.

### 6. Módulo de Autenticación y Usuarios

- Registro/Login con roles.
- Panel de usuario.
- Gestión de alertas y preferencias.

### 7. Módulo Comercial (Marketplace)

Compra/venta de productos de oro (joyas, lingotes, monedas).

#### Funcionalidades Principales

- Catálogo de productos
- Publicación por joyeros/vendedores
- Filtros por categoría, quilataje, peso, tipo, ubicación
- Gestión de inventario
- Carrito y checkout con pasarela de pago
- Generación de facturas
- Perfil de vendedor y reputación
- Soporte y resolución de disputas

#### Integraciones Comerciales

- **Pasarelas de pago:** MercadoPago, PayU, Stripe
- **Logística:** Coordinadora, InterRapidísimo, Servientrega
- **KYC (verificación de identidad):** Jumio, MetaMap

---

## 📊 Modelos de IA/ML

### Recomendados

- **Prophet (Facebook)**
  - Ideal para series temporales
  - Interpreta estacionalidades y eventos

- **LSTM (TensorFlow / PyTorch)**
  - Redes neuronales recurrentes
  - Buen desempeño en datos complejos

> Se recomienda comenzar con Prophet. LSTM puede añadirse en una etapa posterior.

---

## 🔔 Notificaciones

Configurables por usuario:

- Frecuencia: Tiempo real, diario o semanal
- Tipos:
  - Cambios bruscos (>X%)
  - Cruce de umbrales definidos
  - Predicciones relevantes

---

## 📅 Hoja de Ruta (Roadmap)

### 🟢 Fase 1 – MVP

- Base técnica (NestJS, React, Tailwind)
- Precios en tiempo real
- Cálculo por quilataje
- Registro histórico
- Gráficas básicas
- Autenticación básica

### 🟡 Fase 2

- Notificaciones por email
- Microservicio Prophet
- Integración de predicciones

### 🟠 Fase 3

- Alertas WhatsApp y SMS
- Reportes exportables
- Índice de volatilidad
- Panel avanzado

### 🔵 Fase 4

- Lanzamiento del módulo comercial
- Gestión de productos y pagos
- Checkout y seguimiento
- Certificación KYC/AML

---

## ✅ Buenas Prácticas

- Arquitectura modular (opcional: DDD + CQRS)
- Tipado estricto (frontend y backend)
- WebSockets con fallback a polling
- Contenedores Docker para ambientes reproducibles
- Logs estructurados y trazables
