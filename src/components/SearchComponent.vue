<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useClickOutside } from '../composables/useClickOutside'

const props = defineProps<{
  filteredNames: string[]
}>()

const emit = defineEmits<{
  'update:search': [value: string]
  'select': [name: string]
}>()

const searchInput = ref('')
const showDropdown = ref(false)
const debounceTimeout = ref<number | null>(null)
const selectedIndex = ref(-1)
const searchContainerRef = ref<HTMLElement | null>(null)
const hasInputText = computed(() => searchInput.value.trim() !== '')
const isSelecting = ref(false)
const isFocused = ref(false)

const hasResults = computed(() => props.filteredNames.length > 0)

const emitSearchUpdate = () => {
  if (debounceTimeout.value) {
    clearTimeout(debounceTimeout.value)
  }

  debounceTimeout.value = window.setTimeout(() => {
    if (searchInput.value.trim() === '') {
      showDropdown.value = false
      return
    }
    emit('update:search', searchInput.value)
    showDropdown.value = true
  }, 300)
}

watch(searchInput, () => {
  selectedIndex.value = -1

  if (searchInput.value.trim() === '') {
    showDropdown.value = false
    emit('update:search', '')
    return
  }

  if (isSelecting.value) {
    return
  }

  emitSearchUpdate()
})

const selectName = (name: string) => {
  isSelecting.value = true
  showDropdown.value = false
  searchInput.value = name
  selectedIndex.value = -1
  emit('select', name)

  if (debounceTimeout.value) {
    clearTimeout(debounceTimeout.value)
    debounceTimeout.value = null
  }

  setTimeout(() => {
    isSelecting.value = false
  }, 300)
}

const handleClearInput = () => {
  searchInput.value = ''
  emit('update:search', '')
  showDropdown.value = false
  selectedIndex.value = -1
}

const handleFocus = () => {
  isFocused.value = true
  if (searchInput.value.trim() !== '') {
    emitSearchUpdate()
  }
}

const handleBlur = () => {
  isFocused.value = false
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!showDropdown.value || !hasResults.value) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      selectedIndex.value = (selectedIndex.value + 1) % props.filteredNames.length
      break
    case 'ArrowUp':
      event.preventDefault()
      selectedIndex.value =
        selectedIndex.value <= 0 ? props.filteredNames.length - 1 : selectedIndex.value - 1
      break
    case 'Enter':
      if (selectedIndex.value >= 0 && selectedIndex.value < props.filteredNames.length) {
        selectName(props.filteredNames[selectedIndex.value])
        event.preventDefault()
      }
      break
    case 'Escape':
      showDropdown.value = false
      break
  }
}

useClickOutside(searchContainerRef, () => {
  showDropdown.value = false
})
</script>

<template>
  <div class="input-wrapper" ref="searchContainerRef">
    <div class="overlay" :class="{ active: isFocused }"></div>
    <input
      type="text"
      v-model="searchInput"
      placeholder="Search names..."
      class="search-input"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
    />
    <button
      v-if="hasInputText"
      class="clear-button"
      @click="handleClearInput()"
      type="button"
      aria-label="Clear search"
    >
      ×
    </button>

    <div v-if="showDropdown" class="dropdown">
      <ul v-if="hasResults" class="suggestions-list">
        <li
          v-for="(name, index) in props.filteredNames"
          :key="name"
          @click="selectName(name)"
          :class="['suggestion-item', { active: index === selectedIndex }]"
        >
          {{ name }}
        </li>
      </ul>
      <div v-else class="no-results">No results found</div>
    </div>
  </div>
</template>

<style>
.input-wrapper {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  z-index: 20;
}

@media (min-width: 768px) {
  .input-wrapper {
    max-width: 400px;
    margin: 0 auto;
  }
}

.search-input {
  width: 100%;
  padding: 14px 18px;
  padding-right: 40px;
  border: 2px solid var(--color-border);
  border-radius: 12px;
  font-size: 16px;
  outline: none;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 20;
}

.clear-button {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 22px;
  color: var(--color-text);
  opacity: 0.6;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  z-index: 25;
}

.clear-button:hover {
  opacity: 1;
  background-color: var(--color-background-soft);
}

.search-input:focus {
  border-color: var(--color-border-hover);
}

.dropdown {
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: var(--color-background);
  border: 2px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  z-index: 50;
  animation: fadeIn 0.2s ease;
}

.suggestions-list {
  list-style: none;
  padding: 4px;
  margin: 0;
  text-align: left;
}

.suggestion-item {
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-item:hover,
.suggestion-item:focus {
  background-color: var(--color-background-soft);
  border-radius: 8px;
}

.suggestion-item.active {
  background-color: var(--color-background-soft);
}

.no-results {
  padding: 12px 16px;
  color: var(--color-text);
  text-align: center;
  font-style: italic;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .input-wrapper {
    max-width: 100%;
    margin-top: 1rem;
    width: 100%;
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
  z-index: 10;
}

.overlay.active {
  opacity: 1;
  visibility: visible;
}
</style>
