import {View} from 'react-native';
import React from 'react';
import ReusableFilters from './ReusableFilters';
import {categories,brands} from '../../utils/data/ProductFilterData';
import {useAppDispatch, useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';
import {toggleFilter} from '../../redux-toolkit/features/products/productQuerySlice';

const Filters = () => {
  const dispatch = useAppDispatch();
  const {params} = useAppSelector((state: RootState) => state.productQuery);

  return (
    <View>
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
    </View>
  );
};

export default Filters;
