async function searchCity() {
    const city = document.getElementById("cityInput").value.trim();
    const loading = document.getElementById("loadingSpinner");
    loading.style.display = "block";
  
    document.getElementById("weather").innerHTML = "";
    document.getElementById("attractions").innerHTML = "";
  
    try {
      const response = await fetch(`/api/weather?city=${city}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      
      const data = await response.json();
  
      // Handle response data and display weather information
      loading.style.display = "none";
      if (data.cod === 200) {
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const weatherHTML = `
          <div class="card animate">
            <h3>🌤️ Weather in ${city}</h3>
            <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon">
            <p>Temperature: ${temperature}°C</p>
            <p>${description}</p>
          </div>
        `;
        document.getElementById("weather").innerHTML = weatherHTML;
      } else {
        document.getElementById("weather").innerHTML = `<p>City not found. Please try again.</p>`;
      }
    } catch (error) {
      loading.style.display = "none";
      console.error('Error fetching data:', error);
      document.getElementById("weather").innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    }
  }
  