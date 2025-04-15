<script setup>
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";
import ThemeSwitcher from "../components/ThemeSwitcher.vue";

const greetMsg = ref("");
const name = ref("");

async function greet() {
  greetMsg.value = await invoke("greet", { name: name.value });
}
</script>

<template>
  <div class="page-container">
    <header class="header">
      <h1>Welcome to Tauri + Vue</h1>
      <div class="nav-controls">
        <router-link to="/search" class="nav-link">Go to Search</router-link>
        <ThemeSwitcher />
      </div>
    </header>

    <main class="container">
      <div class="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" class="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
          <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and Vue logos to learn more.</p>

      <form class="row" @submit.prevent="greet">
        <input id="greet-input" v-model="name" placeholder="Enter a name..." />
        <button type="submit">Greet</button>
      </form>
      <p>{{ greetMsg }}</p>
    </main>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: #646cff;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #535bf2;
}

.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}

@media (prefers-color-scheme: dark) {
  .header {
    background-color: rgba(47, 47, 47, 0.7);
  }
}
</style>