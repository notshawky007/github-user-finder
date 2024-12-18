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

  saveSearchHistory(username);

  try {
    const userData = await fetchGitHubUser(username);
    const repoData = await fetchGitHubRepos(username);
    displayUserInfo(userData, userInfoDiv);
    await displayUserRepos(repoData, userInfoDiv);
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
  errorDiv.style.color = "red";
  errorDiv.style.fontWeight = "bold";
}

async function fetchGitHubUser(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        "User not found. Please check the username and try again."
      );
    } else if (response.status === 403) {
      throw new Error("API rate limit exceeded. Please try again later.");
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  }

  return await response.json();
}

async function fetchGitHubRepos(username) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Repositories not found for this user.");
    } else if (response.status === 403) {
      throw new Error("API rate limit exceeded. Please try again later.");
    } else {
      throw new Error("Unable to fetch repositories.");
    }
  }

  return await response.json();
}

async function fetchRepoLanguages(languagesUrl) {
  const response = await fetch(languagesUrl);

  if (!response.ok) {
    throw new Error("Unable to fetch repository languages");
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
    <h3>Repositories:</h3>
  `;
}

async function displayUserRepos(repos, userInfoDiv) {
  const reposContainer = document.createElement("div");
  reposContainer.className = "repos-container";

  for (const repo of repos) {
    const {
      name,
      description,
      stargazers_count,
      forks_count,
      html_url,
      languages_url,
    } = repo;

    const repoItem = document.createElement("div");
    repoItem.className = "repo-item";

    let languagesList = "No languages available";
    try {
      const languages = await fetchRepoLanguages(languages_url);
      languagesList =
        Object.keys(languages).join(", ") || "No languages available";
    } catch (error) {
      console.error("Error fetching languages:", error.message);
    }

    repoItem.innerHTML = `
      <h4><a href="${html_url}" target="_blank">${name}</a></h4>
      <p>${description || "No description available"}</p>
      <p>⭐ ${stargazers_count} | 🍴 ${forks_count}</p>
      <p class="languages">Languages: ${languagesList}</p>
    `;

    reposContainer.appendChild(repoItem);
  }

  userInfoDiv.appendChild(reposContainer);
}

function saveSearchHistory(username) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (!history.includes(username)) {
    history.push(username);
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }
  displaySearchHistory();
}

function displaySearchHistory() {
  const historyDiv = document.getElementById("search-history");
  if (!historyDiv) return;

  historyDiv.innerHTML = "<h3>Search History:</h3>";
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  history.forEach((username) => {
    const historyItem = document.createElement("button");
    historyItem.className = "history-item";
    historyItem.textContent = username;
    historyItem.addEventListener("click", () => {
      document.getElementById("username").value = username;
      form.dispatchEvent(new Event("submit"));
    });
    historyDiv.appendChild(historyItem);
  });
}

displaySearchHistory();
