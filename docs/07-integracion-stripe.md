# Integración con Stripe en Vue.js

Stripe es una plataforma de procesamiento de pagos que permite a las aplicaciones web aceptar pagos de forma segura. En este documento, explicaremos cómo se integra Stripe en nuestra aplicación Vue.js.

## Configuración Inicial

### 1. Instalación de Dependencias

```json
{
  "dependencies": {
    "@stripe/stripe-js": "^2.4.0",
    "stripe": "^14.14.0"
  }
}
```

### 2. Configuración del Backend (Express)

```javascript
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

const app = express();
const stripe = new Stripe('sk_test_...');  // Clave secreta de Stripe

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://tu-dominio.com'
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));
```

## Implementación del Frontend

### 1. Inicialización de Stripe

```typescript
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_...');  // Clave pública de Stripe
```

### 2. Componente de Pago (PaymentForm.vue)

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_...');
const loading = ref(false);
const error = ref<string | null>(null);

const props = defineProps<{
  amount: number;
}>();

const handlePayment = async () => {
  loading.value = true;
  error.value = null;

  try {
    // 1. Crear sesión de checkout
    const response = await fetch('http://localhost:3000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceAmount: Math.round(props.amount * 100), // Stripe usa centavos
        productName: 'NetSock Security Bundle',
        success_url: `${window.location.origin}/success`,
        cancel_url: `${window.location.origin}/cancel`
      })
    });

    if (!response.ok) {
      throw new Error('Error al crear la sesión de pago');
    }

    const session = await response.json();

    // 2. Redireccionar a Checkout
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Error al cargar Stripe');

    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error inesperado';
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
```

## Implementación del Backend

### 1. Endpoint de Creación de Sesión

```javascript
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceAmount, productName, success_url, cancel_url } = req.body;

    // Validación de datos
    if (!priceAmount || !productName) {
      return res.status(400).json({ 
        error: 'Se requieren priceAmount y productName' 
      });
    }

    // Crear sesión de Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
            },
            unit_amount: priceAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: success_url || `${req.headers.origin}/success`,
      cancel_url: cancel_url || `${req.headers.origin}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: `Error al crear la sesión: ${error.message}` 
    });
  }
});
```

## Manejo de Eventos Post-Pago

### 1. Vista de Éxito (Success.vue)

```vue
<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  // Limpiar carrito después del pago exitoso
  localStorage.removeItem('cart');
});
</script>

<template>
  <div class="success-container">
    <div class="success-card">
      <div class="success-icon">✓</div>
      <h1>¡Pago Exitoso!</h1>
      <p>Gracias por tu compra</p>
    </div>
  </div>
</template>
```

## Mejores Prácticas

1. **Seguridad**
   - Nunca exponer la clave secreta de Stripe en el frontend
   - Validar todos los datos antes de crear una sesión
   - Usar HTTPS en producción
   - Implementar CORS adecuadamente

2. **Experiencia de Usuario**
   - Mostrar estados de carga
   - Manejar errores apropiadamente
   - Proporcionar feedback claro al usuario

3. **Mantenimiento**
   - Usar variables de entorno para las claves de API
   - Mantener las dependencias actualizadas
   - Documentar los procesos de pago

4. **Testing**
   - Usar el modo de prueba de Stripe
   - Probar diferentes escenarios de pago
   - Verificar el manejo de errores
