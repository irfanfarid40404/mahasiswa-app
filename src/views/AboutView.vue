<template>
  <div class="container py-4">
    <div class="card shadow">
      <div class="card-header bg-primary text-white">
        <h5 class="card-title mb-0">
          <i class="bi bi-info-circle me-2"></i>
          Tentang Aplikasi
        </h5>
      </div>
      <div class="card-body">
        <h3>Sistem Pendaftaran Mahasiswa</h3>
        <p class="lead">
          Aplikasi ini dibuat untuk mempermudah proses pendaftaran dan manajemen data mahasiswa.
        </p>
        <div class="row mt-4">
          <div class="col-md-6">
            <h5>Fitur Utama:</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                Pendaftaran mahasiswa baru
              </li>
              <li class="list-group-item">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                Manajemen data mahasiswa
              </li>
              <li class="list-group-item">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                Pencarian dan filter data
              </li>
              <li class="list-group-item">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                Sistem berbasis web modern
              </li>
            </ul>
          </div>
          <div class="col-md-6">
            <h5>Teknologi:</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <i class="bi bi-code-square text-primary me-2"></i>
                Vue.js 3 dengan TypeScript
              </li>
              <li class="list-group-item">
                <i class="bi bi-bootstrap-fill text-primary me-2"></i>
                Bootstrap 5
              </li>
              <li class="list-group-item">
                <i class="bi bi-cloud-fill text-primary me-2"></i>
                Cloudflare Pages + D1 Database
              </li>
              <li class="list-group-item">
                <i class="bi bi-github text-primary me-2"></i>
                Wrangler untuk development
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.list-group-item {
  border-left: none;
  border-right: none;
}
</style>
