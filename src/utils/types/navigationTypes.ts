import {NativeStackNavigationProp} from '@react-navigation/native-stack';
export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Welcome:undefined;
    Tabs: undefined;
};

export type RegisterScreenNavigationProp = NativeStackNavigationProp< RootStackParamList, 'Register'>;
export type LoginScreenNavigationProp = NativeStackNavigationProp< RootStackParamList, 'Login'>;
export type WelcomeScreenNavigationProp = NativeStackNavigationProp< RootStackParamList, 'Welcome'>;
export type TabsScreenNavigationProp = NativeStackNavigationProp< RootStackParamList, 'Tabs'>;



export type RootTabsParamsList = {
    Home: undefined;
    Blog: undefined;
    About: undefined;
    Contact: undefined;
  };

export type HomeScreenNavigationProp = NativeStackNavigationProp< RootTabsParamsList, 'Home'>;
export type BlogScreenNavigationProp = NativeStackNavigationProp< RootTabsParamsList, 'Blog'>;
export type AboutScreenNavigationProp = NativeStackNavigationProp< RootTabsParamsList, 'About'>;
export type ContactScreenNavigationProp = NativeStackNavigationProp< RootTabsParamsList, 'Contact'>;

