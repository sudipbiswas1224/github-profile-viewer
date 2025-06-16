const usernameInput = document.querySelector('.input-text')
const searchBtn = document.querySelector('.search-btn')
const showData = document.querySelector('.show-data')



function fetchUserData(username) {
    return fetch(`https://api.github.com/users/${username}`).then((raw) => {
        if (!raw.ok) throw new Error("User not found")
        return raw.json();
    })
}
function fetchUserRepo(username) {
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then((raw) => {
        if (!raw.ok) throw new Error('User not found')
        return raw.json();
    })
}


const decorateUserData = (details) => {
    console.log(details);
    let data = `<div class="p-8">
        <!-- Profile Header -->
        <div class="flex items-center gap-6">
          <div class="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border">
            <!-- Replace src dynamically -->
            <img src=${details.avatar_url}alt="User Avatar" class="w-full h-full object-cover" />
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-800">${details.name}</h2>
            <p class="text-gray-700">@${details.login}</p>
            <a href="https://github.com/${details.login}" target="_blank" class="text-[#EAEFEF] hover:underline text-sm mt-1 inline-block">View Profile</a>
          </div>
        </div>

        <!-- User Info Grid -->
        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-700 text-sm">
          <p><strong>Name:${details.name ? details.name : ''}</strong></p>
          <p><strong>Company:${details.company ? details.company : ''}</strong></p>
          <p><strong>Location:${details.location ? details.location : ''}</strong></p>
          <p><strong>Email:${details.email ? details.email : ''}</strong></p>
          <p><strong>Followers:${details.followers}</strong></p>
          <p><strong>Following:${details.following }</strong></p>
          <p><strong>Public Repos:${details.public_repo}</strong></p>
          <p><strong>Bio:${details.bio ? details.bio : ''}</strong></p>
        </div>

        <!-- Repositories List (Sample Placeholder) -->
      </div>`
      showData.innerHTML = data;

}

//taking the input from the input bar 
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let username = usernameInput.value.trim();
    usernameInput.value = ''

    if (username.length > 0) {
        fetchUserData(username).then(data => {
            decorateUserData(data);
            console.log(data);
        })
    }
    else {
        alert("Username can't be empty");
    }


})


fetchUserData('sudipbiswas1224').then(data=>{
  decorateUserData(data);
})



