<template>
    <div v-if="modelValue" class="modal-overlay" @click.self="$emit('close')">
        <div class ="modal-content">
            <div class="title-header"><strong>削除を確認する</strong></div>
            <div class="show-card">
                <p><strong>Title: </strong> <span class="id-card-text">{{ show.title }}</span></p>
                <p><strong>Status: </strong> <span class="id-card-text">{{ show.status }}</span></p>
                <p><strong>Episode: </strong> <span class="id-card-text">{{ show.episode }}</span></p>
                <p><strong>Notes: </strong> <span class="id-card-text">{{ show.notes }}</span></p>
            </div>
            <div class="modal-actions">
                <button class="submit-button" @click="$emit('confirm')">Yes</button>
                <button class="cancel-button" @click="$emit('close')">No</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    show: {
        type: Object,
        required: true
    }
});
const emit = defineEmits(['confirm', 'close']);
</script>

<style scoped>
/* Only keeping the CSS classes that are used in the template */
.title-header {
    text-align: center;
    font-size: 28px;
    color: white;
    margin-top: 1px;
    text-shadow: 8px 1px 2px black;
    transform: skewX(-4deg);
}
.show-card {
    background-color: #222;
    padding: 15px;
    border-radius: 5px;
    color: white;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px;
    width: auto;
    box-shadow: 0 0 10px 3px rgb(19, 17, 19);
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