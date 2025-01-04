import React from 'react';
import {View, FlatList, ActivityIndicator, Text, Image} from 'react-native';
import WishlistCard from '../components/wishlistComponents/WishlistCard';
import {useGetWishlistQuery} from '../redux-toolkit/features/wishlist/wishlistApi';
import {useAppSelector} from '../redux-toolkit/hooks';
import {RootState} from '../redux-toolkit/store';

const FavoriteScreen = () => {
  const {user} = useAppSelector((state: RootState) => state.auth);

  const {data, isLoading, refetch} = useGetWishlistQuery(user?._id ?? '', {
    skip: !user?._id,
  });

  React.useEffect(() => {
    if (user?._id) {
      refetch(); // Ensure cart data is fetched when user ID changes
    }
  }, [user?._id, refetch]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className="text-lg text-gray-600 mt-4">
          Loading your wishlist...
        </Text>
      </View>
    );
  }

  if (data?.items.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Image
          source={{
            uri: 'https://img.freepik.com/free-vector/reusing-concept-illustration_114360-25818.jpg',
          }}
          className="w-96 h-96"
          resizeMode="contain"
        />
        <Text className="text-lg text-gray-600 mt-4">
          Your wishlist is empty. Start adding items now!
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 ">
      {/* Favorites List */}
      <FlatList
        data={data?.items ?? []}
        renderItem={({item}) => <WishlistCard item={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FavoriteScreen;
