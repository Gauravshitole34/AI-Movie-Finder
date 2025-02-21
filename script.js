const API_KEY = "3c7cd372a4b48552ee8609a33cb39c73"; // Replace with your TMDb API key
const BASE_URL = "https://api.themoviedb.org/3";

async function searchMovie() {
    let query = document.getElementById("movieInput").value.trim();
    if (query === "") return;
    
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    
    if (data.results.length > 0) {
        displayMovie(data.results[0]); // Show first result
        fetchRecommendations(data.results[0].id);
    } else {
        document.getElementById("movieResults").innerHTML = "<p>No movie found.</p>";
    }
}

function displayMovie(movie) {
    let movieHTML = `
        <div class="movie-card">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <h5>${movie.title} (${movie.release_date.split("-")[0]})</h5>
                <p>⭐ ${movie.vote_average} / 10</p>
                <p>${movie.overview}</p>
            </div>
        </div>
    `;
    document.getElementById("movieResults").innerHTML = movieHTML;
}

async function fetchRecommendations(movieId) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`);
    const data = await response.json();

    let recommendationHTML = "<h4>🎥 Recommended Movies</h4>";
    if (data.results.length > 0) {
        data.results.slice(0, 5).forEach(movie => {
            recommendationHTML += `
                <div class="movie-card">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <div class="movie-info">
                        <h6>${movie.title} (${movie.release_date.split("-")[0]})</h6>
                        <p>⭐ ${movie.vote_average} / 10</p>
                    </div>
                </div>
            `;
        });
    } else {
        recommendationHTML += "<p>No recommendations available.</p>";
    }
    
    document.getElementById("recommendations").innerHTML = recommendationHTML;
}

document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("FdP36qboAuATCv8WK"); // Replace with your EmailJS Public Key

    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;

        let params = {
            from_name: name,
            from_email: email,
            message: message
        };

        emailjs.send("service_m4h52vv", "template_habkdk5", params)
            .then(function (response) {
                document.getElementById("responseMessage").innerText = "Message sent successfully!";
                document.getElementById("responseMessage").style.color = "green";
                document.getElementById("contactForm").reset();
            }, function (error) {
                document.getElementById("responseMessage").innerText = "Error sending message. Try again!";
                document.getElementById("responseMessage").style.color = "red";
            });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // Check if Dark Mode was previously enabled
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        darkModeToggle.innerText = "☀️";
    }

    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.innerText = "☀️";
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.innerText = "🌙";
        }
    });
});

