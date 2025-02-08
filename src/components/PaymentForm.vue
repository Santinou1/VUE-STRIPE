<script setup lang="ts">
import { ref } from 'vue';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Qpzz6CRuzx7cMhpdIUCnuDJlDkTeBOT7auQYbfRczdH8ou3SbN5XgUq8hY3qhgS8cbSrZ7Qb8LT9ysZFHb8iZh300Hy9wNlDm');
const loading = ref(false);
const error = ref<string | null>(null);

const props = defineProps<{
  amount: number;
}>();

const handlePayment = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch('http://localhost:3000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceAmount: Math.round(props.amount * 100),
        productName: 'NetSock Security Bundle',
        success_url: `${window.location.origin}/success`,
        cancel_url: `${window.location.origin}/cancel`
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error en el servidor');
    }

    const session = await response.json();

    const stripe = await stripePromise;
    if (!stripe) throw new Error('No se pudo cargar Stripe');

    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Ocurrió un error inesperado';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="payment-form" v-if="amount > 0">
    <button 
      @click="handlePayment" 
      :disabled="loading"
      class="payment-button"
    >
      {{ loading ? 'Procesando...' : `Proceder al Pago ($${amount}/mes)` }}
    </button>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.payment-form {
  margin-top: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.payment-button {
  width: 100%;
  padding: 16px;
  background-color: #635bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.payment-button:hover:not(:disabled) {
  background-color: #4b44c9;
}

.payment-button:disabled {
  background-color: #a8a8a8;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  margin-top: 15px;
  padding: 12px;
  background-color: #fff3f3;
  border-radius: 6px;
  text-align: center;
}
</style>