import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { ForecastCard } from './ForecastCard';
import { CalendarIcon, DropIcon, SunyIcon, Windicon } from '../constants/icons';


export const WeatherInfo: React.FC<{ weatherData: any }> = ({ weatherData }) => (
  <View style={{ marginHorizontal: 16, flex: 1, justifyContent: 'space-around', marginBottom: 8 }}>
    <Text style={{ color: 'white', textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>
      {weatherData.name},{' '}
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#d1d5db' }}>{weatherData.country}</Text>
    </Text>
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      <Image
        source={{ uri: `http://openweathermap.org/img/wn/${weatherData.current?.weather[0]?.icon}@2x.png` }}
        style={{ width: 208, height: 208 }}
        onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
      />
    </View>
    <View style={{ marginVertical: 8 }}>
      <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 60, marginLeft: 20 }}>
        {Math.round(weatherData.current?.temp)}&#176;
      </Text>
      <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, letterSpacing: 2 }}>
        {weatherData.current?.weather[0]?.main}
      </Text>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 }}>
        <Image source={Windicon} style={{ width: 24, height: 24 }} />
        <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>
          {weatherData.current?.wind_speed} m/s
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 }}>
        <Image source={DropIcon} style={{ width: 24, height: 24 }} />
        <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>
          {weatherData.current?.humidity}%
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 }}>
        <Image source={SunyIcon} style={{ width: 24, height: 24 }} />
        <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>
          {new Date((weatherData.current?.sunset + weatherData.timezone_offset) * 1000).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </Text>
      </View>
    </View>
    <View style={{ marginBottom: 8, marginVertical: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginVertical: 8 }}>
        <Image source={CalendarIcon} style={{ width: 10, height: 16 }} />
        <Text style={{ color: 'white', fontSize: 16 }}>Daily Forecast</Text>
      </View>
      <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 15 }} showsHorizontalScrollIndicator={false}>
        {weatherData.daily?.map((item:any, index:number) => (
          <ForecastCard key={index} item={item} />
        ))}
      </ScrollView>
    </View>
  </View>
);