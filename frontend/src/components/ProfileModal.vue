<template>
    <div v-if="modalValue"></div>
</template>

<script setup>
const props = defineProps({
    modalValue: {
        type: Boolean,
        required: true
    }
});


</script>

<style scoped>
</style>