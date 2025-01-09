import React from 'react';
import {Text} from 'react-native';
import {TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type AccordionProps = {
  title: string;
  icon: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({
  title,
  icon,
  expanded,
  onToggle,
  children,
}) => {
  return (
    <>
      <TouchableOpacity
        className="flex-row items-center justify-between p-4 bg-white rounded-lg shadow mb-2"
        onPress={onToggle}>
        <View className="flex-row items-center">
          {icon}
          <Text className="text-lg font-semibold text-gray-700 ml-3">
            {title}
          </Text>
        </View>
        <MaterialIcons
          name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color="#4f46e5"
        />
      </TouchableOpacity>
      {expanded && (
        <View className="bg-gray-50 p-4 rounded-lg mb-4">{children}</View>
      )}
    </>
  );
};

export default Accordion;
