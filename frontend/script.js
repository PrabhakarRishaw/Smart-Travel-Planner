async function searchCity() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    alert('Please enter a city name!');
    return;
  }

  // Show loading spinner
  document.getElementById('loadingSpinner').style.display = 'block';

  try {
    await fetchWeather(city);
    await fetchAttractions(city);

    // Smooth scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    console.error('Error during search:', error);
    alert('Something went wrong. Please try again!');
  }

  // Hide loading spinner
  document.getElementById('loadingSpinner').style.display = 'none';
}

async function fetchWeather(city) {
  const apiKey = '567a7ac888b84c92ba7104635252704';  // your given API key
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch weather');

  const data = await res.json();

  document.getElementById('weather').innerHTML = `
    <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
    <p>${data.current.temp_c}°C - ${data.current.condition.text}</p>
    <img src="https:${data.current.condition.icon}" alt="Weather icon">
    <p>Humidity: ${data.current.humidity}%</p>
    <p>Wind: ${data.current.wind_kph} kph</p>
    <p>Air Quality: ${data.current.air_quality.pm2_5 ? 'Good' : 'Moderate'}</p>
  `;
}

async function fetchAttractions(city) {
  const res = await fetch(`http://localhost:5000/api/attractions/${city}`);
  if (!res.ok) throw new Error('Failed to fetch attractions');

  const data = await res.json();

  let attractionsHTML = '<h2>Top Attractions</h2>';
  
  if (!data.results || data.results.length === 0) {
    attractionsHTML += `<p>No attractions found.</p>`;
  } else {
    data.results.slice(0, 5).forEach(place => {
      attractionsHTML += `
        <div class="attraction-card">
          <h3>${place.name}</h3>
          <p>Category: ${place.categories && place.categories.length > 0 ? place.categories[0].name : 'N/A'}</p>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}" target="_blank">📍 View on Map</a>
        </div>
      `;
    });
  }

  document.getElementById('attractions').innerHTML = attractionsHTML;
}
