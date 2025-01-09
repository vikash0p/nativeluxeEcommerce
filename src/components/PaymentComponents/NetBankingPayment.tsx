import React, {useState} from 'react';
import { Text, TouchableOpacity, View} from 'react-native';
import {RadioButton} from 'react-native-paper'; // from React Native Paper

const NetBankingPayment: React.FC<{totalAmount: number}> = ({totalAmount}) => {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const banks = ['State Bank of India', 'HDFC Bank', 'ICICI Bank'];

  return (
    <View>
      <Text className="text-gray-700 text-xl">Select Your Bank:</Text>

      {banks.map(bank => (
        <View key={bank}>
          <View className="flex-row items-center my-2">
            <RadioButton
              value={bank}
              color="#4f46e5"
              status={selectedBank === bank ? 'checked' : 'unchecked'}
              onPress={() => {
                setSelectedBank(bank);
                setIsOpen(true);
              }}
            />
            <Text className="font-semibold">{bank}</Text>
          </View>
          <View className="w-3/4 m-auto">
            {selectedBank === bank && isOpen && (
              <TouchableOpacity
                className="bg-[#4f46e5] p-3 rounded-sm"
                style={{width: '75%'}} // Set the button width to 75%
              >
                <Text className="text-center text-lg font-semibold text-white">
                  Pay ${totalAmount}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

export default NetBankingPayment;
