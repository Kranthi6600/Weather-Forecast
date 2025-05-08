console.log('hi');

const darkMode = document.getElementById("darkMode");

if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
}

darkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark") ? "enabled" : "disabled");
});

const API_KEY = '09ce12de9c67fd7aa31f9a111fd340ff';

async function getWeather() {
    const city = document.getElementById('city').value;

    if (city === "") {
        alert('Please enter a city name.');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            alert('City not found. Please try again.');
            return;
        }


        const {main, weather, wind, name } = data;
        const temperature = main.temp;
        const description = weather[0].description;
        const humidity = main.humidity;
        const windSpeed = wind.speed;

        document.getElementById('city-name').textContent = `Weather in ${name}`;
        document.getElementById('temp').textContent = temperature;
        document.getElementById('weather').textContent = description;
        document.getElementById('humidity').textContent = humidity;
        document.getElementById('wind-speed').textContent = windSpeed;

        document.getElementById('weather-container').style.display = 'block';

    } catch (error) {
        console.error(error);
        alert('An error occurred while fetching the weather data.');
    }
}