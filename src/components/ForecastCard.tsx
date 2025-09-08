import React from 'react';
import { View, Text, Image } from 'react-native';
import { theme } from '../utils/theme';

interface ForecastItem {
  dt: number;
  temp: { day: number };
  weather: any[];
}

export const ForecastCard: React.FC<{ item: ForecastItem }> = ({ item }) => {
  const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 96,
        borderRadius: 24,
        paddingVertical: 12,
        marginRight: 16,
        backgroundColor: theme.bgWhite(0.15),
      }}
    >
      <Image
        source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
        style={{ height: 44, width: 44 }}
      />
      <Text style={{ color: 'white' }}>{date}</Text>
      <Text style={{ textAlign: 'center', fontWeight: '600', color: 'white', fontSize: 20 }}>
        {Math.round(item.temp.day)}&#176;
      </Text>
    </View>
  );
};