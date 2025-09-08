import axios from 'axios';

// API key for OpenWeatherMap
const apiKey = "d0cf14bb70ad40a2cce49ba9bfc13694";

// Fetches location data based on a query string
export const fetchLocations = async (query: any, limit = 5) => {
  try {
    // Make API call to get geocoding data
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${apiKey}`
    );
    // Return successful response with data
    return { data: response.data, error: null };
  } catch (err: any) {
    // Handle 401 error for invalid API key
    if (err.response && err.response.status === 401) {
      return { data: null, error: 'Invalid API key. Please check your OpenWeatherMap API key.' };
    }
    // Handle other errors
    return { data: null, error: 'Failed to fetch locations. Check your query or network.' };
  }
};

// Fetches 5-day weather forecast based on latitude and longitude
export const fetchForecast = async (lat: any, lon: any) => {
  try {
    // Make API call to get 5-day/3-hour forecast data
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    // Aggregate 3-hourly data into daily forecasts
    const daily: any[] = [];
    const seenDates = new Set();
    response.data.list.forEach((item: any) => {
      // Convert timestamp to date string
      const date = new Date(item.dt * 1000).toLocaleDateString('en-US');
      // Include only one forecast per day
      if (!seenDates.has(date)) {
        seenDates.add(date);
        daily.push({
          dt: item.dt, // Timestamp
          temp: { day: item.main.temp }, // Daily temperature
          weather: item.weather, // Weather details
        });
      }
    });
    // Return structured response mimicking One Call API
    return { 
      data: { 
        current: { // Current weather data
          temp: response.data.list[0].main.temp, // Current temperature
          humidity: response.data.list[0].main.humidity, // Current humidity
          wind_speed: response.data.list[0].wind.speed, // Current wind speed
          sunset: response.data.city.sunset, // Sunset time
          weather: response.data.list[0].weather, // Current weather details
        }, 
        daily, // Daily forecast array
        timezone_offset: response.data.city.timezone // Timezone offset
      }, 
      error: null 
    };
  } catch (err: any) {
    // Handle 401 error for invalid API key
    if (err.response && err.response.status === 401) {
      return { data: null, error: 'Invalid API key. Please check your OpenWeatherMap API key.' };
    }
    // Handle other errors
    return { data: null, error: 'Failed to fetch forecast data. Check your API key or network.' };
  }
};