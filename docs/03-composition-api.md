# Composition API en Vue.js

La Composition API es una forma de organizar la lógica de los componentes que ofrece mejor reutilización y organización del código.

## setup Script

El script setup es el punto de entrada para la Composition API.

### Ejemplo de Nuestro Proyecto
```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
// Código del componente
</script>
```

## ref vs reactive

### ref
Para valores primitivos y objetos. Requiere `.value` en JavaScript.

#### Ejemplo de Nuestro Proyecto
```vue
<!-- En ProductList.vue -->
const cart = ref<Product[]>([]);
const loading = ref(false);

// Modificar valores
cart.value.push(newProduct);
loading.value = true;
```

### reactive
Para objetos complejos. No requiere `.value`.

```typescript
const state = reactive({
  products: [],
  filters: {
    type: 'all',
    priceRange: [0, 100]
  }
});
```

## computed

Propiedades calculadas que se actualizan automáticamente.

### Ejemplo de Nuestro Proyecto
```vue
<!-- En App.vue -->
const cartTotal = computed(() => {
  return productListRef.value?.getTotal() || 0;
});
```

## watch y watchEffect

### watch
Observa cambios específicos y reacciona a ellos.

#### Ejemplo de Nuestro Proyecto
```typescript
watch(cart, (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart));
});
```

### watchEffect
Se ejecuta inmediatamente y rastrea dependencias automáticamente.

```typescript
watchEffect(() => {
  console.log('Total del carrito:', cartTotal.value);
});
```

## Lifecycle Hooks

### onMounted
Se ejecuta cuando el componente se monta.

#### Ejemplo de Nuestro Proyecto
```vue
<!-- En Success.vue -->
onMounted(() => {
  localStorage.removeItem('cart');
});
```

## Composables

Funciones que encapsulan lógica reutilizable.

### Ejemplo
```typescript
// useCart.ts
export function useCart() {
  const items = ref([]);
  
  const addItem = (item) => {
    items.value.push(item);
  };
  
  const total = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price, 0);
  });
  
  return {
    items,
    addItem,
    total
  };
}
```