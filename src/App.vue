<script setup lang="ts">
import { ref, computed } from 'vue';
import ProductList from './components/ProductList.vue';
import PaymentForm from './components/PaymentForm.vue';
import { RouterView } from 'vue-router';

const productListRef = ref();
const cartTotal = computed(() => {
  return productListRef.value?.getTotal() || 0;
});
</script>

<template>
  <RouterView />
  <div class="app-container">
    <header class="app-header">
      <h1>NetSock Security Solutions</h1>
      <p class="subtitle">VPN • Proxies • Mobile Security</p>
    </header>
    <ProductList ref="productListRef" />
    <PaymentForm :amount="cartTotal" />
  </div>
</template>

<style>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.app-header {
  text-align: center;
  margin-bottom: 40px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.subtitle {
  color: #666;
  font-size: 1.2em;
}

body {
  background-color: #f8f9fa;
  color: #2c3e50;
}
</style>