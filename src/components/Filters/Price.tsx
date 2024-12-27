import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {useAppDispatch} from '../../redux-toolkit/hooks';
import {setParams} from '../../redux-toolkit/features/products/productQuerySlice';
import debounce from 'lodash.debounce';

const PriceRange = () => {
  const dispatch = useAppDispatch();

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  const fadeAnim = useSharedValue(1); // Shared value for animation

  const animateRange = useCallback(() => {
    fadeAnim.value = withTiming(1, {duration: 300}); // Fade in
    setTimeout(() => {
      fadeAnim.value = withTiming(0, {duration: 300}); // Fade out
    }, 1500); // Keep it visible for 1.5 seconds
  }, [fadeAnim]);

  const debouncedPriceChange = useCallback(
    (newMinPrice: number, newMaxPrice: number) => {
      debounce(() => {
        dispatch(setParams({minPrice: newMinPrice, maxPrice: newMaxPrice}));
        animateRange();
      }, 300)();
    },
    [dispatch, animateRange],
  );

  const handlePriceChange = (newMinPrice: number, newMaxPrice: number) => {
    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
    debouncedPriceChange(newMinPrice, newMaxPrice);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Price Range</Text>

      {/* Animated Range Display */}
      <Text style={styles.priceText}>
        ${minPrice} - ${maxPrice}
      </Text>

      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Min Price</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1000}
          step={20}
          value={minPrice}
          onValueChange={value => setMinPrice(value)}
          onSlidingComplete={() => handlePriceChange(minPrice, maxPrice)}
          minimumTrackTintColor="#4f46e5"
          maximumTrackTintColor="#e5e7eb"
          thumbTintColor="#4f46e5"
        />
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Max Price</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1000}
          step={20}
          value={maxPrice}
          onValueChange={value => setMaxPrice(value)}
          onSlidingComplete={() => handlePriceChange(minPrice, maxPrice)}
          minimumTrackTintColor="#4f46e5"
          maximumTrackTintColor="#e5e7eb"
          thumbTintColor="#4f46e5"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  priceText: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 24,
  },
  sliderContainer: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
    color: '#6b7280',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default PriceRange;
