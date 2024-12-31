/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  FlatList,
  ViewToken,
  ActivityIndicator,
} from 'react-native';
import {carouselData} from '../../utils/data/carouselData';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

interface CarouselItem {
  id: string;
  images: string;
}

const HomeCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [loadingStates, setLoadingStates] = useState<boolean[]>(
    Array(carouselData.length).fill(true),
  );
  const flatListRef = useRef<FlatList<CarouselItem>>(null);

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index;
        if (newIndex !== null && newIndex !== undefined) {
          setIndex(newIndex);
        }
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const handleImageLoad = (imageIndex: number) => {
    setLoadingStates(prevStates => {
      const newStates = [...prevStates];
      newStates[imageIndex] = false;
      return newStates;
    });
  };

  return (
    <View className="bg-white p-2">
      <FlatList
        ref={flatListRef}
        data={carouselData}
        renderItem={({item, index: imageIndex}) => (
          <View className="relative mx-2 ">
            {loadingStates[imageIndex] && (
              <ActivityIndicator
                size="large"
                color="gray"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            )}
            <Image
              source={{uri: item.images}}
              className="w-full h-52  rounded-lg mx-auto"
              resizeMode="cover"
              onLoad={() => handleImageLoad(imageIndex)}
              style={{width: width - 20}}
            />
          </View>
        )}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={{alignItems: 'center'}}
        snapToAlignment="center"
        decelerationRate="fast"
      />
      <View className="flex-row justify-center mt-3 gap-1">
        {Array.from({length: carouselData.length}, (_, i) => (
          <View
            key={i}
            className={`w-2 h-2 rounded-full ${
              index === i ? 'bg-indigo-600' : 'bg-black'
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default HomeCarousel;
