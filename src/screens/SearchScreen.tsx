import { View, Text,  Image,  ActivityIndicator } from 'react-native';
import React, { useCallback, useState } from 'react';
import { HomeBg } from '../constants/images';
import { SafeAreaView } from 'react-native-safe-area-context';

import { debounce } from 'lodash';
import { fetchForecast, fetchLocations,  } from '../services/weatherService';
import { SearchBar } from '../components/SearchBar';
import { LocationList } from '../components/LocationList';
import { WeatherInfo } from '../components/WeatherInfo';

const SearchScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weatherData, setWeatherData] = useState<any>(null); // Use `any` temporarily; define a proper type later
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Added loading state

  const handleLocationSearch = async (loc: any) => {
    setLoading(true); // Set loading to true when starting fetch
    try {
      const { data, error } = await fetchForecast(loc.lat, loc.lon);
      if (data) {
        setWeatherData({ ...data, name: loc.name, country: loc.country });
        setError(null);
        setLocations([]);
        setShowSearch(false);
      } else {
        setError(error);
      }
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleSearch = (value: string) => {
    if (value.length > 2) {
      setLoading(true); // Set loading to true when starting fetch
      fetchLocations(value).then(({ data, error }) => {
        if (data) {
          setLocations(data);
          setError(null);
        } else {
          setError(error);
          setLocations([]);
        }
        setLoading(false); // Reset loading state
      });
    } else {
      setLocations([]);
      setLoading(false); // Reset loading state
    }
  };

  const handleSearchDebounce = useCallback(
    debounce((text: string) => handleSearch(text), 1200),
    []
  );

  const handleTextChange = (event: any) => {
    const text = event.nativeEvent.text;
    handleSearchDebounce(text);
  };

  

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Image blurRadius={70} source={HomeBg} style={{ position: 'absolute', width: '100%', height: '100%' }} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ marginHorizontal: 16, position: 'relative', zIndex: 50, height: '7%' }}>
          <SearchBar
            showSearch={showSearch}
            setShowSearch={setShowSearch}
            onTextChange={handleTextChange}
          />
          <LocationList
            locations={locations}
            showSearch={showSearch}
            onLocationSelect={handleLocationSearch}
          />
        </View>

        {loading && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        )}

        {error && !loading && (
          <Text style={{ color: '#ef4444', textAlign: 'center', marginTop: 16 }}>{error}</Text>
        )}

        {weatherData && !loading && <WeatherInfo weatherData={weatherData} />}
      </SafeAreaView>
    </View>
  );
};

export default SearchScreen;