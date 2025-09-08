import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { MapMarkerIcon } from '../constants/icons';


export const LocationList: React.FC<{
  locations: any[];
  showSearch: boolean;
  onLocationSelect: (loc: any) => void;
}> = ({ locations, showSearch, onLocationSelect }) =>
  showSearch ? (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        backgroundColor: '#d1d5db',
        top: 64,
        borderRadius: 24,
      }}
    >
      {locations.length > 0 ? (
        locations.map((loc, index) => (
          <Pressable
            onPress={() => onLocationSelect(loc)}
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 0,
              padding: 12,
              paddingHorizontal: 16,
              marginBottom: 4,
              borderBottomWidth: index + 1 === locations.length ? 0 : 2,
              borderBottomColor: '#9ca3af',
            }}
          >
            <Image source={MapMarkerIcon} style={{ width: 16, height: 16 }} />
            <Text style={{ color: 'black', fontSize: 18, marginLeft: 8 }}>
              {loc?.name}, {loc?.country}
            </Text>
          </Pressable>
        ))
      ) : (
        <Text style={{ color: 'black', fontSize: 18, textAlign: 'center', padding: 12 }}>
          No city found
        </Text>
      )}
    </View>
  ) : null;