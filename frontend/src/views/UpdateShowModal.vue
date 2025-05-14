<template>
    <div v-if="modelValue" class="modal-overlay" @click.self="$emit('close')">
        <div class ="modal-content">
            <div class="title-header">Update Show</div>
            <div class="prompt-text">Please enter show details to update</div>
                <div class="update-panes-container">
                    <div class="update-show-left">
                        <div class="prompt-text">Current</div>
                        <div class="show-card">
                            <p>Title: {{ show.title }}</p>
                            <p>Status: {{ show.status }}</p>
                            <p>Episode: {{ show.episode }}</p>
                            <p>Notes: {{ show.notes }}</p>
                        </div>
                    </div>

                    <div class="update-show-right">
                        <div class="prompt-text">New</div>
                        <div class ="show-card">
                    
                    
                            <div class="form-group">
                                <label for="title">Title:</label>
                                <input 
                                    type="text" 
                                    id="title" 
                                    v-model="newShow.title" 
                                    placeholder="Enter new title"
                                />
                            </div>

                            <div class="form-group">
                                <label for="episode">Episode:</label>
                                <input 
                                    type="number" 
                                    id="episode" 
                                    v-model="newShow.episode" 
                                    placeholder="Enter new episode"
                                />
                            </div>

                            <div class="form-group">
                                <label for="status">Status:</label>
                                <select v-model="newShow.status">
                                    <option disabled value="">Select new status</option>
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
                                    v-model="newShow.notes" 
                                    placeholder="Enter new notes"
                                />
                            </div>
                        </div>
                    </div>
            </div>
            <div class="modal-actions">
                <button class="submit-button" @click="$emit('update',showData)">Update Show</button>
                <button class="cancel-button" @click="$emit('cancel')">Cancel</button>
            </div>
        </div>

    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    show: {
        type: Object,
        required: true
    },
    newShow: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['update:modelValue','update:show','close', 'update', 'cancel']);

const showData = computed({
    get() {
        return props.show;
    },
    set(value) {
        emit('update:show', value);
    }
})

</script>

<style scoped>
/* Only keeping the CSS classes that are used in the template */
.title-header {
    text-align: center;
    font-size: 28px;
    color: white;
    margin-top: 1px;
    text-shadow: 8px 1px 2px black;
    transform: skewX(-4deg);;
}
.show-card {
    background-color: rgb(43, 40, 40);
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    width: auto;
    box-shadow: 0 0 10px 3px rgb(19, 17, 19);
    background-color: #222;
    padding: 15px;
    border-radius: 5px;
    color: white;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
.update-panes-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    align-items: stretch;
}
.update-show-left, .update-show-right {
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 1;
    display: flex;
}
.form-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}
.form-group label {
    width: 120px; /* Fixed width for alignment */
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
.prompt-text {
    margin-top: 5px;
    font-size: 18px;
    color: white;
    text-align: center;
    transform: skewX(-10deg);
    display: inline-block;
    text-shadow: 6px 1px 2px rgb(114, 59, 59);
}
</style>