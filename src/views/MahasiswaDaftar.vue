<template>
  <div class="pendaftaran-container">
    <h1>Pendaftaran Mahasiswa Baru</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="nama">Nama Lengkap:</label>
        <input id="nama" v-model="formData.nama" type="text" required />
      </div>

      <div class="form-group">
        <label for="nim">NIM:</label>
        <input id="nim" v-model="formData.nim" type="text" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" v-model="formData.email" type="email" required />
      </div>

      <div class="form-group">
        <label for="jurusan">Jurusan:</label>
        <select id="jurusan" v-model="formData.jurusan" required>
          <option value="">Pilih Jurusan</option>
          <option value="Teknik Informatika">Teknik Informatika</option>
          <option value="Sistem Informasi">Sistem Informasi</option>
          <option value="Teknik Elektro">Teknik Elektro</option>
          <option value="Teknik Mesin">Teknik Mesin</option>
        </select>
      </div>

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Mengirim...' : 'Daftar' }}
      </button>
    </form>

    <div v-if="submitSuccess" class="success-message">
      Pendaftaran berhasil! Data telah tersimpan.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

interface Mahasiswa {
  nama: string;
  nim: string;
  email: string;
  jurusan: string;
}

export default defineComponent({
  name: 'MahasiswaDaftar',
  setup() {
    const router = useRouter();
    const formData = ref<Mahasiswa>({
      nama: '',
      nim: '',
      email: '',
      jurusan: ''
    });

    const isSubmitting = ref(false);
    const submitSuccess = ref(false);

    const submitForm = async () => {
      isSubmitting.value = true;

      try {
        // Simpan data ke database Cloudflare D1
        const response = await fetch('/api/mahasiswa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData.value),
        });

        if (response.ok) {
          submitSuccess.value = true;
          formData.value = { nama: '', nim: '', email: '', jurusan: '' };
          setTimeout(() => {
            submitSuccess.value = false;
            router.push('/daftar-mahasiswa');
          }, 2000);
        } else {
          throw new Error('Gagal menyimpan data');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menyimpan data');
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      formData,
      isSubmitting,
      submitSuccess,
      submitForm,
    };
  },
});
</script>

<style scoped>
.pendaftaran-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #42b983;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
}

.success-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #dff0d8;
  color: #3c763d;
  border-radius: 4px;
}
</style>
