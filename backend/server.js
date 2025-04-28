const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const API_KEY = '567a7ac888b84c92ba7104635252704'; // Your OpenWeather API Key

// Middleware to serve static files (e.g., your HTML, CSS, and JS)
app.use(express.static('public'));

app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    // Fetch weather data from OpenWeather API
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const weatherData = response.data;

    // Send the data back to the frontend
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
