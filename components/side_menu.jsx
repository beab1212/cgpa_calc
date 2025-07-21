import { Animated, Text, TouchableOpacity } from 'react-native';
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
      className="absolute left-0 top-0 w-[250px] h-full z-50 bg-white px-6 pt-5 shadow-lg"
    >
      <Text className="text-[18px] font-semibold my-[15px]">🏠 Home</Text>
      <Text className="text-[18px] font-semibold my-[15px]">📊 My Grades</Text>
      <Text className="text-[18px] font-semibold my-[15px]">⚙️ Settings</Text>

      <TouchableOpacity className="mt-10" onPress={toggleMenu}>
        <Text className="text-red-500 font-bold">Close Menu</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
