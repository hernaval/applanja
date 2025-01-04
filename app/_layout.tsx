import { SplashScreen, Stack } from 'expo-router'
import "../global.css"
import { SpaceMono_400Regular, useFonts } from '@expo-google-fonts/space-mono'
import { useEffect } from 'react'
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
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
  )
}
