const form = document.getElementById("search-form");
form.addEventListener("submit", handleSearch);

async function handleSearch(event) {
  event.preventDefault(); // Prevent form submission from reloading the page

  const username = document.getElementById("username").value.trim();
  const userInfoDiv = document.getElementById("user-info");
  const errorDiv = document.getElementById("error-message");

  clearPreviousData(userInfoDiv, errorDiv);

  if (!username) {
    displayError(errorDiv, "Please enter a GitHub username.");
    return;
  }

  try {
    const data = await fetchGitHubUser(username);
    displayUserInfo(data, userInfoDiv);
  } catch (error) {
    displayError(errorDiv, error.message);
  }
}

function clearPreviousData(userInfoDiv, errorDiv) {
  userInfoDiv.innerHTML = "";
  errorDiv.textContent = "";
}

function displayError(errorDiv, message) {
  errorDiv.textContent = message;
}

async function fetchGitHubUser(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (!response.ok) {
    throw new Error("User not found or API error");
  }

  return await response.json();
}

function displayUserInfo(data, userInfoDiv) {
  const { avatar_url, login, name, bio, followers, twitter_username } = data;

  userInfoDiv.innerHTML = `
    <img src="${avatar_url}" alt="${login}'s avatar">
    <h2>${name || "No name available"}</h2>
    <p>${bio || "No bio available"}</p>
    <p>Followers: ${followers}</p>
    <p>Twitter Username: ${
      twitter_username
        ? `<a href="https://twitter.com/${twitter_username}" target="_blank">${twitter_username}</a>`
        : "No Twitter username available"
    }</p>
  `;
}
