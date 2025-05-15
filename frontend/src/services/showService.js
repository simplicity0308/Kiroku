export const addNewShow = async (newShow) => {
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
            console.log("Show added successfully", data);
            return {success: true, data};
        } else {
            console.error("Error adding show:", data);
            return {success: false, error: data.message};
        }
    } catch (error) {
        console.error("Error adding show:", error);
        return {success: false, error: error.message};
    }
}

export const fetchAllShows = async () => {
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
            return { success: true, data };
        } else {
            console.error("Error fetching shows:", data);
            return { success: false, error: data.message };
        }
    } catch (error) {
        console.error("Error fetching shows:", error);
        return { success: false, error: error.message };
    }
}

export const deleteShow = async (showId) =>{
    console.log("deleting show", showId);
    try {
        const response = await fetch(`http://localhost:3000/shows/deleteById/${showId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (response.ok) {
            console.log("Show deleted successfully", data);
            return {success: true, data};
        } else {
            console.error("Error deleting show:", data);
            return {success: false, error: data.message};
        }
    } catch (error) {
        console.error("Error deleting show:", error);
        return {success: false, error: error.message};
    }
}

export const updateShow = async (newShow, id, currentShow) => {
    try{
        // ... is spread operator, it creates a shallow copy of the object
        const updatedShow = { ...newShow }; 
        console.log("received show: ", updatedShow);
        updatedShow.id = id;

        // if any fields are empty, set them to the values of the current show
        if (updatedShow.title === '') {
            updatedShow.title = currentShow.title;
        } else if (updatedShow.episode === '') {
            updatedShow.episode = currentShow.episode;
        } else if (updatedShow.status === '') {
            updatedShow.status = currentShow.status;
        } else if (updatedShow.notes === '') {
            updatedShow.notes = currentShow.notes;
        }
        console.log("updatedShow", updatedShow);

        console.log("sending update req")
        const response = await fetch(`http://localhost:3000/shows/updateById`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedShow)
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Show updated successfully", data);
            return {success: true, data};
        } else {
            console.error("Error updating show:", data);
            return {success: false, error: data.message};
        }
    } catch (error) {
        console.error("Error updating show:", error);
        return {success: false, error: error.message};
    }

}

export const getSingularShow = async (showId) => {
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
            return { success: true, data };
        } else {
            console.error("Error fetching show:", data);
            return { success: false, error: data.message };
        }
    } catch (error) {
        console.error("Error fetching show:", error);
        return { success: false, error: error.message };
    }
}