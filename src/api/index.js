//export const BASE_URL = 'https://stormy-woodland-16815.herokuapp.com/api';
export const BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api';

// register new user
export async function registerUser(usernameValue, passwordValue) {
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameValue,
                password: passwordValue
            })
        })

        const {token} = await response.json();
        localStorage.setItem("token", JSON.stringify(token));
        return token;
    } catch (error) {
        throw error;
    }
}

// login existing user
export async function loginUser(usernameValue, passwordValue) {
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameValue,
                password: passwordValue
            })
        })

        const {token} = await response.json();
        localStorage.setItem("token", JSON.stringify(token));
        return token;
    } catch (error) {
        throw error;
    }
}

// logout current user
export function logoutUser() {
    localStorage.removeItem("token");
}

// fetch current user info
export async function getUser(token) {
    try {
        const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })

        const data = await response.json();
        localStorage.setItem("username", JSON.stringify(data.username));
        return data.username;
    } catch (error) {
        throw error;
    }
}

// fetch current user's routines
export async function fetchUserRoutines(username, token) {
    try {
        const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        })

        const myRoutines = await response.json();
        return myRoutines;
    } catch (error) {
        throw error;
    }
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

// submit new routine
export async function submitNewRoutine(token, nameValue, goalValue, isPublic=null) {
    try {
        const response = await fetch(`${BASE_URL}/routines`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                name: nameValue,
                goal: goalValue,
                isPublic: isPublic
            })
        })

        const routine = await response.json();
        return routine;
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

// submit new activity
export async function submitNewActivity(token, nameValue, descriptionValue) {
    try {
        const response = await fetch(`${BASE_URL}/activities`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                name: nameValue,
                description: descriptionValue
            })
        })

        const activity = await response.json();
        return activity;
    } catch (error) {
        throw error;
    }
}