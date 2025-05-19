export const loginUser = async (username, password) => {
    // validation here
    if (!validateUsername(username)){

    } else if (!validatePassword(password)) {

    } else {
      // api call
            
    }

}

export const registerUser = async (username, password) => {

}

export const logoutUser = async () => {
    // call composables? unsure if best practice
}



// helper functions 
const validateUsername = (username)
// make api call to check if username is taken