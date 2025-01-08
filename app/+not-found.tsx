import { Link, Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Screen not found' }} />
      <View style={{ backgroundColor: 'white', flex: 1, padding: 20 }}>
        <Link style={{ textDecorationLine: 'underline' }} href="/">
          Go to the home screen
        </Link>
      </View>
    </>
  );
}
