
import { useState } from 'react';
import { Stack } from 'expo-router';
import { View, Text, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { icons } from '../assets';
import { useGlobalContext } from '../context/GlobalProvider';

function CustomHeader() {
  return (
    <View className='flex-row justify-between p-0'>
      <Text className='text-lg font-bold text-gray-900 -ml-4'>CGPA</Text>
      
      <View className="flex-row items-center px-2 space-x-4">
        <TouchableOpacity className="flex-row items-center p-2 rounded-lg active:opacity-70">
          <icons.share fill="#7572b0" width={22} height={22} />
          <Text className="text-[#7572b0] font-semibold text-base pl-1">Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function GradeInput({ semester = 1, cgpa = 0 }) {
  return (
    <View className='flex-row items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-4'>
      <Text className='text-gray-700'>Semester {semester}</Text>
      <View className='flex-row items-center'>
        <Text className='text-gray-500 mr-2'>SGPA:</Text>
        <Text className='text-gray-900 font-semibold'>{cgpa}</Text>
      </View>
    </View>
  );
}

// Enable layout animation for Android
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function Second() {
  const { data } = useGlobalContext();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleDropdown = (key: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: () => <CustomHeader /> }} />
      <View className="flex-1 bg-white">
        <Text className="text-sm text-gray-500 mb-4 py-4 px-6 bg-blue-100">
          You have to enter at least 2 of your semester "SGPA" to calculate CGPA
        </Text>

        <ScrollView className="flex-1 px-4">
          {(data?.semesterGrades && Object.keys(data.semesterGrades).length > 0) ? (
            Object.keys(data?.semesterGrades || {}).map((key) => {
              const semester = data.semesterGrades[key];
              const isOpen = expanded[key];

              return (
                <View key={key} className="mb-3 border border-gray-200 rounded-xl bg-white shadow-sm">
                  <TouchableOpacity
                    onPress={() => toggleDropdown(key)}
                    className="px-4 py-3 flex-row justify-between items-center"
                  >
                    <Text className="text-lg font-bold text-gray-600">
                      Semester {key}
                    </Text>
                    <Text className="text-sm text-blue-500">
                      {isOpen ? '▲' : '▼'}
                    </Text>
                  </TouchableOpacity>

                  {isOpen && (
                    <View className="px-4 pb-4 space-y-2">
                      {Array.isArray(semester.subjects) && semester.subjects.map((subject: any, idx: number) => (
                        <View
                          key={idx}
                          className="flex-row justify-between border-b border-gray-100 pb-1"
                        >
                          <Text className="text-gray-700">{subject.name}</Text>
                          <Text className="text-gray-800 font-semibold">{subject.grade}</Text>
                        </View>
                      ))}

                      {/* CGPA and Percentage */}
                      <View className="mt-3 space-y-1">
                        <Text className="text-sm text-gray-500">
                          <Text className="font-semibold text-gray-700">GPA:</Text> {semester.gpa}
                        </Text>
                        <Text className="text-sm text-gray-500">
                          <Text className="font-semibold text-gray-700">Percentage:</Text> {( (semester.gpa * 100) / 4).toFixed(2)}%
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              );
            })
          ) : (
            <Text className="text-gray-400 text-center py-8">No semester grades entered yet.</Text>
          )}
        </ScrollView>
      </View>
    </>
  );
}
