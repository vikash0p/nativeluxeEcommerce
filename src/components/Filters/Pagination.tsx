/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useGetProductsQuery} from '../../redux-toolkit/features/products/productApi';
import {useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';
import {useDispatch} from 'react-redux';
import {setParams} from '../../redux-toolkit/features/products/productQuerySlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const {params} = useAppSelector((state: RootState) => state.productQuery);

  const {data, refetch} = useGetProductsQuery({
    limit: params.limit,
    page: params.page,
    ...params,
  });

  const totalPages = data?.totalPages || 1;
  const currentPage = params.page || 1;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setParams({...params, page}));
      refetch();
    }
  };


  return (
    <View className="px-4 pt-2 pb-8">
      {
        <View className="flex-row items-center justify-between">
          {/* Previous Button */}
          <TouchableOpacity
            className={`${
              currentPage === 1 ? 'bg-gray-300' : 'bg-gray-200'
            } px-4 py-2 rounded-sm`}
            disabled={currentPage === 1}
            onPress={() => handlePageChange(currentPage - 1)}>
            <Text
              className={`${
                currentPage === 1 ? 'text-gray-500' : 'text-black'
              }`}>
              Previous
            </Text>
          </TouchableOpacity>

          {/* Page Numbers */}
          <View className="flex-row flex-wrap items-center justify-center">
            {Array.from({length: totalPages}, (_, i) => {
              const page = i + 1;
              const isActive = currentPage === page;
              return (
                <TouchableOpacity
                  key={page}
                  className={`${
                    isActive ? 'bg-blue-500' : 'bg-gray-200'
                  } p-2 m-1 rounded-sm flex items-center justify-center w-10`}
                  onPress={() => handlePageChange(page)}>
                  <Text className={`${isActive ? 'text-white' : 'text-black'}`}>
                    {page}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Next Button */}
          <TouchableOpacity
            className={`${
              currentPage === totalPages ? 'bg-gray-300' : 'bg-gray-200'
            } px-4 py-2 rounded-sm`}
            disabled={currentPage === totalPages}
            onPress={() => handlePageChange(currentPage + 1)}>
            <Text
              className={`${
                currentPage === totalPages ? 'text-gray-500' : 'text-black'
              }`}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};

export default Pagination;
