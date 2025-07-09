import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const GlobalContext = createContext();

const templateData = {
    semesterGrades: {
      1: { 
          subjects: [
            { name: 'Mathematics', grade: 'A', credit: 3 },
            { name: 'Physics', grade: 'B+', credit: 4 },
            { name: 'Chemistry', grade: 'A-', credit: 3 },
            { name: 'Computer Science', grade: 'A', credit: 4 },
            { name: 'English', grade: 'B', credit: 2 },
            { name: 'History', grade: 'B+', credit: 3 },
          ],
          totalCredits: 19,
          totalGradePoints: 0,
          gpa: 0,
        },
      2: {
          subjects: [
            { name: 'Biology', grade: 'A', credit: 3 },
            { name: 'Statistics', grade: 'B+', credit: 4 },
            { name: 'Economics', grade: 'A-', credit: 3 },
            { name: 'Psychology', grade: 'A', credit: 4 },
            { name: 'Philosophy', grade: 'B', credit: 2 },
            { name: 'Sociology', grade: 'B+', credit: 3 },
          ],
          totalCredits: 19,
          totalGradePoints: 0,
          gpa: 0,
        
        },
      3: {
          subjects: [
            { name: 'Advanced Mathematics', grade: 'A', credit: 3 },
            { name: 'Quantum Physics', grade: 'B+', credit: 4 },
            { name: 'Organic Chemistry', grade: 'A-', credit: 3 },
            { name: 'Data Structures', grade: 'A', credit: 4 },
            { name: 'Literature', grade: 'B', credit: 2 },
            { name: 'World History', grade: 'B+', credit: 3 },
          ],
          totalCredits: 19,
          totalGradePoints: 0,
          gpa: 0,
        },
      4: {
          subjects: [
            { name: 'Genetics', grade: 'A', credit: 3 },
            { name: 'Probability Theory', grade: 'B+', credit: 4 },
            { name: 'Microeconomics', grade: 'A-', credit: 3 },
            { name: 'Cognitive Psychology', grade: 'A', credit: 4 },
            { name: 'Ethics', grade: 'B', credit: 2 },
            { name: 'Cultural Studies', grade: 'B+', credit: 3 },
          ],
          totalCredits: 19,
          totalGradePoints: 0,
          gpa: 0,
        },
      5: {
          subjects: [
            { name: 'Linear Algebra', grade: 'A', credit: 3 },
            { name: 'Thermodynamics', grade: 'B+', credit: 4 },
            { name: 'Inorganic Chemistry', grade: 'A-', credit: 3 },
            { name: 'Algorithms', grade: 'A', credit: 4 },
            { name: 'Creative Writing', grade: 'B', credit: 2 },
            { name: 'Modern History', grade: 'B+', credit: 3 },
          ],
          totalCredits: 19,
          totalGradePoints: 0,
          gpa: 0,
        },
      6: {
          subjects: [
            { name: 'Differential Equations', grade: 'A', credit: 3 },
            { name: 'Electromagnetism', grade: 'B+', credit: 4 },
            { name: 'Physical Chemistry', grade: 'A-', credit: 3 },
            { name: 'Operating Systems', grade: 'A', credit: 4 },
            { name: 'Rhetoric', grade: 'B', credit: 2 },
            { name: 'Ancient Civilizations', grade: 'B+', credit: 3 },
          ],
          totalCredits: 19,
          totalGradePoints: 0,
          gpa: 0,
        },
    }
  }





export const GlobalProvider = ({ children }) => {
  const [data, setData] = useState(templateData);

  const saveData = async () => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('grade_app_data', jsonValue);
      console.log('Data saved successfully:', newData);
    } catch (e) {
      console.error('Error saving data:', e);
    }
  };
  

  const saveSemester = (semesterNumber, subjects) => {
    setData((prevData) => ({
      ...prevData,
      [semesterGrades]: {
        ...prevData.semesterGrades || {},
        [semesterNumber]: { subjects: subjects || [] }
      }
    }));
    saveData();
    console.log(`Semester ${semesterNumber} added with subjects:`, subjects);
  };

  console.log('GlobalProvider data initialized:', data);

  useEffect(() => {
    const fetchData = async () => {
      // const value = await AsyncStorage.getItem('grade_app_data');
      // setData(value ? JSON.parse(value) : {});
      // console.log('GlobalProvider data fetched:', value ? JSON.parse(value) : {});
    };

    fetchData();
  }, []);

  return (
    <GlobalContext.Provider value={{ data, setData, saveSemester }}>
        {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);
