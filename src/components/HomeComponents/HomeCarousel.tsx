/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  ViewToken,
  ActivityIndicator,
} from 'react-native';
import {carouselData} from '../../utils/data/carouselData';

const {width} = Dimensions.get('window');

interface CarouselItem {
  id: string;
  images: string;
}

const HomeCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [loadingStates, setLoadingStates] = useState<boolean[]>(
    Array(carouselData.length).fill(true), // Initially, all images are loading
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
      newStates[imageIndex] = false; // Set loading state to false for the loaded image
      return newStates;
    });
  };

  return (
    <View style={styles.container} className="bg-white">
      <FlatList
        ref={flatListRef}
        data={carouselData}
        renderItem={({item, index: imageIndex}) => (
          <View>
            {loadingStates[imageIndex] && (
              <ActivityIndicator
                size="large"
                color="gray"
                style={styles.loadingIndicator}
              />
            )}
            <Image
              source={{uri: item.images}}
              style={styles.image}
              resizeMode="cover"
              onLoad={() => handleImageLoad(imageIndex)}
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
        contentContainerStyle={styles.flatListContent}
        snapToAlignment="center"
        decelerationRate="fast"
      />
      <View style={styles.indicatorContainer}>
        {Array.from({length: carouselData.length}, (_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {backgroundColor: index === i ? '#4f46e5' : 'black'},
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  image: {
    width: width - 20,
    height: 200,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -15}, {translateY: -15}],
  },
  flatListContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default HomeCarousel;
