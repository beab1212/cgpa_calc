
import { Stack } from 'expo-router';
import { View, Text, Button, ScrollView, Touchable, TouchableOpacity } from 'react-native';
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

export default function Second() {
  const { data } = useGlobalContext();
  return (
    <>
      <Stack.Screen options={{ headerTitle: () => <CustomHeader /> }} />
      <View className='flex-1'>
        <Text className='text-sm text-gray-500 mb-4 py-4 px-4 bg-blue-100'>
          {/* <icons.info width={18} height={18} fill='#6d7280'/> */}
          You have to enter at least 2 of your semester "SGPA" to calculate CGPA
        </Text>
        
        
        <ScrollView className='flex-1 px-4'>
          {Object.keys(data?.semesterGrades || {}).map((key) => {
            const semester = data?.semesterGrades[key];
            return (
              <GradeInput key={key} semester={semester?.semester} cgpa={semester?.cgpa} />
            );
          })}

        </ScrollView>

        <View className='p-4 bg-[#f8fafb] shadow-md rounded-lg mb-4 h-56'>
          <View className='flex-row items-center justify-between mb-6 border-b border-gray-200 pb-4'>
            <Text className='font-bold text-gray-400'>Your CGPA</Text>
            <Text className='font-bold'>3.67</Text>
          </View>

          <View className='flex-row items-center justify-between mb-2'>
            <Text className='font-bold text-gray-400'>Percentage</Text>
            <Text className='font-bold'>3.67</Text>
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
