import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { CarProvider } from './CarContext';
import Login from './screens/Login';
import AddCar from './screens/AddCar';
import RentCar from './screens/RentCar';
import Confirmation from './screens/Confirmation';
import { AppDrawerParamList, AppStackParamList, RootStackParamList } from './types';

const Stack = createStackNavigator<AppStackParamList>();
const Drawer = createDrawerNavigator<AppDrawerParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="RentCar"
      screenOptions={{
        headerStyle: { backgroundColor: '#007bff' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="RentCar" options={{ title: 'Available Cars' }} component={RentCar} />
      <Stack.Screen name="AddCar" options={{ title: 'Add New Car' }} component={AddCar} />
      <Stack.Screen
        name="Confirmation"
        component={Confirmation}
        options={{ title: 'Booking Confirmation' }}
      />
    </Stack.Navigator>
  );
}

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        // The header is now managed by the nested AppStack, so we can define styles here
        headerStyle: { backgroundColor: '#007bff' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={AppStack}
        options={{
          title: 'Car Rentals',
          drawerIcon: ({ color, size }: { color: string; size: number }) => <Ionicons name="car-sport" size={size} color={color} />,
          headerShown: false, // Let the inner StackNavigator handle the header titles
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <CarProvider>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Login" component={Login} />
          <RootStack.Screen name="Drawer" component={DrawerNavigation} />
        </RootStack.Navigator>
      </NavigationContainer>
    </CarProvider>
  );
}
