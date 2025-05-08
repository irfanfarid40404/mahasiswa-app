<template>
  <div class="card shadow">
    <div class="card-header bg-primary text-white">
      <h5 class="card-title mb-0">
        <i class="bi bi-person-plus me-2"></i>
        {{ isEdit ? 'Edit Data Mahasiswa' : 'Form Pendaftaran Mahasiswa' }}
      </h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="handleSubmit">
        <div class="row g-3">
          <div class="col-md-6">
            <label for="nim" class="form-label">NIM</label>
            <input type="text" class="form-control" id="nim" v-model="form.nim" required />
          </div>
          <div class="col-md-6">
            <label for="nama" class="form-label">Nama Lengkap</label>
            <input type="text" class="form-control" id="nama" v-model="form.nama" required />
          </div>
          <div class="col-md-6">
            <label for="jurusan" class="form-label">Jurusan</label>
            <select class="form-select" id="jurusan" v-model="form.jurusan" required>
              <option value="">Pilih Jurusan</option>
              <option value="Teknik Informatika">Teknik Informatika</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
              <option value="Teknik Elektro">Teknik Elektro</option>
              <option value="Teknik Mesin">Teknik Mesin</option>
              <option value="Manajemen">Manajemen</option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="angkatan" class="form-label">Angkatan</label>
            <input
              type="number"
              class="form-control"
              id="angkatan"
              v-model="form.angkatan"
              min="2000"
              max="2099"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="form.email" required />
          </div>
          <div class="col-md-6">
            <label for="no_hp" class="form-label">No. HP</label>
            <input type="tel" class="form-control" id="no_hp" v-model="form.no_hp" required />
          </div>
          <div class="col-12">
            <label for="alamat" class="form-label">Alamat</label>
            <textarea class="form-control" id="alamat" rows="3" v-model="form.alamat"></textarea>
          </div>
          <div class="col-12 d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-secondary" @click="resetForm" v-if="isEdit">
              Batal
            </button>
            <button type="submit" class="btn btn-primary">
              {{ isEdit ? 'Update Data' : 'Daftarkan Mahasiswa' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Mahasiswa } from '@/types/Mahasiswa'
import { getMahasiswa } from '@/services/api'

const props = defineProps<{
  mahasiswaId?: number
}>()

const emit = defineEmits(['submit', 'reset'])

const form = ref<Omit<Mahasiswa, 'id' | 'created_at'>>({
  nim: '',
  nama: '',
  jurusan: '',
  angkatan: new Date().getFullYear(),
  email: '',
  no_hp: '',
  alamat: '',
})

const isEdit = ref(false)

const fetchMahasiswa = async (id: number) => {
  try {
    const response = await getMahasiswa(id)
    form.value = {
      nim: response.data.nim,
      nama: response.data.nama,
      jurusan: response.data.jurusan,
      angkatan: response.data.angkatan,
      email: response.data.email,
      no_hp: response.data.no_hp,
      alamat: response.data.alamat,
    }
    isEdit.value = true
  } catch (error) {
    console.error('Error fetching mahasiswa:', error)
  }
}

const handleSubmit = () => {
  emit('submit', { ...form.value })
}

const resetForm = () => {
  form.value = {
    nim: '',
    nama: '',
    jurusan: '',
    angkatan: new Date().getFullYear(),
    email: '',
    no_hp: '',
    alamat: '',
  }
  isEdit.value = false
  emit('reset')
}

watch(
  () => props.mahasiswaId,
  (newId) => {
    if (newId) {
      fetchMahasiswa(newId)
    } else {
      resetForm()
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.card-header {
  padding: 1rem 1.5rem;
}
</style>
