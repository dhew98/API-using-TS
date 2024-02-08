"use strict";
const getUserName = document.querySelector("#user");
const formSubmit = document.querySelector('#form');
const mainContainer = document.querySelector(".main-container");
const url = "https://api.github.com/users";
async function fecthUserData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        console.error(`Error fetching user data for`);
    }
    const userInfo = response.json();
    return userInfo;
}
async function displayUser() {
    const users = await fecthUserData(url);
    for (let user of users) {
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
displayUser();
formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchName = getUserName.value.toLocaleLowerCase();
    try {
        const users = await fecthUserData(url);
        const matchingUsers = users.filter((user) => {
            return user.login.toLocaleLowerCase().includes(searchName);
        });
        console.log(matchingUsers);
        mainContainer.innerHTML = "";
        if (matchingUsers.length === 0) {
            const contDiv = document.createElement("div");
            contDiv.innerHTML = `
            <h2> No User Found!</h2>`;
            mainContainer.appendChild(contDiv);
        }
        else {
            for (let user of matchingUsers) {
                console.log(user);
                const contDiv = document.createElement("div");
                contDiv.innerHTML = `
                    <h2>${user.login}</h2>
            <p>ID: ${user.id}</p>
            <p><img src="${user.avatar_url}" alt="${user.login}" /></p>
            <p><a href="${user.url}" target="_blank">GitHub Profile</a></p>
            <hr>`;
                mainContainer.appendChild(contDiv);
            }
        }
    }
    catch (error) {
        console.log("Error in matching!!!");
    }
});
