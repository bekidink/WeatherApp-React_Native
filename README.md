Weather App (React Native CLI)
A React Native application built with React Native CLI that allows users to search for weather forecasts by city or location. The app fetches weather data using the OpenWeatherMap API and displays current weather conditions and a 5-day forecast.
Features

Search by City: Enter a city name to fetch and display current weather and forecast data.
Location Suggestions: Autocomplete suggestions for locations as you type.
Weather Forecast: Displays aggregated daily forecasts for the next 5 days.
Loading and Error Handling: Shows a loading indicator during API calls and displays error messages when necessary.
Responsive UI: Optimized for mobile devices using React Native.

Prerequisites
Before setting up the project, ensure you have the following installed:

Node.js (v16 or higher)
npm (comes with Node.js) or yarn
React Native CLI: Install globally with npm install -g react-native-cli
Java Development Kit (JDK) (for Android development, version 11 or higher recommended)
Android Studio (for Android emulator or device testing)
Xcode (for iOS simulator or device testing, macOS only)
OpenWeatherMap API Key (free tier available)

Setup Instructions
Follow these steps to set up and run the project using React Native CLI:

Clone the Repository:
git clone <repository-url>
cd weather-app


Install Dependencies:Install project dependencies using npm:
npm install

Or using yarn:
yarn install


Set Up OpenWeatherMap API Key:

Sign up at OpenWeatherMap to obtain a free API key.
Open the services/weatherService.ts file.
Replace the placeholder API key with your own:const apiKey = "your-api-key-here";


Save the file.


Install Additional Dependencies:The app requires axios for API requests and lodash for debouncing. Install them if not already included:
npm install axios lodash

Or with yarn:
yarn add axios lodash

Run the Application:

Start the Metro bundler:npx react-native start


In a separate terminal, run the app:
For Android:npx react-native run-android


For iOS (macOS only):npx react-native run-ios



API Key Instructions

Obtaining an API Key:
Visit OpenWeatherMap and create an account.
Navigate to the API section in your OpenWeatherMap dashboard.
Generate a new API key (the free tier is sufficient for this app).
Copy the API key provided.


Using the API Key:
Open the services/weatherService.ts file.
Replace the placeholder API key (your-api-key-here) with your own:const apiKey = "your-api-key-here";


Save the file. The app will use this key to make requests to the OpenWeatherMap API.


Important Notes:
Keep your API key confidential and avoid sharing it publicly (e.g., in version control).
The free tier of OpenWeatherMap has limits (e.g., 60 calls/minute, 1,000 calls/day). Monitor usage to avoid exceeding these limits.
If you encounter a 401 error, verify your API key is correct and active.



Project Structure

components/: Contains reusable UI components:
SearchBar.tsx: Handles user input for city search.
LocationList.tsx: Displays location suggestions.
WeatherInfo.tsx: Renders weather data.


services/weatherService.ts: Manages API calls to OpenWeatherMap for weather and location data.
constants/images.ts: Stores image assets (e.g., HomeBg for the background).
SearchScreen.tsx: Main screen component integrating search, location, and weather display.

Dependencies

react-native
react-native-safe-area-context
axios
lodash
Other dependencies listed in package.json

Notes

The app uses OpenWeatherMap's free endpoints for weather and geocoding data.
The fetchForecast function aggregates 3-hourly forecast data into daily forecasts for a cleaner UI.
Ensure the HomeBg image in constants/images.ts is correctly configured or replace it with a valid image source.
For production, consider defining TypeScript interfaces for weatherData instead of using any for better type safety.
The app assumes a React Native CLI environment. For Expo, additional configuration may be required.

Troubleshooting

API Errors:
401 Unauthorized: Verify your API key in weatherService.ts is correct.
404 Not Found: Ensure the city name or coordinates are valid.
Network Errors: Check your internet connection or OpenWeatherMap API status.


