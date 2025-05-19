<template>
    <div v-if="modelValue" class="modal-overlay" @click.self="$emit('close')">
        <div class ="modal-content">
            <div class="title-header">Update Show</div>
            <div class="prompt-text">Please update show details to update</div>
                <div class="update-panes-container">
                    <!-- <div class="update-show-left">
                        <div class="prompt-text">Current</div>
                        <div class="show-card">
                            <p>Title: {{ show.title }}</p>
                            <p>Status: {{ show.status }}</p>
                            <p>Episode: {{ show.episode }}</p>
                            check if season is truthy (not all shows have season if they only have one season)   
                            <p>Season: {{ show.season ? show.season : '-' }}</p>
                            <p>Notes: {{ show.notes }}</p>
                        </div>
                    </div> -->

                    <div class="update-show-right">
                        <div class ="show-card">
                    

                            <div class="form-group">
                                <label for="title">Title:</label>
                                <input 
                                    type="text" 
                                    id="title" 
                                    v-model="show.title" 
                                    placeholder="Enter new title"
                                />
                            </div>

                            <div class="form-group">
                                <label for="episode">Episode:</label>
                                <input 
                                    type="number" 
                                    id="episode" 
                                    v-model="show.episode" 
                                    placeholder="Enter new episode"
                                    @keydown="blockInvalidChar"
                                />
                            </div>

                            
                            <div class="form-group">
                                <label for="season">Season:</label>
                                <input 
                                    type="number" 
                                    id="season" 
                                    v-model="show.season" 
                                    placeholder="Enter new season"
                                    @keydown="blockInvalidChar" 
                                />
                            </div>

                            <div class="form-group">
                                <label for="status">Status:</label>
                                <select v-model="show.status">
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
                                    v-model="show.notes" 
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
    blockInvalidChar: {
        type: Function,
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
.existing-show-container {
    margin: 20px;
    border-color: purple;
    border-width: 2px;
    border-style: solid;
    padding: 20px;
    border-radius: 30px;
    box-shadow: 0 0 10px 4px purple;
}
.title-header {
    text-align: center;
    font-size: 28px;
    color: white;
    margin-top: 1px;
    text-shadow: 8px 1px 2px black;
    transform: skewX(-4deg);;
}
.existing-show-pane {
    justify-content: center;
}
.show-card {
    background-color: rgb(43, 40, 40);
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    width: auto;
    box-shadow: 0 0 10px 3px rgb(19, 17, 19);
    
}
.id-card {
    font-size: 25px;
    color: white;
    margin-top: 5px;
    margin-bottom: 1px;
    text-align: center;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
.id-card-headers {
    color: white;
    text-align: center;
    font-size: 14px;
    display: flex;
    align-items: center;
    text-align: center;
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
.button-group {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    gap: 10px;
}
.delete-button {
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
.delete-button:hover {
    background: #161000;
    box-shadow:
        0 0 5px #ff668c,
        0 0 1px #ff666e,
        0 0 5px #ff0000,
        0 0 20px #ff0000 inset;
    transform: scale(1.05);
}
.update-button {
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
.update-button:hover {
    background: #001f1d;
    box-shadow:
        0 0 5px #00e0ff,
        0 0 1px #00ccff,
        0 0 5px #00baff,
        0 0 20px #00eaff inset;
    transform: scale(1.05);
}
.view-button {
    background: #000000;
    color: #fff;
    font-family: 'Courier New', monospace;
    font-size: 16px;
    text-transform: uppercase;
    border: 2px solid #d580ff;
    padding: 10px 20px;
    cursor: pointer;
    box-shadow:
        0 0 3px #d580ff,
        0 0 1px #e5c2ff,
        0 0 4px #cc66ff;
    transition: all 0.2s ease-in-out;
}
.view-button:hover {
    background: #12001f;
    box-shadow:
        0 0 5px #c266ff,
        0 0 1px #a04dff,
        0 0 5px #7a00ff,
        0 0 20px #9900ff inset;
    transform: scale(1.05);
}
.new-button {
    background: #000000;
    color: #fff;
    font-family: 'Courier New', monospace;
    font-size: 16px;
    text-transform: uppercase;
    border: 2px solid #d580ff;
    padding: 10px 20px;
    cursor: pointer;
    box-shadow:
        0 0 3px #80ffc0,
        0 0 1px #c2ffc2,
        0 0 4px #6bff66;
    transition: all 0.2s ease-in-out;
}
.new-button:hover {
    background: #12001f;
    box-shadow:
        0 0 5px #66faff,
        0 0 1px #4da9ff,
        0 0 5px #001aff,
        0 0 20px #2600ff inset;
    transform: scale(1.05);
}
.floating-button {
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 10px 15px;
    background-color: #1a1a1a;
    color: #fff;
    border: solid 1px;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    transition: box-shadow 0.3s ease, transform 0.2s ease;
}
.floating-button:hover {
    box-shadow:
    0 0 8px rgba(255, 255, 255, 0.4),
    0 0 20px rgba(255, 255, 255, 0.3);
  transform: scale(1.03);
}
.back-to-top {
    bottom: 20px;
    right: 30px;
}
.to-bottom {
    bottom: 20px;
    right: 80px;
}
.action-pane {
    display: flex;
    justify-content: center;
    margin-top: 30px;
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
.show-card {
  background-color: #222;
  padding: 15px;
  border-radius: 5px;
  color: white;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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