import '../global.css';
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { GlobalProvider } from '../context/GlobalProvider';

export default function RootLayout() {
    const colorScheme = useColorScheme();
    
    return (
        <GlobalProvider>
            <Stack>
                <Stack.Screen name="index" options={{ title: "Home" }} />
                <Stack.Screen name="second" options={{ title: "Second Screen" }} />
            </Stack>
        </GlobalProvider>
        
    )
}
