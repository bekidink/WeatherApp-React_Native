import React from 'react';
import { View, TextInput, Pressable, Image } from 'react-native';
import { theme } from '../utils/theme';
import { SearchIcon } from '../constants/icons';

export const SearchBar: React.FC<{
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
  onTextChange: (event: { nativeEvent: { text: string } }) => void;
}> = ({ showSearch, setShowSearch, onTextChange }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      borderRadius: 9999,
      backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent',
    }}
  >
    {showSearch ? (
      <TextInput
        onChange={onTextChange}
        placeholder="Search city"
        placeholderTextColor="lightgray"
        style={{ paddingLeft: 24, height: 40, paddingBottom: 4, flex: 1, color: 'white' }}
      />
    ) : null}
    <Pressable
      style={{ backgroundColor: theme.bgWhite(0.3), borderRadius: 9999, padding: 12, margin: 4 }}
      onPress={() => setShowSearch(!showSearch)}
    >
      <Image source={SearchIcon} style={{ height: 10, width: 10 }} />
    </Pressable>
  </View>
);