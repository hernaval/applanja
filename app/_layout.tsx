import { SplashScreen, Stack } from 'expo-router'
import "../global.css"
import { SpaceMono_400Regular, useFonts } from '@expo-google-fonts/space-mono'
import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { FONT_NAME } from '@/constants'
export default function Layout() {
  SplashScreen.preventAutoHideAsync()

  const [loaded, error] = useFonts({
    SpaceMono_400Regular
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View className='h-full'>
      <StatusBar style='auto' />
      <Stack>
        <Stack.Screen name='(tabs)' options={{ 
          headerShown: false,
         }} />
      </Stack>
    </View>
  )
}
