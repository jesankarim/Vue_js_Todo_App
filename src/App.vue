<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
export default {}
</script>

<template>
  <header class="navbar">
    <div class="navbar-content">
      <RouterLink to="/" class="logo">MyApp</RouterLink>

      

      <nav class="nav-links">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/data" class="nav-link">Data</RouterLink>
        <RouterLink to="/addData" class="nav-link">Add Data</RouterLink>
      </nav>
    </div>
  </header>

  <main class="main-view">
    <RouterView />
  </main>
</template>

<style scoped>
.navbar {
  background-color: #2c3e50;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.logo {
  color: #ecf0f1;
  font-size: 1.6rem;
  font-weight: bold;
  text-decoration: none;
}



  display: flex;
  align-items: center;
  gap: 0.5rem;

.search-btn {
  background-color: #1abc9c;
  color: white;
  padding: 0.6rem 1rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.search-btn:hover {
  background-color: #0c7461;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: #ecf0f1;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #1abc9c;
}

.router-link-active {
  border-bottom: 2px solid #1abc9c;
}

.main-view {
  padding: 2rem;
  background-color: #f9f9f9;
  min-height: 80vh;
}
</style>
