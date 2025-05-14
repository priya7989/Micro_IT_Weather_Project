const apiKey = "2d5ee638791548fa968a22b250b28066";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (city === "") return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        document.getElementById("weatherResult").innerHTML = "City not found!";
        document.body.style.backgroundImage = "url('')";
        return;
      }

      const icon = data.weather[0].icon;
      const condition = data.weather[0].main;
      

      const weatherInfo = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Condition:</strong> ${condition}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">
      `;

      document.getElementById("weatherResult").innerHTML = weatherInfo;
    })
    .catch(error => {
      document.getElementById("weatherResult").innerHTML = "Error fetching data.";
      console.error("Fetch Error:", error);
    });
}

function getBackgroundImage(condition) {
  switch (condition.toLowerCase()) {
    case "clear": return "https://images.unsplash.com/photo-1501973801540-537f08ccae7e";
    case "clouds": return "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31";
    case "rain": return "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0";
    case "drizzle": return "https://images.unsplash.com/photo-1518837695005-2083093ee35b";
    case "thunderstorm": return "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee";
    case "snow": return "https://images.unsplash.com/photo-1544441893-72e8b3f9e8f2";
    case "mist":
    case "haze":
    case "fog": return "https://images.unsplash.com/photo-1504743364-3f045cddef1f";
    default: return "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0";
  }
}
