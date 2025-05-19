<template>
    <div v-if="modelValue" class="modal-overlay" @click.self="$emit('close')">
        <div class ="modal-content">
            <h2 class="title-header"> Add new Show</h2>
            
            <div class="form-group">
                <label for="title">Title:</label>
                <input 
                    type="text" 
                    id="title" 
                    v-model="showData.title" 
                    placeholder="Enter show title"
                />
            </div>

            <div class="form-group">
                <label for="episode">Episode:</label>
                <input 
                    type="number" 
                    id="episode" 
                    v-model="showData.episode" 
                    placeholder="Enter show episode"
                    @keydown="blockInvalidChar"
                />
            </div>

            <div class="form-group">
                <label for="episode">Season:</label>
                <input 
                    type="number" 
                    id="season" 
                    v-model="showData.season" 
                    placeholder="Season number"
                    @keydown="blockInvalidChar"
                />
            </div>

            <div class="form-group">
                <label for="status">Status:</label>
                <select v-model="showData.status">
                    <option disabled value="">Select status</option>
                    <option value="watching">Watching</option>
                    <option value="completed">Completed</option>
                    <option value="on hold">On Hold</option>
                    <option value="dropped">Dropped</option>
                    <option value="plan to watch">Plan to Watch</option>
                </select>
            </div>

            <div class="form-group">
                <label for="notes">Notes:</label>
                <textarea 
                    id="notes" 
                    v-model="showData.notes" 
                    placeholder="Enter notes"
                />
            </div>
            <div class="modal-actions">
                <button class="submit-button" @click="$emit('submit')">Add New Show</button>
                <button class="cancel-button" @click="$emit('cancel')">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

// Define props
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    show: {
        type: Object,
        required: true
    },
    blockInvalidChar: {
        type: Function,
        required: true
    }
});

// Define emits
const emit = defineEmits(['update:modelValue', 'update:show','close', 'submit', 'cancel']);

// Create a computed property to handle two-way binding with v-model
const showData = computed({
    get() {
        return props.show;
    },
    set(value) {
        emit('update:show', value);
    }
});
</script>

<style scoped> 
.header {
    text-align: center;
    font-size: 16px;
    color: white;
    margin-top: 20px;
    margin-bottom: 20px;
    text-shadow: 8px 1px 2px black;
}
.header h1 {
    display: inline-block;
    transform: skewX(-10deg);
    margin-bottom: 8px;
}
.title-header {
    text-align: center;
    font-size: 28px;
    color: white;
    margin-top: 1px;
    text-shadow: 8px 1px 2px black;
    transform: skewX(-4deg);;
}
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(10, 10, 10, 0.60);
    backdrop-filter: blur(8px); 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    
}
.modal-content {
    background: rgba(30, 30, 30, 0.9);
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: fit-content;
    display: flex;
    flex-direction: column;
        box-shadow: 0 0 10px 4px rgb(176, 2, 219);
}
.modal-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}
.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.form-group label {
  width: 120px;  
  margin-right: 10px;
  color: #fff;
  font-weight: 500;
  text-align: center;
}
.form-group input,
.form-group select,
.form-group textarea {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  background-color: #1e1e1e;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  min-width: 0;
}
.form-group textarea {
    height: 100px;
    resize: horizontal;
}
.submit-button {
    background: #000000;
    color: #fff;
    font-family: 'Courier New', monospace;
    font-size: 16px;
    text-transform: uppercase;
    border: 2px solid #00ffe7;
    padding: 10px 20px;
    cursor: pointer;
    box-shadow:
        0 0 3px #00ffe7,
        0 0 1px #bafff7,
        0 0 4px #00ffff;
    transition: all 0.2s ease-in-out;
}
.submit-button:hover {
    background: #001f1d;
    box-shadow:
        0 0 5px #00e0ff,
        0 0 1px #00ccff,
        0 0 5px #00baff,
        0 0 20px #00eaff inset;
    transform: scale(1.05);
}
.cancel-button {
    background: #000000;
    color: #fff;
    font-family: 'Courier New', monospace;
    font-size: 16px;
    text-transform: uppercase;
    border: 2px solid #ff66c4;
    padding: 10px 20px;
    cursor: pointer;
    box-shadow:
        0 0 3px #ff66c4,
        0 0 1px #f1c1df,
        0 0 4px #ff75ff;
    transition: all 0.2s ease-in-out;
}
.cancel-button:hover {
    background: #161000;
    box-shadow:
        0 0 5px #ff668c,
        0 0 1px #ff666e,
        0 0 5px #ff0000,
        0 0 20px #ff0000 inset;
    transform: scale(1.05);
}

</style>
