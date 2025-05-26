<template>
    <div class="login-page">
        <div class="animated-background">
            <div class="wave wave-1"></div>
            <div class="wave wave-2"></div>
            <div class="wave wave-3"></div>
        </div>
        <div class="header-box">Welcome To Kiroku 記録</div>
        <div class="sub-header-box">Please log in or register to continue</div>
        <div class="login-form">
            <div class="form-card">
                <form @submit.prevent="submitloginUser(currentUser)">
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input 
                            type="text" 
                            id="username" 
                            v-model="currentUser.username" 
                            placeholder="Enter your username"
                        />
                    </div>

                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            v-model="currentUser.password" 
                            placeholder="Enter your password"
                        />
                    </div>

                    <div class="submit-button">
                        <button type="submit">Login</button>
                    </div>
                    <div class="register-button">
                        <button @click="submitRegisterUser(currentUser)">Register</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useToast } from 'vue-toast-notification';
import { useRouter } from 'vue-router';

// service 
import { loginUser, registerUser } from '../services/userService';


// composables
import { useUserStates } from '../composables/useUserStates';

// get user state from composables
const {
    currentUser,

    resetCurrentUserState
} = useUserStates();

const router = useRouter();
const toast = useToast();

const submitloginUser = async (currentUser) => {
    const result = await loginUser(currentUser.username, currentUser.password);
    if (result.success) {
        console.log('Login successful:');
        toast.success('Login successful!')

        console.log('User data:', result);

        currentUser.username = result.username;
        currentUser.userId = result.userId;
        currentUser.isLoggedIn = true;

        console.log('Current user:', currentUser)
        toast.default('Redirecting to home page...');
        
        setTimeout(() => {
            toast.clear();
            router.push('/home');
        }, 1000);

    } else {
        console.log(result.error)
        console.error('Login failed:', result.error);
        toast.error('Login failed: ' + result.error);
        resetCurrentUserState();
    }
}

const submitRegisterUser = async (currentUser) => {
    const result = await registerUser(currentUser.username, currentUser.password);
    if (result.success) {
        toast.success('Registration successful!')
        toast.default('Please login to continue...');

        resetCurrentUserState();
        setTimeout(() => {
            toast.clear();
            window.location.href = '/login';
        }, 1000);
    } else {
        console.error('Registration failed:', result.error);
        toast.error('Registration failed: ' + result.error);
        resetCurrentUserState();
    }
}
</script>
    
<style scoped> 
.login-page {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* min-height: 100vh; */
    width: 100%;
    z-index: 1;
}
.header-box {
    text-align: center;
    font-size: 52px; /* Large desktop font */
    color: white;
    margin-bottom: 15px;
    text-shadow: 8px 1px 2px rgb(40, 35, 65);
    transform: skewX(-10deg);
}

.sub-header-box {
    text-align: center;
    font-size: 22px;
    color: #00ffe7;
    margin-bottom: 50px;
    text-shadow: 0 0 5px #00ffe7;
    font-family: 'Courier New', monospace;
    letter-spacing: 0.1px;
}

.login-form {
    width: 600px; 
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
    
}

.form-card {
    background: rgba(12, 12, 15, 0.85);
    padding: 50px;
    border-radius: 12px;
    border: 2px solid #d580ff;
    box-shadow: 
        0 0 10px rgba(213, 128, 255, 0.5),
        0 0 20px rgba(0, 0, 0, 0.5);
    animation: cardGlow 3s infinite;
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
}

.form-group {
    width: 100%;
    margin-bottom: 30px;
    display: flex; 
    flex-direction: column; 
    /* align-items: flex-start;  */
}

.form-group label {
    color: #fff;
    margin-bottom: 12px;
    font-weight: 500;
    font-size: 20px;
    text-transform: uppercase;
    font-family: 'Courier New', monospace;
    letter-spacing: 1px;
}

.form-group input {
    width: 100%;
    height: 60px;
    padding: 0 20px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-family: 'Courier New', monospace;
    font-size: 18px;
    border: 2px solid #ff66c4; /* Pink borders for inputs */
    border-radius: 6px;
    box-shadow: 0 0 3px #ff66c4;
    transition: all 0.3s ease;
    box-sizing: border-box;
    margin: 0;
}

.form-group input:focus {
    outline: none;
    border-color: #00ffe7;
    box-shadow: 
        0 0 5px #00e0ff,
        0 0 10px #00eaff inset;
}

.form-group input::placeholder {
    color: rgba(255, 255, 255, 0.5);
    text-transform: none; /* Don't transform placeholder text */
    font-size: 16px;
}

.submit-button {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.submit-button button {
    width: 70%;
    height: 60px; /* Taller button */
    background: #000000;
    color: #fff;
    font-family: 'Courier New', monospace;
    font-size: 20px;
    text-transform: uppercase;
    border: 2px solid #0011ff;
    border-radius: 6px;
    cursor: pointer;
    box-shadow:
        0 0 3px #457ee7,
        0 0 1px #452bd6,
        0 0 4px #2600ff;
    transition: all 0.2s ease-in-out;
}

.submit-button button:hover {
    background: #001f1d;
    box-shadow:
        0 0 5px #060488,
        0 0 1px #0c30ce,
        0 0 5px #4f7bf3,
        0 0 20px #2213ec inset;
    transform: scale(1.03);
}

.register-button {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.register-button button {
    width: 70%;
    height: 60px; 
    background: #000000;
    color: #fff;
    font-family: 'Courier New', monospace;
    font-size: 20px;
    text-transform: uppercase;
    border: 2px solid #00ffe7;
    border-radius: 6px;
    cursor: pointer;
    box-shadow:
        0 0 3px #00ffe7,
        0 0 1px #bafff7,
        0 0 4px #00ffff;
    transition: all 0.2s ease-in-out;
}

.register-button button:hover {
    background: #001f1d;
    box-shadow:
        0 0 5px #060488,
        0 0 1px #0c30ce,
        0 0 5px #4f7bf3,
        0 0 20px #13b9ecc0 inset;
    transform: scale(1.03);
}

/* Animation for the login card */
@keyframes cardGlow {
    0% { box-shadow: 0 0 10px rgba(213, 128, 255, 0.5), 0 0 20px rgba(0, 0, 0, 0.5); }
    50% { box-shadow: 0 0 15px rgba(213, 128, 255, 0.7), 0 0 25px rgba(0, 0, 0, 0.6); }
    100% { box-shadow: 0 0 10px rgba(213, 128, 255, 0.5), 0 0 20px rgba(0, 0, 0, 0.5); }
}

/* Add animated background with waves */
.animated-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    z-index: -1;
}

.wave {
    position: absolute;
    width: 300%;
    height: 100%;
    bottom: -50%;
    left: -100%;
    background: rgba(90, 90, 90, 0.12);
    border-radius: 48%;
}

.wave-1 {
    animation: wave 35s infinite linear;
    opacity: 0.15;
    transform: translateZ(0) scale(0.7);
    background: linear-gradient(to right, 
        rgba(85, 80, 88, 0.315),
        rgba(90, 90, 90, 0.192), 
        rgba(137, 43, 226, 0.137)
    );
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
    opacity: 0.12;
    transform: translateZ(0);
    background: linear-gradient(to right, 
        rgba(72, 61, 139, 0.05),
        rgba(100, 100, 100, 0.1),
        rgba(72, 61, 139, 0.05)
    );
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