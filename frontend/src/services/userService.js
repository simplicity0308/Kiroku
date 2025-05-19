export const loginUser = async (username, password) => {
    try {
        console.log("Logging in user:", username, 'with password:', password);
        if (!loginValidaton(username, password)){
            console.log("blank username or password")
            return {
                success: false,
                error: "Username or password cannot be blank"
            }
        } else {
            const response = await fetch("http://localhost:3000/user/login", {
                // above returns response object but not the data
                // need to use response.json() to get the data
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            if (!response.ok) {
                console.log("Invalid credentials or user does not exist");
                console.log(response)
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.message
                } 
            } else {
                console.log("Service user logged in")
                return {
                    success: true 
                }
            }
        }
    } catch (error) {
        console.error("Error logging in:", error);
        return {
            success: false,
            error: "Error logging in"
        }
    }
}


export const registerUser = async (username, password) => {

}

export const logoutUser = async () => {         
// call composables? unsure if best practice
}

// dont use async on function, it will return a promise instead of the value

// helper functions 
const loginValidaton = (username, password) => {
    // check if username and password are not empty
    if (username === undefined || password === undefined) {
        return false;
    }
    // check if username and password are not empty
    if (username.length < 1 || password.length < 1) {
        return false;
    }
    return true;
}

const validateUsername = async (username) => {
    // check if username is valid
    if (username.length < 3 || username.length > 20 || usernme === undefined) {
        return false;
}
// check if username is alphanumeric (no spaces or special characters)
    const regex = /^[a-zA-Z0-9]+$/;
        if (!regex.test(username)) {
        return false;
    }
        return true;
}

const validatePassword = async (password) => { 
// check if password is valid
if (password.length < 8 || password.length > 20 || password === undefined) {
    return false;
}
// check if password contains at least one uppercase letter, one lowercase letter, one number, and one special character
const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
if (!regex.test(password)) {
    return false;
}
    return true;
}
// make api call to check if username is taken