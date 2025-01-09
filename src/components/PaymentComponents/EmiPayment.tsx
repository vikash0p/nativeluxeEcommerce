import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';

const EmiPayment = () => {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const banks = ['State Bank of India', 'HDFC Bank', 'ICICI Bank'];

  const handleSelect = (wallet: string) => {
    setSelectedWallet(wallet);
  };

  return (
    <View>
      <Text className="text-xl font-bold text-gray-800 mb-4">
        Choose a Wallet
      </Text>

      {banks.map(wallet => {
        return (
          <View key={wallet}>
            <TouchableOpacity
              className="bg-white p-3 my-2 flex-row  w-full"
              onPress={() => handleSelect(wallet)}>
              {/* Radio Button */}
              <RadioButton
                value={wallet}
                status={selectedWallet === wallet ? 'checked' : 'unchecked'}
                onPress={() => {
                  handleSelect(wallet);
                  setIsOpen(true);
                }}
                color="#4f46e5"
              />
              {/* Wallet Name */}
              <View className="space-y-2">
                <Text className="text-gray-600 text-lg font-semibold">
                  {wallet}
                </Text>

                <Text className="text-[#4f46e5] text-base">
                  No Cost EMI{' '}
                  <Text className="text-black font-bold">$20/m</Text>
                </Text>

                <Text className="text-[#4f46e5] flex items-center text-sm">
                  2 offers applicable{' '}
                  <TouchableOpacity className="ml-2">
                    <Text className="text-blue-700 font-medium text-sm mt-1">Details</Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </TouchableOpacity>
            {selectedWallet === wallet && isOpen && (
              <View>
                {/* Mobile Number Input */}
                {selectedWallet && (
                  <View className=" mt-2 px-1  ps-10">
                    <TouchableOpacity
                      onPress={() => {}}
                      className="bg-[#4f46e5] rounded-sm p-3 ">
                      <Text className=" text-center text-xl text-white font-bold ">
                        See Plans
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default EmiPayment;
