<template>
  <div>
    <div class="container py-4">
      <h1 class="mb-4 text-center">Sistem Pendaftaran Mahasiswa</h1>

      <MahasiswaForm
        :mahasiswaId="selectedMahasiswaId"
        @submit="handleSubmit"
        @reset="handleReset"
      />

      <MahasiswaList
        :mahasiswa-list="mahasiswaList"
        :loading="loading"
        :error="error"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MahasiswaForm from '@/components/MahasiswaForm.vue'
import MahasiswaList from '@/components/MahasiswaList.vue'
import useMahasiswa from '@/composables/useMahasiswa'

const { mahasiswaList, loading, error, fetchMahasiswa, submitMahasiswa, removeMahasiswa } =
  useMahasiswa()

const selectedMahasiswaId = ref<number | undefined>(undefined)

onMounted(() => {
  fetchMahasiswa()
})

const handleSubmit = async (mahasiswa: any) => {
  const success = await submitMahasiswa(
    {
      ...mahasiswa,
      id: selectedMahasiswaId.value,
    },
    selectedMahasiswaId.value !== undefined,
  )

  if (success) {
    selectedMahasiswaId.value = undefined
  }
}

const handleEdit = (id: number) => {
  selectedMahasiswaId.value = id
}

const handleDelete = async (id: number) => {
  await removeMahasiswa(id)
}

const handleReset = () => {
  selectedMahasiswaId.value = undefined
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
