import { Stack } from 'expo-router';
import { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
import { icons } from '../assets';
import { useGlobalContext } from '../context/GlobalProvider';


function CustomHeader({ semesterNumber }: { semesterNumber: number | null }) {

  return (
    <View className='flex-row justify-between p-0'>
      <Text className='text-lg font-bold text-gray-900 -ml-4'>Edit Semester {semesterNumber}</Text>

      <View className="flex-row items-center px-2 space-x-4">
        
      </View>
    </View>
  );
}


export default function EditGrade() {
  const scrollRef = useRef<ScrollView>(null);
  const { data, saveSemester, deleteSemester } = useGlobalContext();

  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [courses, setCourses] = useState<Array<any>>([]);
  const [report, setReport] = useState({ sgpa: null, percentage: null });

  useEffect(() => {
    if (
      selectedSemester !== null &&
      data?.semesterGrades?.[selectedSemester]
    ) {
      setCourses(data.semesterGrades[selectedSemester].subjects || []);
      calculateSGPA(data.semesterGrades[selectedSemester].subjects);
    } else {
      setCourses([]);
      setReport({ sgpa: null, percentage: null });
    }
  }, [selectedSemester]);

  const updateCourse = (index: number, field: string, value: string) => {
    const updated = [...courses];
    updated[index][field] = value;
    setCourses(updated);
  };

  const addCourse = () => {
    setCourses([...courses, { name: '', grade: '', credit: '' }]);
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  const calculateSGPA = (targetCourses = courses) => {
    let totalCredits = 0;
    let totalPoints = 0;

    targetCourses.forEach(course => {
      const grade = parseFloat(course.grade || '0');
      const credit = parseFloat(course.credit || '0');

      if (!isNaN(grade) && !isNaN(credit)) {
        totalPoints += grade * credit;
        totalCredits += credit;
      }
    });

    const sgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

    // setReport({
    //   sgpa,
    //   percentage: ((parseFloat(sgpa) * 100) / 4).toFixed(2) + '%',
    // });

    if (targetCourses === courses) {
      Toast.show({
        type: 'success',
        text1: 'SGPA Recalculated',
        text2: `New SGPA: ${sgpa}`,
      });
    }
  };

  const save = () => {
    if (selectedSemester === null) return;

    saveSemester(selectedSemester, courses);
    Toast.show({
      type: 'success',
      text1: 'Semester Updated',
      text2: `Semester ${selectedSemester} has been updated.`,
    });
  };

  const handleDeleteSemester = () => {
    if (selectedSemester === null) return;

    Alert.alert(
      'Delete Semester?',
      `Are you sure you want to delete Semester ${selectedSemester} and all its subjects?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteSemester(selectedSemester);
            setCourses([]);
            setSelectedSemester(null);
            Toast.show({
              type: 'success',
              text1: 'Semester Deleted',
              text2: `Semester ${selectedSemester} has been removed.`,
            });
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: () => <CustomHeader semesterNumber={selectedSemester} /> }} />
        <View className='z-30 absolute -top-10 right-0 left-0 px-4'>
            <Toast />
        </View>
      
      <ScrollView ref={scrollRef} className="flex-1 bg-white px-4 pt-4">
        

        <View className="mb-6">
            {/* 📚 */}
            <Text className="text-xl font-semibold text-gray-800 mb-3">Select Semester</Text>

            <View className="border border-gray-300 bg-gray-50 rounded-xl shadow-sm">
                <Picker
                selectedValue={selectedSemester}
                onValueChange={(itemValue: any) => {
                    const num = parseInt(itemValue);
                    if (data?.semesterGrades && num in data.semesterGrades) {
                    setSelectedSemester(num);
                    } else {
                    setCourses([]);
                    setReport({ sgpa: null, percentage: null });
                    Toast.show({
                        type: 'error',
                        text1: 'Invalid Semester',
                        text2: `Semester ${num} does not exist.`,
                    });
                    }
                }}
                style={{ height: 50, width: '100%' }}
                >
                <Picker.Item label="Select a semester..." value={null} />
                {Object.keys(data?.semesterGrades || {}).map((key) => (
                    <Picker.Item key={key} label={`Semester ${key}`} value={parseInt(key)} />
                ))}
                </Picker>
            </View>
        </View>


        {selectedSemester !== null && data.semesterGrades?.[selectedSemester] && (
          <>
            <Text className="text-gray-600 text-sm mb-3">
              Edit subjects for Semester {selectedSemester}
            </Text>

            {courses.map((course, i) => (
              <View key={i} className="flex-row items-center justify-between mb-3">
                <TextInput
                  className="border border-gray-300 rounded-lg px-3 py-2 flex-1 mr-2"
                  placeholder="Course Name"
                  value={course.name}
                  onChangeText={(text) => updateCourse(i, 'name', text)}
                />
                <TextInput
                  className="border border-gray-300 rounded-lg px-3 py-2 w-20 text-center mr-2"
                  placeholder="Grade"
                  keyboardType="decimal-pad"
                  value={course.grade}
                  onChangeText={(text) => updateCourse(i, 'grade', text)}
                />
                <TextInput
                  className="border border-gray-300 rounded-lg px-3 py-2 w-20 text-center"
                  placeholder="Credit"
                  keyboardType="decimal-pad"
                  value={course.credit}
                  onChangeText={(text) => updateCourse(i, 'credit', text)}
                />
                <TouchableOpacity className="ml-2 p-2 bg-red-100 rounded-lg" onPress={() => {
                  setCourses(courses.filter((_, idx) => idx !== i));
                }}>
                  <icons.delete fill="#ef4444" width={20} height={20} />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              className="flex-row items-center justify-center mt-4 border-2 border-gray-300 rounded-xl py-3"
              onPress={addCourse}
            >
              <icons.add fill="#4b5563" width={24} height={24} />
              <Text className="text-gray-600 font-semibold pl-2">Add More Courses</Text>
            </TouchableOpacity>

            <View className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <View className="flex-row justify-between mb-2">
                <Text className="font-semibold text-gray-600">SGPA</Text>
                <Text className="font-semibold text-gray-900">{report.sgpa ?? 'N/A'}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-semibold text-gray-600">Percentage</Text>
                <Text className="font-semibold text-gray-900">{report.percentage ?? 'N/A'}</Text>
              </View>
            </View>

            <TouchableOpacity
            className="bg-blue-400 mt-6 py-4 rounded-xl flex-row items-center justify-center"
            onPress={() => calculateSGPA()}
            >
            <icons.calculator fill="#ffffff" width={22} height={22} />
            <Text className="text-white font-medium pl-2">Recalculate SGPA</Text>
            </TouchableOpacity>

            <TouchableOpacity
            className="bg-emerald-500 mt-4 py-4 rounded-xl flex-row items-center justify-center"
            onPress={save}
            >
            <icons.save fill="#ffffff" width={22} height={22} />
            <Text className="text-white font-medium pl-2">Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
            className="bg-rose-500 mt-4 py-4 rounded-xl flex-row items-center justify-center"
            onPress={handleDeleteSemester}
            >
            <icons.delete fill="#ffffff" width={22} height={22} />
            <Text className="text-white font-medium pl-2">Delete Entire Semester</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </>
  );
}
