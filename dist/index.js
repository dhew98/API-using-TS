"use strict";
const getUserName = document.querySelector("#user");
const formSubmit = document.querySelector('.form');
const mainContainer = document.querySelector(".main-container");
async function fecthUserData(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const userInfo = await response.json();
            return userInfo;
        }
        else {
            console.error(`Error fetching user data for`);
            return null;
        }
    }
    catch (error) {
        console.error("Error!!!");
        return null;
    }
}
async function displayUser() {
    const users = await fecthUserData("https://api.github.com/users");
    if (users) {
        for (let user of users) {
            console.log(user);
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `
                <h2>${user.login}</h2>
        <p>ID: ${user.id}</p>
        <p><img src="${user.avatar_url}" alt="${user.login}" /></p>
        <p><a href="${user.url}" target="_blank">GitHub Profile</a></p>
        <hr>`;
            mainContainer.appendChild(userDiv);
        }
    }
}
displayUser();
