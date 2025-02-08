# Componentes y Props en Vue.js

## Componentes

Los componentes son bloques reutilizables que encapsulan lógica y UI.

### Estructura de un Componente Vue
```vue
<!-- ProductList.vue -->
<script setup lang="ts">
// Lógica del componente
</script>

<template>
<!-- Template HTML -->
</template>

<style scoped>
/* Estilos del componente */
</style>
```

### Ejemplo de Nuestro Proyecto

Nuestro proyecto utiliza varios componentes:
- `ProductList.vue`: Lista de productos
- `PaymentForm.vue`: Formulario de pago
- `Success.vue`: Vista de éxito

## Props

Las props son la forma de pasar datos de un componente padre a un hijo.

### Definición de Props con TypeScript

```vue
<!-- En PaymentForm.vue -->
<script setup lang="ts">
const props = defineProps<{
  amount: number;
}>();
</script>
```

### Uso de Props

```vue
<!-- En App.vue -->
<PaymentForm :amount="cartTotal" />
```

## Comunicación entre Componentes

### Padre a Hijo (Props)
```vue
<!-- App.vue (Padre) -->
<ProductList ref="productListRef" />

<!-- ProductList.vue (Hijo) -->
const props = defineProps<{
  // definición de props
}>();
```

### Hijo a Padre (Eventos)
```vue
<!-- Hijo -->
const emit = defineEmits(['update']);
emit('update', newValue);

<!-- Padre -->
<ComponenteHijo @update="handleUpdate" />
```

### Referencias a Componentes
```vue
<!-- En App.vue -->
const productListRef = ref();
const cartTotal = computed(() => {
  return productListRef.value?.getTotal() || 0;
});
```

## Ejemplo Completo de Nuestro Proyecto

### ProductList.vue
```vue
<script setup lang="ts">
import { ref } from 'vue';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  type: 'vpn' | 'proxy' | 'mobile';
}

const cart = ref<Product[]>([]);

defineExpose({ cart, getTotal });
</script>

<template>
  <div class="products-container">
    <!-- Contenido del componente -->
  </div>
</template>
```