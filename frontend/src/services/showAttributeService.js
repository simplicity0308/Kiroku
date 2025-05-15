export const changeShowEpisode = async (showId, episode) => {
    console.log("show attri service", showId, episode);
    try {
        const response = await fetch(`http://localhost:3000/shows/changeEpisode`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                showId: showId, 
                count: episode })
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Show episode updated successfully", data);
            return { success: true, data };
        } else {
            console.error("Error updating show episode:", data);
            return { success: false, error: data.message };
        }
    } catch (error) {
        console.error("Error updating show episode:", error);
        return { success: false, error: error.message };
    }
}