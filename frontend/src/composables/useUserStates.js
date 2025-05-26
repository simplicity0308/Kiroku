import { ref } from 'vue';

const currentUser = ref({
    id: undefined,
    username: undefined,
    isLoggedIn: false
});

export function useUserStates() {

    const resetCurrentUserState = () => {
        currentUser.value = {
            id: undefined,
            username: undefined,
            isLoggedIn: false
        };
    };

    return {
        currentUser, 
        
        // user logout
        resetCurrentUserState
    }
}