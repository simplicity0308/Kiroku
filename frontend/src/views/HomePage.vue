<template>
    <div class="animated-background">
        <div class="wave wave-1"></div>
        <div class="wave wave-2"></div>
        <div class="wave wave-3"></div>
    </div>
    
    <div class = container>
        <button @click="backToTop" class="back-to-top floating-button">&#8679;</button>
        <button @click="toBottom" class="to-bottom floating-button">&#8681;</button>
        <div class = "header">
            <h1>Kiroku 記録</h1>
        </div>
        <div class = "existing-show-container">

            <FilterHeaderModal
                @filterShows="triggerFilterShows"
                @submitSearch="triggerSearch"
                :selected="selected"
            />

            
            <ShowList
                :shows="existingShowList"
                @delete="toggleDeleteModal"
                @update="toggleUpdateModal"
                @view="toggleViewModal"
                @increaseEpisode="increaseEpisode"
                @decreaseEpisode="decreaseEpisode"
            />

        </div>
        <div class="action-pane">
            <button class="new-button" @click="toggleAddNewModal">New Entry</button>
        </div>
    </div>

    <AddShowModal
        v-model="showAddNewModal"
        :show="newShow"
        @close="closeAddNewModal"
        @submit="submitAddShow"
        @cancel="closeAddNewModal"
    />

    <UpdateShowModal
        v-model="showUpdateModal"
        :show="currentShow"
        :newShow="newShow"
        @close="closeUpdateModal"
        @update="submitUpdateShow"
        @cancel="closeUpdateModal"
    />

    <ViewShowModal
        v-model="showViewModal"
        :show="currentShow"
        @close="closeViewModal"
    />

    <DeleteShowModal
        v-model="showConfirmDeleteModal"
        :show="currentShow"
        @close="closeDeleteModal"
        @confirm="submitDeleteShow(currentShow.id)"
    />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';

// components
import ShowList from '../components/ShowList.vue';
import AddShowModal from '../components/AddShowModal.vue';
import UpdateShowModal from '../components/UpdateShowModal.vue';
import ViewShowModal from '../components/ViewShowModal.vue';
import DeleteShowModal from '../components/DeleteShowModal.vue';
import FilterHeaderModal from '../components/FilterHeaderModal.vue';
import { addNewShow, fetchAllShows, deleteShow, updateShow, getSingularShow, filterShows, searchShows } from '../services/ShowService.js';
import { changeShowEpisode } from '../services/showAttributeService.js'; 

// composables
import { useShowsStates } from '../composables/useShowsStates.js';

// get states and actions from the composable
const {
    existingShowList,
    currentShow,
    newShow,

    resetNewShow,
    resetCurrentShow
} = useShowsStates();

const toast = useToast();

const selected = ref('');

// modal states
const showAddNewModal = ref(false); 
const showUpdateModal = ref(false);
const showViewModal = ref(false);
const showConfirmDeleteModal = ref(false);

// toggle modal
const toggleAddNewModal = () => {
    showAddNewModal.value = !showAddNewModal.value;
    resetNewShow();
}
const closeAddNewModal = () => {
    showAddNewModal.value = false;
    resetNewShow();
}

// on mount, fetch existing shows
onMounted(async () => {
    const result = await fetchAllShows();
    if (result.success) {
        existingShowList.value = result.data;
    } else {
        console.error("Error fetching shows:", result.error);
        toast.error("Error fetching shows: " + result.error);
    }
});

const toggleUpdateModal = async (showId) => {
    console.log("showId", showId);

    const result = await getSingularShow(showId); 
    if (result.success) {
        // currentShow.value = result.data;
        console.log(result.data);
        console.log("toggleupdate get cur show", result.data);
        currentShow.value = result.data;
        console.log("toggleupdate cur show", currentShow.value);
        showUpdateModal.value = !showUpdateModal.value;
    } else {
        console.error("Error fetching show:", result.error);
        toast.error("Error fetching show: " + result.error);
    }
}

const closeUpdateModal = () => {
    showUpdateModal.value = false;
    resetNewShow();
}

const toggleViewModal = async (showId) => {
    console.log("showId", showId);
    const result = await getSingularShow(showId);
    if (result.success) {
        currentShow.value = result.data;
        showViewModal.value = !showViewModal.value;
    } else {
        console.error("Error fetching show:", result.error);
        toast.error("Error fetching show: " + result.error);
    }

}
const closeViewModal = () => {
    showViewModal.value = false;
    resetCurrentShow();
}

const toggleDeleteModal = async (showId) => {

    console.log("delshowId", showId);
    
    const result = await getSingularShow(showId);
    if (result.success) {
        currentShow.value = result.data;
        showConfirmDeleteModal.value = !showConfirmDeleteModal.value;
    } else {
        console.error("Error fetching show:", result.error);
        toast.error("Error fetching show: " + result.error);
    }
}

const closeDeleteModal = () => {
    showConfirmDeleteModal.value = false;
    resetCurrentShow();
}

// utility functions
const backToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

const toBottom = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

// submission handlers
const submitAddShow = async () => {
    // input validation
    console.log("new show", newShow.value);
    if (!newShow.value.title) {
        toast.warning("Title is required");
        return;
    }

    const result = await addNewShow(newShow.value);
    if (result.success) {
        toast.success(`Show ${newShow.value.title} added successfully`);
        console.log("Show added successfully", result.data);
        toggleAddNewModal();
        
        const showsResult = await fetchAllShows();
        if (showsResult.success) {
            existingShowList.value = showsResult.data;
        } else {
            console.error("Error fetching shows:", showsResult.error);
            toast.error("Error fetching shows: " + showsResult.error);
        }
    } else {
        console.error("Error adding show:", result.error);
        toast.error(result.error);
    }
}

const submitUpdateShow = async () => {  
    if (Object.values(newShow.value).every(val => val === '')) {;
        toast.warning("Please fill in at least one field");
        return;
    } else {

        const result = await updateShow(newShow.value, currentShow.value.id, currentShow.value);
        if (result.success) {
            toast.success(`Show updated successfully`);
            console.log("Show updated successfully", result.data);
            closeUpdateModal();
            
            const showsResult = await fetchAllShows();
            if (showsResult.success) {
                existingShowList.value = showsResult.data;

                // reset newShow data
                resetNewShow();
            } else {
                console.error("Error fetching shows:", showsResult.error);
                toast.error("Error fetching shows: " + showsResult.error);
            }

        } else {
            console.error("Error updating show:", result.error);
            toast.error(result.error);
        }
    }
}

const submitDeleteShow = async (id) => {
    console.log("deleting show", id);
    const result = await deleteShow(id);
    if (result.success) {
        toast.success(`Show deleted successfully`);
        console.log("Show deleted successfully", result.data);
        closeDeleteModal();
        
        const showsResult = await fetchAllShows();
        if (showsResult.success) {
            existingShowList.value = showsResult.data;
        } else {
            console.error("Error fetching shows:", showsResult.error);
            toast.error("Error fetching shows: " + showsResult.error);
        }
    } else {
        console.error("Error deleting show:", result.error);
        toast.error("Error deleting show: " + result.error);
    }
}

const increaseEpisode = async (showId) => {
    console.log("showId inc ep", showId);
    const result = await changeShowEpisode(showId, 1);
    if (result.success) {
        console.log("Show episode increased successfully", result.data);
        toast.info("Increment successful")
        const showsResult = await fetchAllShows();
        if (showsResult.success) {
            existingShowList.value = showsResult.data;
        } else {
            console.error("Error fetching shows:", showsResult.error);
            toast.error("Error fetching shows: " + showsResult.error);
        }
    } else {
        console.error("Error increasing show episode:", result.error);
        toast.error(result.error);
    }
}


const decreaseEpisode = async (showId) => {
    console.log("showId dec ep", showId);
    const result = await changeShowEpisode(showId, -1);
    if (result.success) {
        console.log("Show episode decreased successfully", result.data);
        toast.info("Decrement successful")
        const showsResult = await fetchAllShows();
        if (showsResult.success) {
            existingShowList.value = showsResult.data;
        } else {
            console.error("Error fetching shows:", showsResult.error);
            toast.error("Error fetching shows: " + showsResult.error);
        }
    } else {
        console.error("Error increasing show episode:", result.error);
        toast.error(result.error);
    }
}

const triggerFilterShows = async (selected) => {
    console.log("selected", selected);
    const result = await filterShows(selected);
    if(selected === '') {
        const result = await fetchAllShows();
        if (result.success) {
            existingShowList.value = result.data;
        } else {
            console.error("Error fetching shows:", result.error);
            toast.error("Error fetching shows: " + result.error);
        }
    }
    if (result.success) {
        existingShowList.value = result.data;
        console.log("Filtered shows", result.data);
    } else {
        console.error("Error filtering shows:", result.error);
        toast.error("Error filtering shows: " + result.error);
    }
}

const triggerSearch = async (searchTerm) => {
    console.log("searchTerm", searchTerm);
    const result = await searchShows(searchTerm);
    if (result.success) {
        existingShowList.value = result.data;
        console.log("Filtered shows", result.data);
    } else {
        console.error("Error filtering shows:", result.error);
        toast.warning(result.error);
    }
}
</script>

<style scoped>
.container{
    max-width: 1200px;
    position: relative;
    margin: 0 auto;
    z-index: 1;
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
.header {
    text-align: center;
    font-size: 16px;
    color: white;
    margin-top: 20px;
    margin-bottom: 20px;
    text-shadow: 8px 1px 2px rgb(40, 35, 65);
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
    box-shadow: 0 0 25px 5px purple;
    max-width: 1200px;
}
.title-header {
    text-align: center;
    font-size: 28px;
    color: white;
    margin: 0; 
    text-shadow: 8px 1px 2px black;
    transform: skewX(-5deg);
}
.action-pane {
    display: flex;
    justify-content: center;
    margin-top: 30px;
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
.existing-show-pane {
    justify-content: center;
    max-width: 1200px;
}

/* bg */
.animated-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh; /* Use viewport height instead */
    overflow: hidden;
    z-index: -1;
    background: #070707;
}

.wave {
    position: absolute;
    width: 300%; 
    height: 100%;
    bottom: -50%; /* Position lower */
    left: -100%; /* Start outside viewport */
    background: rgba(206, 34, 34, 0.4); 
    border-radius: 48%;
}

.wave-1 {
    animation: wave 35s infinite linear;
    opacity: 0.2;
    transform: translateZ(0) scale(0.7);
}

.wave-2 {
    animation: wave 25s infinite linear;
    animation-delay: -5s;
    opacity: 0.1;
    transform: translateZ(0) scale(0.85);
}

.wave-3 {
    animation: wave 20s infinite linear;
    animation-delay: -2s;
    opacity: 0.15;
    transform: translateZ(0);
}

@keyframes wave {
  0% {
    transform: translate(-50%, 0) rotateZ(0deg);
  }
  50% {
    transform: translate(-30%, -2%) rotateZ(180deg);
  }
  100% {
    transform: translate(-50%, 0) rotateZ(360deg);
  }
}

</style>

// search by name
// archive funnction (throw to other collection)
// if filter, page need refresh, but other function will also refresh (revert filter?)