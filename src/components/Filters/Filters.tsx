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

const Filters = () => {
  const dispatch = useAppDispatch();
  const {params} = useAppSelector((state: RootState) => state.productQuery);
  console.log('🚀 ~ file: Filters.tsx:12 ~ params:', params.color);

  return (
    <View className=" flex-1 flex-col gap-y-8 mb-20 ">
      {/* category */}
      <ReusableFilters
        data={categories}
        toggleCheckbox={(item: string) =>
          dispatch(toggleFilter({filterType: 'category', value: item}))
        }
        query={params.category || []}
        title="Categories"
      />
      {/* brand */}
      <ReusableFilters
        data={brands}
        toggleCheckbox={(item: string) =>
          dispatch(toggleFilter({filterType: 'brand', value: item}))
        }
        query={params.brand || []}
        title="Brands"
      />
      <ReusableFilters
        data={materials}
        toggleCheckbox={(item: string) =>
          dispatch(toggleFilter({filterType: 'material', value: item}))
        }
        query={params.material || []}
        title="Material"
      />
      <ReusableFilters
        data={color}
        toggleCheckbox={(item: string) =>
          dispatch(toggleFilter({filterType: 'color', value: item}))
        }
        query={params.color || []}
        title="Colors"
      />
      <Rating />
      <Discount />
    </View>
  );
};

export default Filters;
