import React from 'react';
import Customicon from './src/components/Customicon';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigators/TabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import SeatBookingScreen from './src/screens/SeatBookingScreen';

const Stack = createNativeStackNavigator();

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Tab" component={TabNavigator} options={{animation:'default'}}/>
        <Stack.Screen name="MovieDetails" component={MovieDetailScreen} options={{animation:'slide_from_right'}}/>
        <Stack.Screen name="SeatBooking" component={SeatBookingScreen} options={{animation:'slide_from_bottom'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
