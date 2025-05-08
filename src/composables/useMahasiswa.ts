import { ref } from 'vue'
import type { Mahasiswa } from '@/types/Mahasiswa'
import { getMahasiswaList, createMahasiswa, updateMahasiswa, deleteMahasiswa } from '@/services/api'
import Swal from 'sweetalert2'

export default function useMahasiswa() {
  const mahasiswaList = ref<Mahasiswa[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchMahasiswa = async () => {
    try {
      loading.value = true
      const response = await getMahasiswaList()
      mahasiswaList.value = response.data
    } catch (err) {
      error.value = 'Gagal memuat data mahasiswa'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const submitMahasiswa = async (mahasiswa: Mahasiswa, isEdit: boolean) => {
    try {
      if (isEdit && mahasiswa.id) {
        await updateMahasiswa(mahasiswa)
        Swal.fire('Sukses!', 'Data mahasiswa berhasil diperbarui', 'success')
      } else {
        await createMahasiswa(mahasiswa)
        Swal.fire('Sukses!', 'Mahasiswa baru berhasil ditambahkan', 'success')
      }
      await fetchMahasiswa()
      return true
    } catch (err) {
      error.value = isEdit ? 'Gagal memperbarui data' : 'Gagal menambahkan mahasiswa'
      Swal.fire('Error!', error.value, 'error')
      console.error(err)
      return false
    }
  }

  const removeMahasiswa = async (id: number) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
    })

    if (result.isConfirmed) {
      try {
        await deleteMahasiswa(id)
        await fetchMahasiswa()
        Swal.fire('Terhapus!', 'Data mahasiswa telah dihapus.', 'success')
      } catch (err) {
        Swal.fire('Error!', 'Gagal menghapus data mahasiswa', 'error')
        console.error(err)
      }
    }
  }

  return {
    mahasiswaList,
    loading,
    error,
    fetchMahasiswa,
    submitMahasiswa,
    removeMahasiswa,
  }
}
