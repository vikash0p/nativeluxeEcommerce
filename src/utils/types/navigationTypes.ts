import {NativeStackNavigationProp} from '@react-navigation/native-stack';
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Welcome: undefined;
  Cart: undefined;
  Tabs: undefined;
};

export type RegisterScreenNavigationProp = NativeStackNavigationProp< RootStackParamList, 'Register'>;
export type LoginScreenNavigationProp = NativeStackNavigationProp< RootStackParamList, 'Login'>;
export type WelcomeScreenNavigationProp = NativeStackNavigationProp< RootStackParamList, 'Welcome'>;
export type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,'Cart'>;
export type TabsScreenNavigationProp = NativeStackNavigationProp< RootStackParamList, 'Tabs'>;





export type RootTabsParamsList = {
  Home: undefined;
  Product: undefined;
  Notification: undefined;
  User: undefined;
  Favorite: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp< RootTabsParamsList, 'Home'>;
export type ProductScreenNavigationProp = NativeStackNavigationProp< RootTabsParamsList, 'Product'>;
export type NotificationScreenNavigationProp = NativeStackNavigationProp< RootTabsParamsList, 'Notification'>;
export type UserScreenNavigationProp = NativeStackNavigationProp< RootTabsParamsList, 'User'>;
export type FavoriteScreenNavigationProp = NativeStackNavigationProp<RootTabsParamsList,'Favorite'>;

