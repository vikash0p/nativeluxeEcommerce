import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Welcome: undefined;
  Cart: undefined;
  Tabs: undefined;
  Search: undefined;
  ViewMore: undefined;
  SingleProduct: {itemId: string};
  MyOrder: undefined;
  shippingAddress: undefined;
  paymentMethod: undefined;
  myReview: undefined;
  setting: undefined;
  OrderSummary :undefined;
  Payment: undefined;
  Success: undefined;
};

export type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;
export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;
export type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>;
export type CartScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Cart'
>;
export type TabsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Tabs'
>;
export type SearchScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Search'
>;
export type ViewMoreScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ViewMore'
>;
export type SingleScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SingleProduct'
>;

export type RootTabsParamsList = {
  Home: undefined;
  Product: undefined;
  Notification: undefined;
  User: undefined;
  Favorite: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootTabsParamsList,
  'Home'
>;
export type ProductScreenNavigationProp = NativeStackNavigationProp<
  RootTabsParamsList,
  'Product'
>;
export type NotificationScreenNavigationProp = NativeStackNavigationProp<
  RootTabsParamsList,
  'Notification'
>;
export type UserScreenNavigationProp = NativeStackNavigationProp<
  RootTabsParamsList,
  'User'
>;
export type FavoriteScreenNavigationProp = NativeStackNavigationProp<
  RootTabsParamsList,
  'Favorite'
>;
