<template>
    <div class="filter-container">
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

const emit = defineEmits(['filterShows']);

// define props
const props = defineProps({
    selected: {
        type: String
    }
});

const localSelected = ref(props.selected || '');

watch(() => props.selected, (newVal) => {
    localSelected.value = newVal;
});

const updateFilter = () => {
    emit('filterShows', localSelected.value);
};

</script>

<style scoped>
.title-header {
  text-align: center;
  font-size: 28px;
  color: white;
  margin: 0; /* Remove top/bottom margin */
  text-shadow: 8px 1px 2px black;
  transform: skewX(-4deg);
}
.filter-container {
  position: relative;
  display: flex;
  justify-content: center;  /* Center the title */
  align-items: center;
  margin-bottom: 30px;
  padding-top: 1px;
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
  position: relative;
}
.filter-wrapper {
  position: absolute;
  right: 0;
  top: 10px;
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
</style>