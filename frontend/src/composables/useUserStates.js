import { ref } from 'vue';

export function useUserStates() {
    const currentUser = ref({
        id: undefined,
        username: undefined,
        isLoggedIn: false
    });

    const resetCurrentUser = () => {
        currentUser.value = {
            id: undefined,
            username: undefined,
            isLoggedIn: false
        };
    };

    return {
        currentUser, 
        
        // user logout
        resetCurrentUser
    }
}