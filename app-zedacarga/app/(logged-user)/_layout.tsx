import '../../tamagui-web.css'

import { useEffect } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { Provider } from '../Provider'
import { useTheme } from 'tamagui'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'Home',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync()
    }
  }, [interLoaded, interError])

  if (!interLoaded && !interError) {
    return null
  }

  return (
    <Providers>
      <RootLayoutNav />
    </Providers>
  )
}

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()
  const theme = useTheme()
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <Stack>
        <Stack.Screen
          name="Home"
          options={{
            title: 'Home',
            headerShown: false, // Opcional, oculta o cabeçalho
            animation: 'fade',
          }}
        />


        <Stack.Screen
          name="ProfileUser"
          options={{
            title: 'ProfileUser',
            headerShown: false, // Opcional, oculta o cabeçalho
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name="RegisterCardUser"
          options={{
            title: 'RegisterCardUser',
            headerShown: false, // Opcional, oculta o cabeçalho
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name='addCreditUser'
          options={{
            title: 'addCreditUser',
            headerShown: false, // Opcional, oculta o cabeçalho
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name='addDebitUser'
          options={{
            title: 'addDebitUser',
            headerShown: false, // Opcional, oculta o cabeçalho
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name='HistoricTravelUser'
          options={{
            title: 'HistoricTravelUser',
            headerShown: false, // Opcional, oculta o cabeçalho
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name='EditUser'
          options={{
            title: 'EditUser',
            headerShown: false, // Opcional, oculta o cabeçalho
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name="TravelInformationUser"
          options={{
            title: 'TravelInformationUser',
            headerShown: false, // Opcional, oculta o cabeçalho
            animation: 'fade',
          }}
        />

      </Stack>

    </ThemeProvider>
  )
}
