const apiKey = "2d5ee638791548fa968a22b250b28066";

// Set default background at start
document.body.style.backgroundImage = "url('https://wallpaperaccess.com/full/24245.jpg')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const lat = document.getElementById("latInput").value.trim();
  const lon = document.getElementById("lonInput").value.trim();

  let url = "";

  if (city !== "") {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  } else if (lat !== "" && lon !== "") {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  } else {
    document.getElementById("weatherResult").innerHTML = `<p style="color:red;">Please enter a city or coordinates.</p>`;
    return;
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404" || data.cod === 404) {
        document.getElementById("weatherResult").innerHTML = `
          <h3 style="color: red;">City not found!</h3>`;
        return;
      }

      const condition = data.weather[0].main;
      const icon = data.weather[0].icon;
      const bgImage = getBackgroundImage(condition);
      const conditionFormatted = condition.charAt(0).toUpperCase() + condition.slice(1).toLowerCase();

      // Set background
      document.body.style.backgroundImage = `url('${bgImage}')`;

      const weatherInfo = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Condition:</strong> ${conditionFormatted}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
      `;

      document.getElementById("weatherResult").innerHTML = weatherInfo;
    })
    .catch(error => {
      document.getElementById("weatherResult").innerHTML = "<p style='color:red;'>Error fetching data.</p>";
      console.error("Fetch Error:", error);
    });
}
//whether conditions
function getBackgroundImage(condition) {
  switch (condition.toLowerCase()) {
    case "clear":
      return "https://s7d2.scene7.com/is/image/TWCNews/img_3214_jpg-2";
    case "clouds":
      return "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31";
    case "rain":
      return "https://calcoastnews.com/images/2016/01/Rain-4.jpg";
    case "drizzle":
      return "https://www.collinsdictionary.com/images/full/drizzle_223387984.jpg?version=4.0.180";
    case "thunderstorm":
      return "https://img.fotocommunity.com/severe-thunderstorm-938ae087-f6eb-4ec0-8be9-54b66ce98788.jpg?height=1080";
    case "snow":
      return "https://static01.nyt.com/images/2023/02/24/multimedia/24calif-snow-qkgh/24calif-snow-qkgh-videoSixteenByNine3000.jpg";
    case "mist":
    case "haze":
    case "fog":
      return "https://images.unsplash.com/photo-1504743364-3f045cddef1f";
    default:
      return "https://wallpaperaccess.com/full/24245.jpg";
  }
}
