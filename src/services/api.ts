import axios from 'axios'
import type { Mahasiswa } from '@/types/Mahasiswa'

const api = axios.create({
  baseURL: '/api',
})

export const getMahasiswaList = () => api.get('/mahasiswa')
export const getMahasiswa = (id: number) => api.get(`/mahasiswa?id=${id}`)
export const createMahasiswa = (mahasiswa: Mahasiswa) => api.post('/mahasiswa', mahasiswa)
export const updateMahasiswa = (mahasiswa: Mahasiswa) => api.put('/mahasiswa', mahasiswa)
export const deleteMahasiswa = (id: number) => api.delete(`/mahasiswa?id=${id}`)

export default api
