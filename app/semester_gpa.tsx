
import { Stack } from 'expo-router';
import { View, Text, Button, ScrollView, Touchable, TouchableOpacity, TextInput } from 'react-native';
import Toast from 'react-native-toast-message';
import { icons } from '../assets';
import { useRef, useState } from 'react';
import { useGlobalContext } from '../context/GlobalProvider';

function CustomHeader() {
  return (
    <View className='flex-row justify-between p-0'>
      <Text className='text-lg font-bold text-gray-900 -ml-4'>SGPA</Text>
      
      <View className="flex-row items-center px-2 space-x-4">
        <TouchableOpacity className="flex-row items-center p-2 rounded-lg active:opacity-70">
          <icons.share fill="#7572b0" width={22} height={22} />
          <Text className="text-[#7572b0] font-semibold text-base pl-1">Share</Text>
        </TouchableOpacity>

        <TouchableOpacity className="p-2 rounded-lg active:opacity-70">
          <icons.save fill="#7572b0" width={22} height={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


export default function Second() {
  const { saveSemester, data } = useGlobalContext();
  const [semester, setSemester] = useState<number | null>(null);
  const [courses, setCourses] = useState<Array<any>>([]);

  const scrollRef = useRef<ScrollView>(null);

  const print = () => {
    console.log('Semester:', semester);
    console.log('Courses:', courses);
  }

  const addCourse = () => {
    console.log('Semester:', semester);
    console.log('Courses:', courses);

    if (semester === null || typeof semester !== 'number') {
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: 'Please enter a valid semester number to add courses.',
      });
      return;
    }
    setCourses([...courses, {}]); // Add a new course entry
    scrollRef.current?.scrollToEnd({ animated: true });
  }

  const updateCourse = (index: number, field: string, value: string) => {
    const updatedCourses = [...courses];
    if (!updatedCourses[index]) {
      updatedCourses[index] = {};
    }
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: () => <CustomHeader /> }} />
      <View className='flex-1'>
        <ScrollView className="flex-1 bg-white px-4 pt-4" ref={scrollRef}>
          <View className='z-30 absolute -top-10 right-0 left-0 px-4'>
              <Toast />
          </View>


          <View className="bg-gray-50 rounded-2xl shadow-sm p-4 mb-4">
            <View className="flex-row items-center justify-between mb-6 border-b border-gray-200 pb-4">
              <Text className="text-lg font-semibold text-gray-900">SGPA Calculator</Text>
              <TouchableOpacity>
                <icons.add fill={'#4b5563'} width={24} height={24} />
              </TouchableOpacity>
            </View>
            

            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-gray-700">Semester:</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-2 w-32 text-right"
                placeholder="e.g. 4"
                keyboardType="numeric"
                value={semester ? semester.toString() : ''}
                onChangeText={(text) => setSemester(text ? parseInt(text) : null)}
              />
            </View>

            <Text className="text-gray-600 text-sm mb-3">Enter course names and their grades:</Text>

            {courses.map((_, i) => (
              <View key={i} className="flex-row items-center justify-between mt-2">
                <TextInput
                  className="border border-gray-300 rounded-lg px-3 py-2 flex-1 mr-2"
                  placeholder={`Course ${i + 1}`}
                  value={_.name || ''}
                  onChange={(text) => { updateCourse(i, 'name', text.nativeEvent.text); }}
                />
                <TextInput
                  className="border border-gray-300 rounded-lg px-3 py-2 w-24 text-center mr-2"
                  placeholder="Grade"
                  value={_.grade || ''}
                  onChange={(text) => { updateCourse(i, 'grade', text.nativeEvent.text); }}

                />
                <TextInput
                  className="border border-gray-300 rounded-lg px-3 py-2 w-24 text-center"
                  placeholder="Credits"
                  keyboardType="numeric"
                  value={_.credit || ''}
                  onChange={(text) => { updateCourse(i, 'credit', text.nativeEvent.text); }}
                />
                <TouchableOpacity className="ml-2 p-2 rounded-lg bg-red-100 active:opacity-70" onPress={() => {
                  setCourses(courses.filter((_, index) => index !== i));
                }}>
                  <icons.delete fill={'#ef4444'} width={20} height={20} />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              className="flex-row items-center justify-center mt-6 border-2 border-gray-300 rounded-xl py-3"
              onPress={() => {addCourse()}}
            >
              <icons.add fill={'#4b5563'} width={24} height={24} />
              <Text className="text-gray-600 font-semibold pl-1">Add More Courses</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View className='p-4 bg-[#f8fafb] shadow-md rounded-lg mb-4 h-56'>
          <View className='flex-row items-center justify-between mb-6 border-b border-gray-200 pb-4'>
            <Text className='font-bold text-gray-400'>Your SGPA</Text>
            <Text className='font-bold'>3.67</Text>
          </View>

          <View className='flex-row items-center justify-between mb-2'>
            <Text className='font-bold text-gray-400'>Percentage</Text>
            <Text className='font-bold'>3.67</Text>
          </View>

          <TouchableOpacity className='bg-gray-400z p-4 mx-1 mt-4 rounded-lg flex-row border-2 border-gray-300 items-center justify-center'
            onPress={() => {scrollRef.current?.scrollToEnd({ animated: true })}}
          >
            <icons.calculator fill={'#4b5563'} width={24} height={24} />
            <Text className='text-gray-600 font-semibold pl-1'>Calculate SGPA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
