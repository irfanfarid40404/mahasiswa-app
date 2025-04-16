import { createRouter, createWebHistory } from 'vue-router';
import MahasiswaDaftar from '@/views/MahasiswaDaftar.vue';
import MahasiswaList from '@/views/MahasiswaList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pendaftaran',
      component: MahasiswaDaftar,
    },
    {
      path: '/daftar-mahasiswa',
      name: 'daftar-mahasiswa',
      component: MahasiswaList,
    },
  ],
});

export default router;
