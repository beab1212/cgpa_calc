import { Stack } from 'expo-router';
import { View, Text, Button, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from 'expo-router';
import { icons, images } from '../assets';
import SideMenu from '../components/side_menu';
import { useGlobalContext } from '../context/GlobalProvider';

const { width: screenWidth } = Dimensions.get('window');

function CustomHeader() {
  const { toggleMenu } = useGlobalContext();
  return (
    <View className='flex-row justify-between'>
      <View className='flex-row items-center'>
        <TouchableOpacity onPress={toggleMenu}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/40' }}
            style={{ width: 32, height: 32, borderRadius: 16, marginRight: 10}}
          />
        </TouchableOpacity>
        <Text className='text-[18px] font-semibold text-[#7572b0]'>CGPA - Grade Calculator</Text>
      </View>
      {/* <Button title="Login" onPress={() => {}} /> */}
    </View>
  );
}

export default function Home() {
  const navigation = useNavigation();

  return (
    <>
      <Stack.Screen options={{ headerTitle: () => <CustomHeader /> }} />
      <View className='flex-1 items-center pt-4'>
        <SideMenu toggle={true} close={false} />

        <View className='mx-4 py-2 bg-white shadow-md rounded-lg mb-4 w-11/12'>
          <Text className='font-bold text-xl px-8 py-2 text-gray-700'>Your Progress</Text>
          <LineChart
            data={{
              labels: ['S-1', 'S-2', 'S-3', 'S-4', 'S-5', 'S-6', 'S-7', 'S-8'],
              datasets: [
                {
                  data: [1.00, 2.00, 3.00, 4.00, 3.50, 3.75, 4.00, 3.80],
                },
              ],
            }}
            width={screenWidth - 60}
            height={200}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(102, 102, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForBackgroundLines: {
                stroke: '#e0e0e0',
                strokeDasharray: '',
              }
            }}       
            bezier
            withVerticalLines={false}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>


        <View className="flex-col gap-y-4 w-11/12">
          {/* SGPA */}
          <TouchableOpacity className="flex-row items-center rounded-2xl p-4 bg-white shadow-md" onPress={() => navigation.navigate("semester_gpa")}>
            <View className="bg-green-100 p-3 rounded-full mr-4">
              <icons.book className="w-10 h-10" fill="#16a34a" />
            </View>
            <View className="flex-col justify-center">
              <Text className="text-lg font-semibold text-gray-800">Calculate SGPA</Text>
              <Text className="text-gray-500 text-sm">Quickly compute your SGPA</Text>
            </View>
          </TouchableOpacity>

          {/* CGPA */}
          <TouchableOpacity className="flex-row items-center rounded-2xl p-4 bg-white shadow-md" onPress={() => navigation.navigate("second")}>
            <View className="bg-lime-100 p-3 rounded-full mr-4">
              <icons.calculator className="w-10 h-10" fill="#84cc16" />
            </View>
            <View className="flex-col justify-center">
              <Text className="text-lg font-semibold text-gray-800">Calculate CGPA</Text>
              <Text className="text-gray-500 text-sm">Get your cumulative GPA easily</Text>
            </View>
          </TouchableOpacity>

          {/* Edit Grades */}
          <TouchableOpacity className="flex-row items-center rounded-2xl p-4 bg-white shadow-md" onPress={() => console.log('Pressed')}>
            <View className="bg-purple-100 p-3 rounded-full mr-4">
              <icons.edit className="w-10 h-10" fill="#9333ea" />
            </View>
            <View className="flex-col justify-center">
              <Text className="text-lg font-semibold text-gray-800">Edit Grade List</Text>
              <Text className="text-gray-500 text-sm">Customize your grades manually</Text>
            </View>
          </TouchableOpacity>
        </View>
          
        
        <Image source={images.homeBg} className="absolute bottom-0 right-0 w-full h-1/3 opacity-50 -z-10" style={{ resizeMode: 'cover' }} />

      </View>
    </>
  );
}

