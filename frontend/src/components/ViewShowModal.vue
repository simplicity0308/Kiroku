<template>
    <div v-if="modelValue" class="modal-overlay" @click.self="$emit('close')"> 
        <div class ="modal-content">
            <div class="view-show-header"> {{ show.title }} </div>
            <div class="view-pane-container">
                <div class="view-content">
                    <div class="show-card-view">
                    <p><strong>Status: </strong> <span class="id-card-text">{{ show.status }}</span></p>
                    <p><strong>Episode: </strong> <span class="id-card-text">{{ show.episode }}</span></p>
                    <p><strong>Notes: </strong> <span class="id-card-text">{{ show.notes }}</span></p>
                    </div>
                    <div class="modal-actions">
                    <button class="cancel-button" @click="$emit('close')">Close</button>
                    </div>
                </div>
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
    }
})

const emit = defineEmits(['close']);

</script>

<style scoped>
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
    margin-top: 20px;
}
.view-show-header {
    font-size: 24px;
    color: white;
    margin-bottom: 10px;
    text-align: center;
    transform: skewX(-10deg);
    display: inline-block;
    text-shadow: 6px 1px 2px black;
    font-family: 'Share Tech Mono', monospace;
}
.view-pane-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.view-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.show-card-view {
  background-color: #222;
  padding: 5px;
  border-radius: 5px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100% ;
  border-style: opaque; 
  box-shadow: 0 0 10px 4px rgb(66, 66, 66);
  
}
.show-card-view p {
  margin: 5px 0;
  font-size: 16px;
}
.id-card-text {
    color: white;
    font-weight: 300;
    letter-spacing: 0.5px;
    margin-bottom: 1px;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    align-items: center;
    padding-left: 5px;
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