import {View} from 'react-native';
import React from 'react';
import ReusableFilters from './ReusableFilters';
import {
  categories,
  brands,
  color,
  materials,
} from '../../utils/data/ProductFilterData';
import {useAppDispatch, useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';
import {toggleFilter} from '../../redux-toolkit/features/products/productQuerySlice';
import Rating from './Rating';
import Discount from './Discount';
import Price from './Price';
import {ProductQueryParams} from '../../redux-toolkit/types';

const Filters = () => {
  const dispatch = useAppDispatch();
  const {params} = useAppSelector((state: RootState) => state.productQuery);

  // Reusable handler for toggling filters
  const handleToggleFilter = (
    filterType: keyof ProductQueryParams,
    value: string,
  ) => {
    dispatch(toggleFilter({filterType, value}));
  };

  // Helper function to ensure query is always string[]
  const ensureArray = (value: string | string[] | undefined): string[] => {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === 'string') {
      return [value];
    }
    return [];
  };

  // Array for rendering ReusableFilters dynamically
  const filterOptions: {
    title: string;
    data: string[];
    query: string[];
    filterType: keyof ProductQueryParams; // Ensure filterType is a key of ProductQueryParams
  }[] = [
    {
      title: 'Categories',
      data: categories,
      query: ensureArray(params.category),
      filterType: 'category',
    },
    {
      title: 'Brands',
      data: brands,
      query: ensureArray(params.brand),
      filterType: 'brand',
    },
    {
      title: 'Material',
      data: materials,
      query: ensureArray(params.material),
      filterType: 'material',
    },
    {
      title: 'Colors',
      data: color,
      query: ensureArray(params.color),
      filterType: 'color',
    },
  ];

  return (
    <View className="flex-1 flex-col gap-y-8 mb-20">
      {/* Price Filter */}
      <Price />

      {/* ReusableFilters for category, brand, material, and color */}
      {filterOptions.map(({title, data, query, filterType}) => (
        <ReusableFilters
          key={title}
          data={data}
          toggleCheckbox={
            (item: string) => handleToggleFilter(filterType, item) // filterType is now correctly typed
          }
          query={query}
          title={title}
        />
      ))}

      {/* Rating Filter */}
      <Rating />

      {/* Discount Filter */}
      <Discount />
    </View>
  );
};

export default Filters;
