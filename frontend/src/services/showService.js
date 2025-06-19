export const addNewShow = async (newShow, userId) => {
    const token = localStorage.getItem('token');
    console.log("Token front: ", token);


    console.log("New show: ", newShow)
    console.log("User ID: ", userId);
    try{
        if (newShow.episode < 0) {
            console.error("Episode count cannot be negative");
            return {
                success: false,
                error: "Episode count cannot be negative"
            }
        } else if (newShow.season < 0) {
            console.error("Season number cannot be negative");
            return {
                success: false,
                error: "Season number cannot be negative"
            }
        } else {
            const response = await fetch(`http://localhost:3000/shows/addNew`,{
                method: 'POST',
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newShow, userId)
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Show added successfully", data);
                return {success: true, data};
            } else {
                console.error("Error adding show:", data);
                return {success: false, error: data.message};
            }
        }
    } catch (error) {
        console.error("Error adding show:", error);
        return {success: false, error: error.message};
    }
}

// api for admin use
export const fetchAllShows = async () => {
        const token = localStorage.getItem('token');
        console.log("Token front: ", token);
    try {
        const response = await fetch(`http://localhost:3000/shows/getAll`, {
            method: 'GET',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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

export const getAllShowsByUser = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3000/shows/getAllByUserId/${userId}`, {
            method: 'GET',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Fetched shows by user successfully", data);
            return { success: true, data };
        } else {
            console.error("Error fetching shows by user:", data);
            return { success: false, error: data.message };
        }

    } catch (error) {
        console.error("Error fetching shows by user:", error);
        return { success: false, error: error.message };
    }       
}

export const deleteShow = async (showId) =>{
    console.log("deleting show", showId);
    try {
        const response = await fetch(`http://localhost:3000/shows/deleteById/${showId}`, {
            method: 'DELETE',
            credentials: 'include', 
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
        console.log("new show episode", newShow.episode);
        console.log("new show", newShow, id);
        if (newShow.episode >= 0 || newShow.episode === undefined) {
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
                credentials: 'include', 
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
        } else {
            console.error("Episode count cannot be negative");
            return {
                success: false,
                error: "Episode count cannot be negative"
            }
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
            credentials: 'include', 
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

export const filterShows = async (selected, userId) => {
    try {

        if (!selected) {
            return getAllShowsByUser(userId);
        }
        const response = await fetch(`http://localhost:3000/shows/filter/?filterType=${selected}&userId=${userId}`, {
            method: 'GET',
            credentials: 'include', 
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

export const searchShows = async (searchTerm, userId) => {
    try {
        if (!searchTerm) {
            return getAllShowsByUser(userId);
        }

        const response = await fetch(`http://localhost:3000/shows/search?searchTerm=${searchTerm}&userId=${userId}`, {
            method: 'GET',
            credentials: 'include', 
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


