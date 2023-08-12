import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect,useContext } from 'react';
import { Pressable, Text, useColorScheme } from 'react-native';
import {GlobalContext, GlobalContextProvider} from "@/context/GlobalContext"


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });


  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();


  return (
    <GlobalContextProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="itemDetail/[id]" options={{
           headerTitle: 'Details',
          //  headerRight: () => (
          //     <Pressable style={{
          //       paddingHorizontal: 12,
          //       paddingVertical: 6,
          //       borderRadius: 10,
          //       backgroundColor: '#2776Ee',
          //       marginRight: 5,
                
          //     }}
            
          //     >
          //     <Text
          //     style={{  
          //       color: '#fff',
          //       fontWeight: '600',
          //       fontSize: 14,

          //     }}
          //     >Stock In/Out</Text>  
          //     </Pressable>
          //  )
          
           }} />
      </Stack>
    </ThemeProvider>
    </GlobalContextProvider>
  );
}
