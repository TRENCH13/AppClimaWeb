document.getElementById('currentWeatherBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'db5067a305d7244fd6baf81271830854'; 

    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const weatherResult = document.getElementById('weatherResult');
                    weatherResult.innerHTML = `
                        <h2>Weather in ${data.name}</h2>
                        <p>Temperature: ${data.main.temp}°C</p>
                        <p>Weather: ${data.weather[0].description}</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                        <p>Wind Speed: ${data.wind.speed} m/s</p>
                    `;
                } else {
                    alert('No se encontró la ciudad');
                }
            })
            .catch(error => {
                console.error('Error al cargar:', error);
                alert('Un error ocurrió al cargar la información.');
            });
    } else {
        alert('Ingresa un nombre de una ciudad');
    }
});

document.getElementById('forecastBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'db5067a305d7244fd6baf81271830854'; 

    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === "200") {
                    const forecastResult = document.getElementById('forecastResult');
                    forecastResult.innerHTML = `<h2>5-Day Forecast for ${data.city.name}</h2>`;
                    
                    let forecastHTML = '';
                    for (let i = 0; i < data.list.length; i += 8) {
                        const forecast = data.list[i];
                        const date = new Date(forecast.dt_txt).toLocaleDateString();
                        const icon = forecast.weather[0].icon;
                        const tempDay = forecast.main.temp;
                        const tempNight = forecast.main.temp_min;
                        
                        forecastHTML += `
                            <div class="forecast-day">
                                <h3>${date}</h3>
                                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${forecast.weather[0].description}">
                                <p>Day: ${tempDay}°C</p>
                                <p>Night: ${tempNight}°C</p>
                            </div>
                        `;
                    }

                    forecastResult.innerHTML = forecastHTML;
                } else {
                    alert('No se encontró la ciudad');
                }
            })
            .catch(error => {
                console.error('Error al cargar:', error);
                alert('Un error ocurrió al cargar la información.');
            });
    } else {
        alert('Ingresa un nombre de una ciudad');
    }
});
