import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/navigationTypes';
import Search from '../Filters/Search';
import {useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';
import {useGetCartQuery} from '../../redux-toolkit/features/cart/cartApi';

const HomeTopBar: React.FC<{
  navigation: NavigationProp<RootStackParamList>;
}> = ({navigation}) => {
  const {user} = useAppSelector((state: RootState) => state.auth);
  const {data} = useGetCartQuery(user?._id ?? '');

  const cartItemCount = 3;

  return (
    <View className="w-screen flex-row items-center justify-between px-3 py-3 bg-[#4f46e5] shadow-md rounded-b-3xl">
      {/* Search Component */}
      <Search style="w-[88%]" />

      {/* Cart Icon with Red Badge */}
      <View className="relative ">
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          className="p-2"
          accessibilityLabel="Cart"
          accessibilityHint="Navigate to the cart page">
          <Icon name="cart-outline" size={28} color="#fff" />
        </TouchableOpacity>

        {cartItemCount > 0 && (
          <View className="absolute -top-1 -right-2 bg-white rounded-full w-5 h-5 items-center justify-center">
            <Text className="text-[#4f46e5] text-xs font-bold">
              {data?.totalQuantity}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeTopBar;
