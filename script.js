const url = 'https://api.github.com/users';

let btn = document.querySelector('.button1');
let inputEl = document.querySelector('.input-text');
let loadingEl = document.querySelector('.loadingAli');         
let danishEl = document.querySelector('.danishAli');   

function fetchProfile(profile) {
    return `
    <div class="card">
        <div class="profile-container">
            <div class="profile">
                <div class="img">
                    <img src="${profile.avatar_url}" alt="${profile.name}">
                </div>
                <div class="content">
                    <h2>${profile.name}</h2>
                    <p>${profile.email || 'No email available'}</p>
                </div>
            </div>
            <div class="button2">
                <a href="${profile.html_url}" target="_blank">
                    <button class="search-followers">View Profile</button>
                </a>
            </div>
        </div>
        <div class="para">
            <h1>About</h1>
            <p>${profile.bio || 'No bio available'}</p>
        </div>
        <div class="sections">
            <div class="sec1">
                <h2>Following</h2>
                <p>${profile.following}</p>
            </div>
            <div class="sec2">
                <h2>Followers</h2>
                <p>${profile.followers}</p>
            </div>
            <div class="sec3">
                <h2>Repos</h2>
                <p>${profile.public_repos}</p>
            </div>
        </div>
    </div>
    `;
}

const fetchApi = async () => {
    const username = inputEl.value;
    loadingEl.innerHTML = 'Loading . . . .';
    loadingEl.style.color = 'black';

    try {
        let res = await fetch(`${url}/${username}`);
        const data = await res.json();

        if (data.bio) {
            danishEl.innerHTML = fetchProfile(data); // 
            loadingEl.innerHTML = '';
        } else {
            loadingEl.innerHTML = data.message;
            loadingEl.style.color = 'red';
        }
    } catch (error) {
        console.log(error);
        loadingEl.innerHTML = 'Error occurred';
        loadingEl.style.color = 'red';
    }
}

btn.addEventListener('click', fetchApi);
