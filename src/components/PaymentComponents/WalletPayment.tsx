import React, {useState} from 'react';
import {Text, View, TouchableOpacity, TextInput, Alert} from 'react-native';
import {RadioButton} from 'react-native-paper';

const WalletPayment = ({totalAmount}: {totalAmount:number}) => {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const[isOpen,setIsOpen]=useState(false)

  const wallets = ['Google Pay', 'PhonePe', 'Paytm'];

  const handleSelect = (wallet: string) => {
    setSelectedWallet(wallet);
  };

  const handlePay = () => {
    Alert.alert(`Payment of $1000 via ${selectedWallet} is processing!`);
  };

  return (
    <View>
      <Text className="text-xl font-bold text-gray-800 mb-4">
        Choose a Wallet
      </Text>

      {wallets.map((wallet) => {
        return (
          <View key={wallet}>
            <TouchableOpacity
              className="bg-white border border-gray-300 rounded-lg p-3 my-2 flex-row items-center"
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
              <Text className="text-gray-600 text-lg">{wallet}</Text>
            </TouchableOpacity>
            {selectedWallet === wallet && isOpen && (
              <View>
                {/* Mobile Number Input */}
                {selectedWallet && (
                  <View className="mb-6 mt-2 px-1  ps-10">
                    <Text className="text-lg font-medium text-gray-700">
                      Enter your {selectedWallet} mobile number:
                    </Text>
                    <View className="flex-row items-center mt-3">
                      <TextInput
                        value={mobileNumber}
                        onChangeText={setMobileNumber}
                        placeholder="Enter mobile number"
                        keyboardType="phone-pad"
                        className="flex-1 border border-gray-800 rounded-sm px-4 py-3 text-base"
                      />
                      <TouchableOpacity
                        className="bg-[#4f46e5] rounded-sm ml-3 px-5 py-3"
                        onPress={() => {
                          // Add your linking logic here
                        }}>
                        <Text className="text-white text-lg font-semibold">
                          Link
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={handlePay}
                      className="bg-[#4f46e5] rounded-sm p-3 mt-4">
                      <Text className=" text-center text-lg text-white ">
                        Pay ${totalAmount}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
        );
      } )}






    </View>
  );
};

export default WalletPayment;
