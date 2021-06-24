export const BASE_URL = 'https://stormy-woodland-16815.herokuapp.com/api';

// register new user
export async function registerUser(usernameValue, passwordValue) {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameValue,
                password: passwordValue
            })
        })

        const {data: {token}} = await response.json();

        localStorage.setItem("token", JSON.stringify(token));
    } catch (error) {
        throw error;
    }
}

// login existing user
export async function loginUser(usernameValue, passwordValue) {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameValue,
                password: passwordValue
            })
        })

        const {data: {token}} = await response.json();

        localStorage.setItem("token", JSON.stringify(token));
    } catch (error) {
        throw error;
    }
}

// logout current user
export function logoutUser() {
    localStorage.removeItem("token");
}

// fetch all routines
export async function fetchRoutines() {
    try {
        const response = await fetch(`${BASE_URL}/routines`);
        const routines = await response.json();

        return routines;
    } catch (error) {
        throw error;
    }
}

// fetch all activities
export async function fetchActivities() {
    try {
        const response = await fetch(`${BASE_URL}/activities`);
        const activities = await response.json();
        
        return activities;
    } catch (error) {
        throw error;
    }
}