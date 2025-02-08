# Ejemplo Práctico: NetSock Security Solutions

Este ejemplo práctico demuestra una tienda de servicios de seguridad digital implementada con Vue.js.

## Características Implementadas

### 1. Componentes Principales

#### App.vue (Componente Raíz)
```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import ProductList from './components/ProductList.vue';
import PaymentForm from './components/PaymentForm.vue';

const productListRef = ref();
const cartTotal = computed(() => {
  return productListRef.value?.getTotal() || 0;
});
</script>

<template>
  <div class="app-container">
    <ProductList ref="productListRef" />
    <PaymentForm :amount="cartTotal" />
  </div>
</template>
```

#### ProductList.vue (Catálogo de Productos)
```vue
<script setup lang="ts">
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  type: 'vpn' | 'proxy' | 'mobile';
}

const cart = ref<Product[]>([]);
const addToCart = (product: Product) => {
  cart.value.push(product);
};
</script>

<template>
  <div class="products-grid">
    <div 
      v-for="product in products" 
      :key="product.id"
      class="product-card"
    >
      <!-- Contenido del producto -->
    </div>
  </div>
</template>
```

### 2. Integración con Stripe

#### PaymentForm.vue
```vue
<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('tu_clave_publica');
const handlePayment = async () => {
  const stripe = await stripePromise;
  // Lógica de pago
};
</script>
```

### 3. Routing con Vue Router

#### router/index.ts
```typescript
import { createRouter, createWebHistory } from 'vue-router';
import Success from '../views/Success.vue';

const routes = [
  {
    path: '/success',
    component: Success
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
```

## Conceptos Vue.js Demostrados

1. **Composition API**
   - `ref` para estado reactivo
   - `computed` para valores calculados
   - `setup` script

2. **Componentes**
   - Comunicación padre-hijo
   - Props tipadas con TypeScript
   - Eventos personalizados

3. **TypeScript**
   - Interfaces para tipos
   - Tipado de props y eventos
   - Mejora de la seguridad del código

4. **Directivas Vue**
   - `v-for` para listas
   - `v-if` para renderizado condicional
   - `v-bind` para atributos dinámicos

5. **Estilos**
   - Scoped CSS
   - Clases dinámicas
   - Diseño responsive

## Estructura del Proyecto
```
src/
├── components/
│   ├── ProductList.vue
│   ├── PaymentForm.vue
│   └── Success.vue
├── router/
│   └── index.ts
├── App.vue
└── main.ts
```

Este ejemplo práctico demuestra cómo los diferentes conceptos de Vue.js se combinan para crear una aplicación funcional y mantenible.