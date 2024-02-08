const getUserName=document.querySelector<HTMLInputElement>("#user");

const formSubmit=document.querySelector('.form') as HTMLFormElement


const mainContainer=document.querySelector(".main-container") as HTMLElement

interface UserData{
    [index:string]:number|string
    // id:number;
    // login:string;
    // avatar_url:string;
    // url:string;
}



async function fecthUserData(url:string):Promise<UserData[] | null>{
    try {
        const response=await fetch(url);
        if(response.ok){
            const userInfo:UserData[]=await response.json();
            return userInfo;
        }
        else {
            console.error(`Error fetching user data for`);
            return null;
          }
    } catch (error) {
        console.error("Error!!!");
        return null;
    }
    
}

async function displayUser(){
    const users= await  fecthUserData("https://api.github.com/users");


    if(users)
    {
        for(let user of users){
            console.log(user);
                const userDiv=document.createElement('div');
                userDiv.innerHTML=`
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



