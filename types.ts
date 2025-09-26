import { NavigatorScreenParams } from '@react-navigation/native';

// Types for the stack navigator inside the drawer
export type AppStackParamList = {
  RentCar: undefined;
  AddCar: undefined;
  Confirmation: { booking: Booking };
};

// Types for the drawer navigator
export type AppDrawerParamList = {
  Home: NavigatorScreenParams<AppStackParamList>; // 'Home' is the nested stack
};

// Types for the root stack (handles auth flow)
export type RootStackParamList = {
  Login: undefined;
  Drawer: NavigatorScreenParams<AppDrawerParamList>;
};

// It's good practice to also type the props for each screen
import { StackScreenProps } from '@react-navigation/stack';
import { DrawerScreenProps } from '@react-navigation/drawer';

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;
export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<AppStackParamList, T>;
export type AppDrawerScreenProps<T extends keyof AppDrawerParamList> = DrawerScreenProps<AppDrawerParamList, T>;

// Car interface for type safety
export interface Car {
  id: string;
  make: string;
  model: string;
  costPerDay: number;
  imageUrl: any;
}

// Booking interface for type safety
export interface Booking {
  car: Car;
  days: number;
  total: number;
}
