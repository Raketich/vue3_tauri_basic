<script setup lang="ts">
import { ref, computed } from 'vue';
import SearchComponent from '../components/SearchComponent.vue';
import ThemeSwitcher from '../components/ThemeSwitcher.vue';
import { useNamesStore } from '../stores/names';

const namesStore = useNamesStore();
const searchTerm = ref('');
const filteredNames = computed(() => namesStore.getFilteredNames(searchTerm.value));

const handleSearchUpdate = (value: string) => {
  searchTerm.value = value;
};

const handleNameSelect = (name: string) => {
  console.log(`Selected name: ${name}`);
};
</script>

<template>
  <div class="page-container">
    <header class="header">
      <h1>Name Search</h1>
      <div class="nav-controls">
        <router-link to="/" class="nav-link">Back to Home</router-link>
        <ThemeSwitcher />
      </div>
    </header>

    <main class="container">
      <div class="search-container">
        <h2>Search for Names</h2>
        <p>Type to search through our database of names</p>
        <SearchComponent 
          :filtered-names="filteredNames" 
          @update:search="handleSearchUpdate" 
          @select="handleNameSelect" 
        />
      </div>
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

.search-container {
  min-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.container {
  flex: 1;
  padding: 2rem;
}

@media (prefers-color-scheme: dark) {
  .header {
    background-color: rgba(47, 47, 47, 0.7);
  }
  
  .search-container {
    background-color: rgba(47, 47, 47, 0.8);
  }
}
</style>