const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const currentImageContainer = document.getElementById(
  "current-image-container"
);
const searchHistory = document.getElementById("search-history");

const apiKey = "eD5J0qDMa28D5xXqTep7A3h4W2drihJXfu87R8Ci";

// Function to fetch data for current date from NASA API and display it in UI
function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      currentImageContainer.innerHTML = `
        <h2>${data.title}</h2> 
        <h3>Picture on ${currentDate}</h3>
        <img src="${data.url}" alt="${data.title}">
        <p>${data.explanation}</p>
      `;
    })
    .catch((error) => console.log(error));
}

// Function to fetch data for selected date from NASA API and display it in UI
function getImageOfTheDay(date) {
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      currentImageContainer.innerHTML = `
        <h2>${data.title}</h2>
        <h3>Picture on ${data.date}</h3>
        <img src="${data.url}" alt="${data.title}">
        <p>${data.explanation}</p>
      `;
      saveSearch(date);
      addSearchToHistory();
    })
    .catch((error) => console.log(error));
}

// Function to save a date to local storage
function saveSearch(date) {
  let searches = localStorage.getItem("searches");
  if (searches) {
    searches = JSON.parse(searches);
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
  } else {
    searches = [date];
    localStorage.setItem("searches", JSON.stringify(searches));
  }
}

// Function to add date to search history list in UI
function addSearchToHistory() {
  let searches = localStorage.getItem("searches");
  if (searches) {
    searches = JSON.parse(searches);
    searchHistory.innerHTML = "";
    searches.forEach((search) => {
      const li = document.createElement("li");
      li.textContent = search;
      li.addEventListener("click", () => getImageOfTheDay(search));
      searchHistory.appendChild(li);
    });
  }
}

// Event listener for form submit
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchDate = searchInput.value;
  getImageOfTheDay(searchDate);
});

// Function to run when page loads
getCurrentImageOfTheDay();
addSearchToHistory();
