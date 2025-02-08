# Gestión de Estado en Vue.js

La gestión de estado es crucial en aplicaciones Vue. Veamos las diferentes formas de manejar el estado.

## Estado Local

El estado local se maneja dentro de un componente usando `ref` o `reactive`.

### Ejemplo de Nuestro Proyecto
```vue
<!-- En ProductList.vue -->
<script setup lang="ts">
import { ref } from 'vue';

const cart = ref<Product[]>([]);

const addToCart = (product: Product) => {
  cart.value.push(product);
};

const removeFromCart = (index: number) => {
  cart.value.splice(index, 1);
};

const getTotal = (): number => {
  return Number(cart.value.reduce((sum, product) => 
    sum + product.price, 0).toFixed(2));
};
</script>
```

## Props y Eventos

Para comunicación entre componentes.

### Ejemplo de Nuestro Proyecto
```vue
<!-- PaymentForm.vue -->
<script setup lang="ts">
const props = defineProps<{
  amount: number;
}>();

const emit = defineEmits(['payment-success']);
</script>

<!-- App.vue -->
<PaymentForm 
  :amount="cartTotal"
  @payment-success="handleSuccess"
/>
```

## Provide/Inject

Para pasar datos a componentes profundamente anidados.

```typescript
// En un componente padre
provide('cartKey', {
  items: cart,
  addItem: addToCart
});

// En un componente hijo
const { items, addItem } = inject('cartKey');
```

## Estado Global

Para aplicaciones más grandes, se recomienda usar Pinia (el store oficial de Vue).

### Ejemplo de Store
```typescript
// stores/cart.ts
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    loading: false
  }),
  
  getters: {
    total: (state) => {
      return state.items.reduce((sum, item) => sum + item.price, 0);
    }
  },
  
  actions: {
    addItem(item) {
      this.items.push(item);
    },
    
    removeItem(id) {
      const index = this.items.findIndex(item => item.id === id);
      if (index > -1) {
        this.items.splice(index, 1);
      }
    }
  }
});
```

## Persistencia de Estado

### LocalStorage
```typescript
// Guardar estado
watch(cart, (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart));
}, { deep: true });

// Recuperar estado
onMounted(() => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart.value = JSON.parse(savedCart);
  }
});
``` 