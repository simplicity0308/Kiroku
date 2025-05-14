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

    <div v-if="showAddNewModal" class="modal-overlay" @click.self="closeAddModal">
        <div class ="modal-content">
            <h2> Add new Show</h2>
            
            <div class="form-group">
                <label for="title">Title:</label>
                <input 
                    type="text" 
                    id="title" 
                    v-model="newShow.title" 
                    placeholder="Enter show title"
                />
            </div>

            <div class="form-group">
                <label for="episode">Episode:</label>
                <input 
                    type="number" 
                    id="episode" 
                    v-model="newShow.episode" 
                    placeholder="Enter show episode"
                />
            </div>

            <div class="form-group">
                <label for="status">Status:</label>
                <select v-model="newShow.status">
                    <option disabled value="">Select status</option>
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
                    placeholder="Enter notes"
                />
            </div>
            <div class="modal-actions">
                <button class="submit-button" @click="submitAddShow">Add New Show</button>
                <button class="cancel-button" @click="closeAddNewModal">Cancel</button>
            </div>
        </div>
    </div>

    <div v-if="showUpdateModal" class="modal-overlay" @click.self="closeUpdateModal">
        <div class ="modal-content">
            <div class="title-header">Update Show</div>
            <div class="prompt-text">Please enter show details to update</div>
                <div class="update-panes-container">
                    <div class="update-show-left">
                        <div class="prompt-text">Current</div>
                        <div class="show-card">
                            <p>Title: {{ showDetails.title }}</p>
                            <p>Status: {{ showDetails.status }}</p>
                            <p>Episode: {{ showDetails.episode }}</p>
                            <p>Notes: {{ showDetails.notes }}</p>
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
                                    <option value="on-hold">On Hold</option>
                                    <option value="dropped">Dropped</option>
                                    <option value="plan-to-watch">Plan to Watch</option>
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
                <button class="submit-button" @click="submitUpdateShow">Update Show</button>
                <button class="cancel-button" @click="closeUpdateModal">Cancel</button>
            </div>
        </div>

    </div>
    
    <div v-if="showViewModal" class="modal-overlay" @click.self="closeViewModal"> 
        <div class ="modal-content">
            <div class="view-show-header"> {{ showDetails.title }} </div>
            <div class="view-pane-container">
                <div class="view-content">
                    <div class="show-card-view">
                    <p><strong>Status: </strong> <span class="id-card-text">{{ showDetails.status }}</span></p>
                    <p><strong>Episode: </strong> <span class="id-card-text">{{ showDetails.episode }}</span></p>
                    <p><strong>Notes: </strong> <span class="id-card-text">{{ showDetails.notes }}</span></p>
                    </div>
                    <div class="modal-actions view-close">
                    <button class="cancel-button" @click="closeViewModal">Close</button>
                    </div>
                </div>
            </div>
        </div>

    </div>


    <div v-if="showConfirmDeleteModal" class="modal-overlay">
        <div class ="modal-content">
            <div class="title-header"><strong>削除を確認する</strong></div>
            <div class="show-card">
                <p><strong>Title: </strong> <span class="id-card-text">{{ showDetails.title }}</span></p>
                <p><strong>Status: </strong> <span class="id-card-text">{{ showDetails.status }}</span></p>
                <p><strong>Episode: </strong> <span class="id-card-text">{{ showDetails.episode }}</span></p>
                <p><strong>Notes: </strong> <span class="id-card-text">{{ showDetails.notes }}</span></p>
            </div>
            <div class="modal-actions">
                <button class="submit-button" @click="deleteShow(showDetails.id)">Yes</button>
                <button class="cancel-button" @click="closeDeleteModal">No</button>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';

// components
import ShowList from './ShowList.vue';

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
        title: '',
        episode: '',
        status: '',
        notes: ''
    };
}
const closeAddNewModal = () => {
    showAddNewModal.value = false;
    newShow.value = {
        title: '',
        episode: '',
        status: '',
        notes: ''
    };
}

const toggleUpdateModal = (showId) => {
    getSingularShow(showId);
    showUpdateModal.value = !showUpdateModal.value;
}
const closeUpdateModal = () => {
    showUpdateModal.value = false;
    showDetails.value = {
        title: '',
        episode: '',
        status: '',
        notes: ''
    };
}

const toggleViewModal = (showId) => {
    getSingularShow(showId);
    showViewModal.value = !showViewModal.value;
}
const closeViewModal = () => {
    showViewModal.value = false;
    showDetails.value = {
        title: '',
        episode: '',
        status: '',
        notes: ''
    };
}

const toggleDeleteModal = (showId) => {
    getSingularShow(showId);
    showConfirmDeleteModal.value = !showConfirmDeleteModal.value;
}
const closeDeleteModal = () => {
    showConfirmDeleteModal.value = false;
    showDetails.value = {
        title: '',
        episode: '',
        status: '',
        notes: ''
    };
}


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

// for existing show display
const existingShowList = ref([]);

// for new show
const newShow = ref({
    id: '',
    title: '',
    episode: '',
    status: '',
    notes: ''
});

// show details
const showDetails = ref({
    title: '',
    episode: '',
    status: '',
    notes: ''
});

const submitAddShow = async () => {
    // input validation
    if (!newShow.value.title) {
        alert("Title is required");
        return;
    }

    await addNewShow(newShow.value);
    toggleAddNewModal();
}

const addNewShow = async (newShow) => {
    try{
        const response = await fetch(`http://localhost:3000/shows/addNew`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newShow)
        });

        const data = await response.json();
        if (response.ok) {
            alert(`Show ${newShow.title} added successfully`);
            console.log("Show added successfully", data);
            await fetchAllShows(); // refresh the show list
        } else {
            console.error("Error adding show:", data);
            alert("Error adding show: " + data.message);
        }
    } catch (error) {
        console.error("Error adding show:", error);
        alert("Error adding show: " + error.message);
    }
}

// on mount, fetch existing shows
onMounted(async () => {
    await fetchAllShows();
});

const fetchAllShows = async () => {
    try {
        const response = await fetch(`http://localhost:3000/shows/getAll`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (response.ok) {
            console.log("Fetched shows successfully", data);
            existingShowList.value = data;
        } else {
            console.error("Error fetching shows:", data);
            alert("Error fetching shows: " + data.message);
        }
    } catch (error) {
        console.error("Error fetching shows:", error);
        alert("Error fetching shows: " + error.message);
    }
}


const deleteShow = async (showId) =>{
    try {
        const response = await fetch(`http://localhost:3000/shows/deleteById/${showId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (response.ok) {
            alert(`Show ${showId} deleted successfully`);
            console.log("Show deleted successfully", data);
            await fetchAllShows(); // refresh the show list
        } else {
            console.error("Error deleting show:", data);
            alert("Error deleting show: " + data.message);
        }
    } catch (error) {
        console.error("Error deleting show:", error);
        alert("Error deleting show: " + error.message);
    }
}

const submitUpdateShow = async () => {   // input validation
    // Check if all fields in newShow are empty
    if (Object.values(newShow.value).every(val => val === '')) {;
        alert("Please fill in at least one field");
        return;
    } else {
        await updateShow(newShow.value);
        toggleUpdateModal();
        await fetchAllShows(); // refresh the show list
        newShow.value = {
            title: '',
            episode: '',
            status: '',
            notes: ''
        };
    }
}

const updateShow = async (newShow) => {
    try{
        newShow.id = showDetails.value.id; 
        console.log("sending update req")
        const response = await fetch(`http://localhost:3000/shows/updateById`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newShow)
        });

        const data = await response.json();
        if (response.ok) {
            alert(`Show ${newShow.id} updated successfully`);
            console.log("Show updated successfully", data);
            await fetchAllShows(); // refresh the show list
        } else {
            console.error("Error updating show:", data);
            alert("Error updating show: " + data.message);
        }
    } catch (error) {
        console.error("Error updating show:", error);
        alert("Error updating show: " + error.message);
    }

}

const getSingularShow = async (showId) => {
    try {
        const response = await fetch(`http://localhost:3000/shows/getById/${showId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (response.ok) {
            console.log("Fetched show successfully", data);
            showDetails.value = data;
        } else {
            console.error("Error fetching show:", data);
            alert("Error fetching show: " + data.message);
        }
    } catch (error) {
        console.error("Error fetching show:", error);
        alert("Error fetching show: " + error.message);
    }
}
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

// filter button 