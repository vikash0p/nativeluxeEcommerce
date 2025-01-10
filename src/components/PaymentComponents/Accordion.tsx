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
  disabled?: boolean;
};

const Accordion: React.FC<AccordionProps> = ({
  title,
  icon,
  expanded,
  onToggle,
  children,
  disabled,
}) => {
  return (
    <>
      <TouchableOpacity
      disabled={disabled}
        className="flex-row items-center justify-between p-4 bg-white rounded-lg shadow mb-2"
        onPress={() => !disabled && onToggle()}>
        <View className="flex-row items-center">
          {icon}
          <Text
            className={`text-lg font-semibold  ml-3 ${
              disabled ? 'text-gray-400' : 'text-gray-800'
            }`}>
            {title}
          </Text>
        </View>
        <MaterialIcons
          name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color={disabled ? '#ccc' : '#4f46e5'}
        />
      </TouchableOpacity>
      {expanded && (
        <View className="bg-gray-50 p-4 rounded-lg mb-4">{children}</View>
      )}
    </>
  );
};

export default Accordion;
