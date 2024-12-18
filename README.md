# GitHub User Finder

![GitHub User Finder Screenshot](https://via.placeholder.com/800x400?text=Add+Screenshot+Here)

A modern and user-friendly web application to explore GitHub profiles effortlessly. Search for any GitHub user and access detailed information including:

- Profile picture and bio.
- Followers and Twitter username.
- Public repositories with descriptions, star count, fork count, and programming languages used.
- Interactive search history for easy navigation.

## Live Demo

[View Live Demo](https://notshawky007.github.io/github-user-finder/)

## Features

- **Profile Search:** Quickly fetch and display detailed GitHub user profiles.
- **Repository Insights:** Explore public repositories, with key stats and technologies listed.
- **Search History:** Automatically saves and displays previous searches for convenience.
- **Error Handling:** Clear messages for invalid users or exceeded API rate limits.
- **Responsive Design:** Optimized for desktops, tablets, and mobile devices.

## Technologies Used

- **HTML5:** For structure and layout.
- **CSS3:** For styling and ensuring a responsive design.
- **JavaScript (Vanilla):** For dynamic content rendering and API interaction.
- **GitHub REST API:** Powering user and repository data retrieval.

## Usage

1. Enter a GitHub username in the search bar.
2. Click the **Search** button or press **Enter**.
3. View detailed user profiles and repositories.
4. Click on repository names to visit them on GitHub.
5. Revisit past searches through the interactive search history.

## API Used

This application utilizes the **GitHub REST API** for real-time data fetching:

- [GitHub REST API Documentation](https://docs.github.com/en/rest)

## Error Handling

- **Invalid Usernames:** Displays a message if the username does not exist.
- **Rate Limits:** Warns if unauthenticated API requests exceed 60/hour.
