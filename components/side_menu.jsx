import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { useGlobalContext } from '../context/GlobalProvider';
import React, { useRef, useEffect } from 'react';

export default function SideMenu() {
  const { menuToggle, toggleMenu } = useGlobalContext();
  const slideAnim = useRef(new Animated.Value(-250)).current; // menu width

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuToggle ? 0 : -250,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [menuToggle, slideAnim]);

  if (!menuToggle && slideAnim.__getValue() === -250) return null;

  return (
    <Animated.View
      style={{
        transform: [{ translateX: slideAnim }],
      }}
      className="absolute left-0 top-0 w-[250px] h-full z-50 bg-white px-6 pt-5 shadow-lg flex-col justify-between"
    >
      <View>
        <Text className="text-[18px] font-semibold my-[15px]">🏠 Home</Text>
        <Text className="text-[18px] font-semibold my-[15px]">📊 My Grades</Text>
        <Text className="text-[18px] font-semibold my-[15px]">⚙️ Settings</Text>

        {/* <TouchableOpacity className="mt-10" onPress={toggleMenu}>
          <Text className="text-red-500 font-bold">Close Menu</Text>
        </TouchableOpacity> */}
      </View>

      {/* Footer Section */}
    <View className="border-t border-gray-200 py-6">
      <Text className="text-sm text-gray-500">Made by Parrobaba</Text>

      <Text className="text-sm text-gray-500 mt-2">Follow me:</Text>

      <View className="flex-row space-x-3 mt-2">
        <Text
          className="text-sm text-blue-500 font-medium"
          onPress={() => Linking.openURL('https://www.linkedin.com/in/parrobaba')}
        >
          LinkedIn
        </Text>

        <Text className="text-sm text-gray-400 px-2">|</Text>
        <Text
          className="text-sm text-blue-500 font-medium"
          onPress={() => Linking.openURL('https://github.com/beab1212/cgpa_calc')}
        >
          GitHub
        </Text>

        <Text className="text-sm text-gray-400 px-2">|</Text>
        <Text
          className="text-sm text-blue-500 font-medium"
          onPress={() => Linking.openURL('https://t.me/parrobaba')}
        >
          Telegram
        </Text>
      </View>
    </View>
    </Animated.View>
  );
}
