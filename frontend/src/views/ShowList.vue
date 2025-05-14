<template>
  <div class="existing-show-pane">
    <div v-for="show in shows" :key="show.id" class="show-card">
      <h3 class="id-card">{{ show.id }}</h3>
      <span><strong>Title:</strong><span class="id-card-text">{{ show.title }}</span></span>
      <span><strong>Status: </strong><span class="id-card-text">{{ show.status }}</span></span>
      <div class="button-group">
        <button class="delete-button" @click="$emit('delete', show.id)">Delete</button>
        <button class="update-button" @click="$emit('update', show.id)">Update</button>
        <button class="view-button" @click="$emit('view', show.id)">View</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  shows: {
    type: Array,
    required: true
  }
});

defineEmits(['delete', 'update', 'view']);
</script>

<style scoped>
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
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
</style>