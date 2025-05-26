<template>
    <div v-if="modelValue" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-content">
            <h2 class="title-header">Profile</h2>
            <div class="profile-details">
                <p><strong>Username:</strong> {{ user.username }}</p>
            </div>
            <div class="modal-actions">
                <button class="close-button" @click="$emit('close')">Close</button>
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
    user: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['update:modelValue','close']);


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
.title-header {
    text-align: center;
    font-size: 28px;
    color: white;
    margin-top: 1px;
    text-shadow: 8px 1px 2px black;
    transform: skewX(-4deg);;
}

</style>