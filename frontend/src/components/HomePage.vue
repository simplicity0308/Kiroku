<template>
    <div class = container>
        <button @click="backToTop" class="back-to-top floating-button">&#8679;</button>
        <button @click="toBottom" class="to-bottom floating-button">&#8681;</button>
        <div class = "header">
            <h1>Kiroku 記録</h1>
        </div>
        
        <div class = "existing-show-container">
            <h2 class="title-header">既存</h2>
            <ShowList
                :shows="existingShowList"
                @delete="toggleDeleteModal"
                @update="toggleUpdateModal"
                @view="toggleViewModal"
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

// components
import ShowList from '../views/ShowList.vue';
import AddShowModal from '../views/AddShowModal.vue';
import UpdateShowModal from '../views/UpdateShowModal.vue';
import ViewShowModal from '../views/ViewShowModal.vue';
import DeleteShowModal from '../views/DeleteShowModal.vue';
import { addNewShow, fetchAllShows, deleteShow, updateShow, getSingularShow } from '../services/ShowService.js';

// modal states
const showAddNewModal = ref(false); 
const showUpdateModal = ref(false);
const showViewModal = ref(false);
const showConfirmDeleteModal = ref(false);

// toggle modal
const toggleAddNewModal = () => {
    showAddNewModal.value = !showAddNewModal.value;
    // reset new show data
    newShow.value = {
        title: undefined,
        episode: undefined,
        status: undefined,
        notes: undefined
    };
}
const closeAddNewModal = () => {
    showAddNewModal.value = false;
    newShow.value = {
        title: undefined,
        episode: undefined,
        status: undefined,
        notes: undefined
    };
}

// on mount, fetch existing shows
onMounted(async () => {
    const result = await fetchAllShows();
    if (result.success) {
        existingShowList.value = result.data;
    } else {
        console.error("Error fetching shows:", result.error);
        alert("Error fetching shows: " + result.error);
    }
});

const toggleUpdateModal = async (showId) => {
    console.log("showId", showId);

    const result = await getSingularShow(showId); 
    if (result.success) {
        // currentShow.value = result.data;
        console.log(result.data);
        console.log("toggleupdate new show", result.value);
        currentShow.value = result.data;
        showUpdateModal.value = !showUpdateModal.value;
    } else {
        console.error("Error fetching show:", result.error);
        alert("Error fetching show: " + result.error);
    }
}

const closeUpdateModal = () => {
    showUpdateModal.value = false;
    newShow.value = {
        title: undefined,
        episode: undefined,
        status: undefined,
        notes: undefined
    };
}

const toggleViewModal = async (showId) => {
    console.log("showId", showId);
    const result = await getSingularShow(showId);
    if (result.success) {
        currentShow.value = result.data;
        showViewModal.value = !showViewModal.value;
    } else {
        console.error("Error fetching show:", result.error);
        alert("Error fetching show: " + result.error);
    }

}
const closeViewModal = () => {
    showViewModal.value = false;
    currentShow.value = {
        title: undefined,
        episode: undefined,
        status: undefined,
        notes: undefined
    };
}

const toggleDeleteModal = async (showId) => {

    console.log("delshowId", showId);
    
    const result = await getSingularShow(showId);
    if (result.success) {
        currentShow.value = result.data;
        showConfirmDeleteModal.value = !showConfirmDeleteModal.value;
    } else {
        console.error("Error fetching show:", result.error);
        alert("Error fetching show: " + result.error);
    }
}

const closeDeleteModal = () => {
    showConfirmDeleteModal.value = false;
    currentShow.value = {
        title: undefined,
        episode: undefined,
        status: undefined,
        notes: undefined
    };
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

// show constants
const existingShowList = ref([]);

// for new show
const newShow = ref({
    id: undefined,
    title: undefined,
    episode: undefined,
    status: undefined,
    notes: undefined
});

// show details
const currentShow = ref({
    title: undefined,
    episode: undefined,
    status: undefined,
    notes: undefined
});

// submission handlers
const submitAddShow = async () => {
    // input validation
    console.log("new show", newShow.value);
    if (!newShow.value.title) {
        alert("Title is required");
        return;
    }

    const result = await addNewShow(newShow.value);
    if (result.success) {
        alert(`Show ${newShow.value.title} added successfully`);
        console.log("Show added successfully", result.data);
        toggleAddNewModal();
        
        const showsResult = await fetchAllShows();
        if (showsResult.success) {
            existingShowList.value = showsResult.data;
        } else {
            console.error("Error fetching shows:", showsResult.error);
            alert("Error fetching shows: " + showsResult.error);
        }
    }
}

const submitUpdateShow = async () => {   // input validation
    // Check if all fields in newShow are empty
    //         newShow.id = currentShow.value.id; 
    if (Object.values(newShow.value).every(val => val === '')) {;
        alert("Please fill in at least one field");
        return;
    } else {

        const result = await updateShow(newShow.value, currentShow.value.id, currentShow.value);
        if (result.success) {
            alert(`Show ${newShow.value.id} updated successfully`);
            console.log("Show updated successfully", result.data);
            closeUpdateModal();
            
            const showsResult = await fetchAllShows();
            if (showsResult.success) {
                existingShowList.value = showsResult.data;

                // reset newShow data
                newShow.value = {
                    title: undefined,
                    episode: undefined,
                    status: undefined,
                    notes: undefined
                };
            } else {
                console.error("Error fetching shows:", showsResult.error);
                alert("Error fetching shows: " + showsResult.error);
            }

        } else {
            console.error("Error updating show:", result.error);
            alert("Error updating show: " + result.error);
        }
    }
}

const submitDeleteShow = async (id) => {
    console.log("deleting show", id);
    const result = await deleteShow(id);
    if (result.success) {
        alert(`Show ${id} deleted successfully`);
        console.log("Show deleted successfully", result.data);
        closeDeleteModal();
        
        const showsResult = await fetchAllShows();
        if (showsResult.success) {
            existingShowList.value = showsResult.data;
        } else {
            console.error("Error fetching shows:", showsResult.error);
            alert("Error fetching shows: " + showsResult.error);
        }
    } else {
        console.error("Error deleting show:", result.error);
        alert("Error deleting show: " + result.error);
    }
}
</script>

<style scoped>
.container{
    max-width: 1200px;
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
    max-width: 1200px;
}
.title-header {
    text-align: center;
    font-size: 28px;
    color: white;
    margin-top: 1px;
    text-shadow: 8px 1px 2px black;
    transform: skewX(-4deg);;
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
</style>

// filter button 
// season field
// add/minus button (auto send to back)