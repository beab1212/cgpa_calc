import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from "react-native-toast-message/lib/src/Toast";


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
    },
    gradingScales: {
      ethiopianUniversityGradingScale: [
        { grade: 'A+', min: 90, max: 100, weight: 4 },
        { grade: 'A',  min: 85, max: 89,  weight: 4 },
        { grade: 'A-', min: 80, max: 84,  weight: 3.75 },
        { grade: 'B+', min: 75, max: 79,  weight: 3.5 },
        { grade: 'B',  min: 70, max: 74,  weight: 3 },
        { grade: 'B-', min: 65, max: 69,  weight: 2.75 },
        { grade: 'C+', min: 60, max: 64,  weight: 2.5 },
        { grade: 'C',  min: 50, max: 59,  weight: 2 },
        { grade: 'C-', min: 45, max: 49,  weight: 1.75 },
        { grade: 'D',  min: 40, max: 44,  weight: 1 },
        { grade: 'F',  min: 0,  max: 39,  weight: 0 }
      ],
      unityUniversityGradingScale: [
        { grade: 'A+', min: 90, max: 100, weight: 4 },
        { grade: 'A',  min: 80, max: 89,  weight: 4 },
        { grade: 'B+', min: 75, max: 79,  weight: 3.5 },
        { grade: 'B',  min: 65, max: 74,  weight: 3 },
        { grade: 'C+', min: 60, max: 64,  weight: 2.5 },
        { grade: 'C',  min: 50, max: 59,  weight: 2 },
        { grade: 'D',  min: 40, max: 49,  weight: 1 },
        { grade: 'F',  min: 0,  max: 39,  weight: 0 }
      ]
    }
  }





export const GlobalProvider = ({ children }) => {
  const [data, setData] = useState(templateData);
  const [menuToggle, setMenuToggle] = useState(false);
  const toggleMenu = () => setMenuToggle(!menuToggle);

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
    if (!semesterNumber || typeof semesterNumber !== 'number') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a valid semester number.',
      });
      return;
    }
    if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter at least one subject.',
      });
      return;
    }
    if (data.semesterGrades && data.semesterGrades[semesterNumber]) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `Semester ${semesterNumber} already exists.`,
      });
      return;
    }
    // Calculate total credits and grade points
    const totalCredits = subjects.reduce((acc, subject) => acc + (subject.credit || 0), 0);
    const totalGradePoints = subjects.reduce((acc, subject) => {
      const gradePoint = subject.grade ? convertGradeToPoint(subject.grade) * (subject.credit || 0) : 0;
      return acc + gradePoint;
    }, 0);
    const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    const convertGradeToPoint = (grade) => {
      switch (grade) {
        case 'A': return 4.0;
        case 'A-': return 3.7;
        case 'B+': return 3.3;
        case 'B': return 3.0;
        case 'B-': return 2.7;
        case 'C+': return 2.3;
        case 'C': return 2.0;
        case 'D': return 1.0;
        case 'F': return 0.0;
        default: return 0.0; // Default to 0 for invalid grades
      }
    };
    // Update the data state with the new semester

    setData((prevData) => ({
      ...prevData,
      semesterGrades: {
        ...prevData.semesterGrades,
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
    <GlobalContext.Provider value={{ data, setData, saveSemester, menuToggle, toggleMenu }}>
        {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);
