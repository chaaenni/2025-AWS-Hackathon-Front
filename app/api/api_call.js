'use client'
import axios from 'axios';

const base_url = "http://localhost:8000";

export const getCurrentUserInfo = async (func) => {
    fetch(`${base_url}/get_current_user_info/`).then(
        (response) => response.json()
    ).then(
        (data) => {
            func(data);
        }
    )
}

export const setCurrentUserInfo = async (inst) => {
    fetch(`${base_url}/set_current_user_info/`, {
        method: "POST",
        // mode: "no-cors",
        credentials: "include",
        headers: {
           "Content-Type": "application/json"
        },
        body: JSON.stringify(inst)
    }).then(
        (response) => response.json()
    ).then(
        (data) => {
            console.log(data);
        }
    )
}

export const setInventoryInfo = async (inst) => {
    fetch(`${base_url}/set_current_user_info/`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(inst)
    }).then(
        (data) => {
            console.log(data);
        }
    )
}

export const getRandomScooterLog = async (func) => {
    fetch(`${base_url}/get_random_scooter_log/`).then(
        (response) => response.json()
    ).then(
        (data) => {
            func(data);
        }
    )
}

export const generateTale = async (func) => {
    fetch(`${base_url}/generate_tale/`).then(
        (response) => response.json()
    ).then(
        (data) => {
            func(data);
        }
    )
}

export const gacha = async (func) => {
    fetch(`${base_url}/gacha`).then(
        (response) => response.json()
    ).then(
        (data) => {
            func(data)
        }
    )
}