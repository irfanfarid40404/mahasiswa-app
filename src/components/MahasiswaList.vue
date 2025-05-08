<template>
  <div class="card shadow mt-4">
    <div class="card-header bg-primary text-white">
      <h5 class="card-title mb-0">
        <i class="bi bi-people-fill me-2"></i>
        Daftar Mahasiswa
      </h5>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-light">
            <tr>
              <th>NIM</th>
              <th>Nama</th>
              <th>Jurusan</th>
              <th>Angkatan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="5" class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="error">
              <td colspan="5" class="text-center text-danger py-4">
                {{ error }}
              </td>
            </tr>
            <tr v-else-if="mahasiswaList.length === 0">
              <td colspan="5" class="text-center text-muted py-4">Tidak ada data mahasiswa</td>
            </tr>
            <tr v-for="mhs in mahasiswaList" :key="mhs.id">
              <td>{{ mhs.nim }}</td>
              <td>{{ mhs.nama }}</td>
              <td>{{ mhs.jurusan }}</td>
              <td>{{ mhs.angkatan }}</td>
              <td>
                <button @click="$emit('edit', mhs.id)" class="btn btn-sm btn-outline-primary me-2">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button @click="$emit('delete', mhs.id)" class="btn btn-sm btn-outline-danger">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Mahasiswa } from '@/types/Mahasiswa'

defineProps<{
  mahasiswaList: Mahasiswa[]
  loading: boolean
  error: string | null
}>()

defineEmits(['edit', 'delete'])
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}
.table {
  min-width: 800px;
}
</style>


