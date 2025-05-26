<template>
 <nav class="navbar">
    <div class="container">
      <div class="logo">Kiroku</div>
      <div class="nav-buttons">
        <button class="nav-button profile-button" @click="toggleProfileModal">Profile</button>
        <button class="nav-button logout-button" @click="handleLogout">Logout</button>
      </div>
    </div>
  </nav>

  <ProfileModal
    v-model="showProfileModal"
    @close="closeProfileModal"
    
  />

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { logoutUser } from '../services/userService';

import ProfileModal from './ProfileModal.vue';

const router = useRouter();
const toast = useToast();


//modal state
const showProfileModal = ref(false);

// toggle modal
const toggleProfileModal = () => {
  showProfileModal.value = !showProfileModal.value;
}
const closeProfileModal = () => {
  showProfileModal.value = false;
}


const handleLogout = async() => {

    await logoutUser();
    toast.success('Logout successful!');
    toast.default('Redirecting to login page...');

    setTimeout(() => {
        toast.clear();
        router.push('/login');
    }, 1000)
}

const handleProfile = () => {
    t
}

</script>

<style scoped>
.navbar {
  background-color: transparent;
  padding: 0.8rem 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-buttons {
  display: flex;
  gap: 1rem;
}

.nav-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Courier New', monospace;
    font-size: 16px;
    text-transform: uppercase;
}

.profile-button {
  background-color: #4a5568;
  color: white;
  box-shadow:
    0 0 3px #7b8485,
    0 0 1px #4a4e52,
    0 0 4px #29292b;
}

.profile-button:hover {
  background-color: #2d3748;
      box-shadow:
        0 0 5px #66faff,
        0 0 1px #4da9ff,
        0 0 5px #001aff,
        0 0 20px #5c5c5f inset;
    transform: scale(1.05);
}

.logout-button {
  background-color: #e53e3e;
  color: white;
  box-shadow:
    0 0 3px #ff0000,
    0 0 1px #ff4d4d,
    0 0 4px #ff8080;
}

.logout-button:hover {
  background-color: #c53030;
      box-shadow:
        0 0 5px #66faff,
        0 0 1px #4da9ff,
        0 0 5px #001aff,
        0 0 20px #f5a9b6 inset;
    transform: scale(1.05);
}
</style>