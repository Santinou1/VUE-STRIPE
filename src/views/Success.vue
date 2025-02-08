<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const returnToStore = () => {
  router.push('/');
};

onMounted(() => {
  // Limpiar el carrito o realizar otras acciones necesarias
  localStorage.removeItem('cart');
});
</script>

<template>
  <div class="success-container">
    <div class="success-card">
      <div class="success-icon">✓</div>
      <h1>¡Pago Exitoso!</h1>
      <p>Gracias por confiar en NetSock Security Solutions</p>
      
      <div class="next-steps">
        <h2>Próximos Pasos</h2>
        <ul>
          <li>Recibirás un email con los detalles de tu compra</li>
          <li>Instrucciones de configuración en tu panel de control</li>
          <li>Acceso inmediato a tus servicios contratados</li>
        </ul>
      </div>

      <div class="support-info">
        <p>¿Necesitas ayuda?</p>
        <p>Nuestro equipo de soporte está disponible 24/7</p>
        <p>Email: support@netsock.com</p>
      </div>

      <button @click="returnToStore" class="return-button">
        Volver a la Tienda
      </button>
    </div>
  </div>
</template>

<style scoped>
.success-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f8f9fa;
}

.success-card {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  width: 100%;
}

.success-icon {
  font-size: 4rem;
  color: #4caf50;
  margin-bottom: 1rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.next-steps {
  margin: 2rem 0;
  text-align: left;
}

.next-steps h2 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.next-steps ul {
  list-style: none;
  padding: 0;
}

.next-steps li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.next-steps li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #4caf50;
}

.support-info {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.return-button {
  background-color: #635bff;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.return-button:hover {
  background-color: #4b44c9;
}
</style>    