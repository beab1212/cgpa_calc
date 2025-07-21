import { useState, useRef } from 'react';
import { Stack } from 'expo-router';
import { View, Text, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager, Share } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { icons } from '../assets';
import { useGlobalContext } from '../context/GlobalProvider';

function CustomHeader({ viewRef }: { viewRef: React.RefObject<ScrollView | null> }) {

  const shareImage = async () => {
    // add logo to the image
    

    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission.granted) return;

    const uri = await captureRef(viewRef, {
      format: 'png',
      quality: 1,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, {
        dialogTitle: 'Share your SGPA Card',
      });
    } else {
      alert('Sharing not available on this device');
    }
  };

  return (
    <View className='flex-row justify-between p-0'>
      <Text className='text-lg font-bold text-gray-900 -ml-4'>CGPA</Text>
      
      <View className="flex-row items-center px-2 space-x-4">
        <TouchableOpacity className="flex-row items-center p-2 rounded-lg active:opacity-70" onPress={async () => shareImage()}>
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
  const viewRef = useRef<ScrollView>(null);

  const toggleDropdown = (key: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: () => <CustomHeader viewRef={viewRef} /> }} />
      <View className="flex-1 bg-white">
        <Text className="text-sm text-gray-500 mb-4 py-4 px-6 bg-blue-100">
          You must have at least 2 semester "SGPA" to calculate CGPA
        </Text>

        <ScrollView className="flex-1 px-4" ref={viewRef}>
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

        <View className='p-4 bg-[#f8fafb] shadow-md rounded-lg mb-4 h-56'>
          <View className='flex-row items-center justify-between mb-6 border-b border-gray-200 pb-4'>
            <Text className='font-bold text-gray-400'>Your Cumulative GPA</Text>
            <Text className='font-bold'>{'N/A'}</Text>
          </View>

          <TouchableOpacity className='bg-gray-400z p-4 mx-1 mt-4 rounded-lg flex-row border-2 border-gray-300 items-center justify-center'>
            <icons.calculator fill={'#4b5563'} width={24} height={24} />
            <Text className='text-gray-600 font-semibold pl-1'>Calculate CGPA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
