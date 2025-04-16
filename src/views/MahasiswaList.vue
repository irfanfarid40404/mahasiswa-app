<template>
  <div class="mahasiswa-list">
    <h1>Daftar Mahasiswa Terdaftar</h1>

    <div v-if="loading" class="loading">Memuat data...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>NIM</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Jurusan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mahasiswa in mahasiswaList" :key="mahasiswa.nim">
            <td>{{ mahasiswa.nim }}</td>
            <td>{{ mahasiswa.nama }}</td>
            <td>{{ mahasiswa.email }}</td>
            <td>{{ mahasiswa.jurusan }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

interface Mahasiswa {
  nama: string;
  nim: string;
  email: string;
  jurusan: string;
}

export default defineComponent({
  name: 'MahasiswaList',
  setup() {
    const mahasiswaList = ref<Mahasiswa[]>([]);
    const loading = ref(true);
    const error = ref('');

    const fetchData = async () => {
      try {
        const response = await fetch('/api/mahasiswa');
        if (!response.ok) {
          throw new Error('Gagal memuat data');
        }
        mahasiswaList.value = await response.json();
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'Terjadi kesalahan';
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchData);

    return {
      mahasiswaList,
      loading,
      error,
    };
  },
});
</script>

<style scoped>
.mahasiswa-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

.loading, .error {
  padding: 10px;
  margin-top: 20px;
  border-radius: 4px;
}

.loading {
  background-color: #f8f9fa;
  color: #495057;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
