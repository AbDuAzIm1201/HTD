const btn = document.getElementById("send");
const input = document.getElementById("input");
const weatherImg = document.getElementById("weather-img");
const err = document.getElementById("err");
const apiKey = '0837213505e842f3a3b0490b885afd02'; 

btn.addEventListener("click", () => {
    const city = input.value.trim();
    if (!city) {
        alert("Please enter a city!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(url)
        .then(res => res.json())
        .then(json => weatherView(json));
});

function weatherView(data) {
    if (data.cod === '404') {
        err.style.display = "block";
        err.textContent = "City not found!";
        weatherImg.src = ""; 
    } else {
        err.style.display = "none";

     
        alert(`Weather for ${data.name}, ${data.sys.country}:\n` + 
              `Temperature: ${data.main.temp}°C\n` + 
              `Humidity: ${data.main.humidity}%\n` + 
              `Weather: ${data.weather[0].main}\n` + 
              `Description: ${data.weather[0].description}`);

        
        if (data.weather[0].main === "Clear") {
            weatherImg.src = "./img/sun.png";
        } else if (data.weather[0].main === "Rain") {
            weatherImg.src = "./img/rain.png";
        } else {
            weatherImg.src = ""; 
        }
    }
}
