# NetSock Security Solutions

Pagina web desarrollada para la empresa NetSock que demuestra mis conocimientos de Vue y stripe con,TypeScript.

## Requisitos Previos

- Node.js (versión 16 o superior)
- npm (incluido con Node.js)

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/Santinou1/VUE-STRIPE.git
cd <nombre-del-directorio>
```

2. Instalar dependencias:
```bash
npm install
```

## Configuración

El proyecto requiere dos servidores:

### Frontend (Vite + Vue)
- Puerto por defecto: 5173
- Ejecutar en modo desarrollo:
```bash
npm run dev
```

### Backend (Express + Stripe)
- Puerto por defecto: 3000
- Ejecutar el servidor:
```bash
npm run server
```

## Ejecución del Proyecto

1. Iniciar el servidor backend:
```bash
npm run server
```

2. En otra terminal, iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Testeo de pasarela Stripe.

Datos de la tarjeta mock que hay que utlizar son :

card : 4242 4242 4242 4242
cvv: random
date: random


## Funcionalidades

- Catálogo de productos de seguridad digital
- Carrito de compras
- Procesamiento de pagos con Stripe
- Interfaz responsive

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo       
- `npm run server`: Inicia el servidor backend

## Estructura del Proyecto

```
src/
├── components/     # Componentes Vue
├── views/         # Vistas/páginas
├── router/        # Configuración de rutas
├── App.vue        # Componente raíz
└── main.ts        # Punto de entrada
```

## Tecnologías Utilizadas

- Vue 3
- TypeScript
- Vite
- Express
- Stripe
- Vue Router