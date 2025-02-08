# Directivas Básicas en Vue.js

Las directivas son atributos especiales que proporcionan funcionalidad reactiva a los elementos HTML.

## v-bind (:)

Enlaza dinámicamente atributos HTML o props de componentes.

### Ejemplo de Nuestro Proyecto
```vue
<!-- En ProductList.vue -->
<div 
  :class="product.type"
  :key="product.id"
>
  <!-- El tipo de producto determina la clase CSS -->
</div>
```

## v-model

Crea un enlace bidireccional entre un input y una variable.

### Ejemplo de Nuestro Proyecto
```vue
<!-- En PaymentForm.vue -->
<input 
  v-model="amount" 
  type="number"
  class="payment-input"
>
```

## v-if vs v-show

### v-if
Condiciona la renderización del elemento. Si es falso, el elemento no se crea en el DOM.

### Ejemplo de Nuestro Proyecto
```vue
<!-- En PaymentForm.vue -->
<div class="payment-form" v-if="amount > 0">
  <!-- Solo se muestra si hay un monto a pagar -->
</div>
```

### v-show
Similar a v-if, pero solo toggle la visibilidad CSS.

### Ejemplo de Nuestro Proyecto
```vue
<div v-show="loading" class="loading-indicator">
  Procesando...
</div>
```

## v-for

Permite iterar sobre arrays y objetos.

### Ejemplo de Nuestro Proyecto
```vue
<!-- En ProductList.vue -->
<div 
  v-for="product in products" 
  :key="product.id" 
  class="product-card"
>
  <h3>{{ product.name }}</h3>
  <p>{{ product.description }}</p>
  <p class="price">${{ formatPrice(product.price) }}</p>
</div>
```

## v-on (@)

Maneja eventos del DOM.

### Ejemplo de Nuestro Proyecto
```vue
<!-- En ProductList.vue -->
<button @click="addToCart(product)" class="add-button">
  Agregar al Carrito
</button>
```

## Interpolación de Texto

Usa dobles llaves `{{ }}` para mostrar valores dinámicamente.

### Ejemplo de Nuestro Proyecto
```vue
<p class="price">${{ formatPrice(product.price) }}/mes</p>
```