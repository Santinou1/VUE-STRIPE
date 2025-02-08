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

const products: Product[] = [
  { 
    id: 1, 
    name: "NetSock VPN Premium", 
    price: 12.99, 
    description: "VPN seguro y de alta velocidad", 
    features: [
      "Servidores en 90+ países",
      "Sin logs de actividad",
      "Encriptación AES-256",
      "Kill switch automático"
    ],
    type: 'vpn'
  },
  { 
    id: 2, 
    name: "Proxy Enterprise", 
    price: 24.99, 
    description: "Proxies dedicados para empresas", 
    features: [
      "IPs dedicadas",
      "Rotación automática",
      "Soporte 24/7",
      "API REST completa"
    ],
    type: 'proxy'
  },
  { 
    id: 3, 
    name: "MobiSec Shield", 
    price: 9.99, 
    description: "Seguridad móvil avanzada", 
    features: [
      "Antivirus integrado",
      "Firewall móvil",
      "Protección de datos",
      "Control parental"
    ],
    type: 'mobile'
  },
  { 
    id: 4, 
    name: "NetSock Bundle", 
    price: 39.99, 
    description: "Solución completa de seguridad", 
    features: [
      "VPN Premium",
      "Proxy Enterprise",
      "MobiSec Shield",
      "Soporte prioritario"
    ],
    type: 'vpn'
  }
];

const cart = ref<Product[]>([]);

const addToCart = (product: Product) => {
  cart.value.push(product);
};

const removeFromCart = (index: number) => {
  cart.value.splice(index, 1);
};

const getTotal = (): number => {
  return Number(cart.value.reduce((sum, product) => sum + product.price, 0).toFixed(2));
};

const formatPrice = (price: number): string => {
  return price.toFixed(2);
};

defineExpose({ cart, getTotal });
</script>

<template>
  <div class="products-container">
    <div class="products-list">
      <h2>Soluciones de Seguridad NetSock</h2>
      <div class="products-grid">
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="product-card"
          :class="product.type"
        >
          <div class="product-type">{{ product.type.toUpperCase() }}</div>
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <ul class="features-list">
            <li v-for="feature in product.features" :key="feature">
              {{ feature }}
            </li>
          </ul>
          <p class="price">${{ formatPrice(product.price) }}/mes</p>
          <button @click="addToCart(product)" class="add-button">
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>

    <div class="cart-section">
      <h2>Carrito de Compras</h2>
      <div v-if="cart.length === 0" class="empty-cart">
        Tu carrito está vacío
      </div>
      <div v-else class="cart-items">
        <div v-for="(item, index) in cart" :key="index" class="cart-item">
          <span>{{ item.name }}</span>
          <span>${{ formatPrice(item.price) }}</span>
          <button @click="removeFromCart(index)" class="remove-button">
            Eliminar
          </button>
        </div>
        <div class="cart-total">
          <strong>Total: ${{ formatPrice(getTotal()) }}/mes</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.products-container {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.products-list {
  flex: 2;
}

.cart-section {
  flex: 1;
  min-width: 300px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.product-card {
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 12px;
  background: white;
  position: relative;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-type {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8em;
  font-weight: bold;
}

.vpn .product-type {
  background-color: #e3f2fd;
  color: #1976d2;
}

.proxy .product-type {
  background-color: #f3e5f5;
  color: #7b1fa2;
}

.mobile .product-type {
  background-color: #e8f5e9;
  color: #388e3c;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.features-list li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.features-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #4caf50;
}

.price {
  font-size: 1.4em;
  font-weight: bold;
  color: #635bff;
  margin: 1rem 0;
}

.add-button {
  background-color: #635bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #4b44c9;
}

.cart-items {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background: white;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}

.remove-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: #c82333;
}

.cart-total {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #eee;
  text-align: right;
  font-size: 1.2em;
}

.empty-cart {
  text-align: center;
  padding: 2rem;
  color: #666;
  background: white;
  border-radius: 8px;
  border: 1px solid #ddd;
}
</style>