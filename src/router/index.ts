import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import Success from '../views/Success.vue';

const routes = [
  {
    path: '/success',
    name: 'success',
    component: Success
  },
  {
    path: '/cancel',
    name: 'cancel',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;