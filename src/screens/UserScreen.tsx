import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import LogoutButton from '../components/ReusableComponents/LogoutButton';
import {useAppSelector} from '../redux-toolkit/hooks';
import {RootState} from '../redux-toolkit/store';
import {RootStackParamList} from '../navigation/navigationTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useGetUserOrdersQuery} from '../redux-toolkit/features/order/orderApi';



interface MenuItem {
  title: string;
  subtitle: string;
  screen: {
    name: keyof RootStackParamList;
    params?: any;
  };
}

const UserScreen = () => {
  const {user, isAuthenticated, loading} = useAppSelector(
    (state: RootState) => state.auth,
  );
  const userId = user?._id ?? ' ';
  const {data} = useGetUserOrdersQuery(userId);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigation.replace('Login'); // Redirect to Login screen
    }
  }, [isAuthenticated, loading, navigation]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className="mt-4 text-lg text-gray-600">Loading profile...</Text>
      </View>
    );
  }

  const menuItems: MenuItem[] = [
    {
      title: 'My Orders',
      subtitle: `Already have ${data?.orders.length} orders`,
      screen: {name: 'MyOrder'},
    },
    {
      title: 'Shipping Address',
      subtitle: 'Manage your shipping address',
      screen: {name: 'shippingAddress'},
    },
    {
      title: 'Payment Method',
      subtitle: 'Manage your payment methods',
      screen: {name: 'paymentMethod'},
    },
    {
      title: 'My Reviews',
      subtitle: 'Check your reviews and ratings',
      screen: {name: 'myReview'},
    },
    {
      title: 'Setting',
      subtitle: 'Customize your app settings',
      screen: {name: 'setting'},
    },
  ];

  return (
    <ScrollView className="flex-1  bg-gray-100 space-y-2">
      {/* header */}
      <View className="flex-row items-center justify-between bg-[#4f46e5] py-4 px-4 rounded-b-3xl ">
        <View>
          <Text className="text-2xl font-bold text-white ">Profile</Text>
        </View>
        <View>
          <LogoutButton />
        </View>
      </View>
      {/* user details */}
      <View className="flex-row gap-10 items-center p-6 mb-4">
        {/* Avatar Circle */}
        <View className="w-20 h-20 bg-[#4f46e5] rounded-full flex items-center justify-center">
          <Text className="text-4xl font-bold text-white text-center">
            {user?.name.charAt(0).toUpperCase()}
          </Text>
        </View>

        {/* User Details */}
        <View>
          <Text className="text-2xl font-bold text-gray-800 uppercase ">
            {user?.name}
          </Text>
          <Text className="text-lg text-black font-semibold ">
            {user?.email}
          </Text>
        </View>
      </View>

      {/*  */}
      <View className="flex-1 bg-gray-100">
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate(item.screen.name, item.screen.params)
            }
            className="flex-row items-center justify-between w-[90%] mx-auto p-4 py-6 my-2 rounded-lg shadow-md bg-white">
            <View>
              <Text className="text-2xl font-bold">{item.title}</Text>
              <Text className="text-lg text-gray-500">{item.subtitle}</Text>
            </View>
            <View>
              <Entypo name="chevron-thin-right" size={30} color="black" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default UserScreen;
