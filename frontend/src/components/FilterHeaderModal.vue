<template>
  <div class="filter-container">
    <div class="search-container">
      <input v-model="localSearchTerm" type="text" placeholder="Search by title..." class="filter-search" @input="updateSearch"/>
    </div>

    <h2 class="title-header">既存</h2>
      <div class="filter-wrapper">
        <label class="filter-label">
            <select v-model="localSelected" @change="updateFilter" class="filter-dropdown">
                <option value="">All Shows</option>
                <option value="watching">Watching</option>
                <option value="completed">Completed</option>
                <option value="on%20hold">On Hold</option>
                <option value="dropped">Dropped</option>
                <option value="plan%20to%20watch">Plan to Watch</option>
            </select>
        </label>
        </div>
    </div>
</template>

<script setup>

import { ref, watch } from 'vue';

const emit = defineEmits(['filterShows', 'submitSearch']);

// define props
const props = defineProps({
    selected: {
        type: String
    },
    searchTerm: {
        type: String,
        default: undefined
    }
});

const localSelected = ref(props.selected || '');

const localSearchTerm = ref(props.searchTerm || '');

watch(() => props.selected, (newVal) => {
    localSelected.value = newVal;
});

watch(() => props.searchTerm, (newVal) => {
    localSearchTerm.value = newVal;
});

const updateFilter = () => {
    emit('filterShows', localSelected.value);
};

const updateSearch = () => {
    emit('submitSearch', localSearchTerm.value);
};

</script>

<style scoped>
.title-header {
  grid-column: 2;
  justify-self: center; /* Center the header */
  text-align: center;
  font-size: 28px;
  color: white;
  margin: 0 20px; /* Add some margin on sides */
  text-shadow: 8px 1px 2px rgb(48, 39, 39);
  transform: skewX(-8deg);
  z-index: 1;
}
.filter-container {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr; /* Three columns: left, center, right */
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  padding: 5px 0;
}

.filter-dropdown {
  background: #000000;
  color: white;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  text-transform: uppercase;
  border: 2px solid #00ffe7;
  padding: 8px 30px 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow:
    0 0 3px #00ffe7,
    0 0 1px #bafff7,
    0 0 4px #00ffff;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  transition: all 0.2s ease-in-out;
}

.filter-dropdown:hover, .filter-dropdown:focus {
  background: #001f1d;
  box-shadow:
    0 0 5px #00e0ff,
    0 0 1px #00ccff,
    0 0 5px #00baff,
    0 0 10px #00eaff inset;
  outline: none;
}

.filter-label {
  flex: 0 0 auto; /* Don't grow or shrink (fix typo from "filter: 0 0 auto") */
  position: relative;
}
.filter-wrapper {
  grid-column: 3;
  justify-self: end; /* Align to the right */
  display: flex;
  align-items: center;
}
.filter-label::after {
  content: "▼";
  font-size: 10px;
  color: white;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.filter-title {
  color: #00ffe7;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  text-transform: uppercase;
  margin-right: 10px;
  display: flex;
  align-items: center;
  text-shadow: 0 0 5px #00ffe7;
}
.search-container {
  grid-column: 1;
  justify-self: start; /* Align to the left */
  max-width: 180px;
  position: relative;
  display: flex;
}

.filter-search {
    background: #000000;
    color: white; /* Pink text to contrast with dropdown */
    font-family: 'Courier New', monospace;
    font-size: 14px;
    width: 180px;
    height: 17px; /* Match dropdown height */
    border: 2px solid #ff66c4; /* Pink border to contrast with dropdown */
    border-radius: 5px;
    padding: 8px 15px 8px 18px;
    box-shadow:
        0 0 3px #ff66c4,
        0 0 1px #f1c1df,
        0 0 4px #ff33b8;
    transition: all 0.2s ease-in-out;
}

.filter-search::placeholder {
    color: rgb(255, 255, 255);
    text-transform: uppercase;
}

.filter-search:focus {
    outline: none;
    background: #120012;
    box-shadow:
        0 0 5px #ff66c4,
        0 0 2px #ff33b8,
        0 0 8px #ff00aa,
        0 0 10px #ff66c4 inset;
    width: 220px; /* Expand slightly when focused */
}

.search-icon {
  position: absolute;
  left: 10px; /* Position relative to search container */
  color: #ff66c4;
  font-size: 14px;
  pointer-events: none;
}
.filter-search:focus {
    animation: pulse-glow 1.5s infinite;
}
</style>