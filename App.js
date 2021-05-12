
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { StatusBar } from 'expo-status-bar'

import Calculator from './screens/Calculator'
import History from './screens/History'

import { 
  useFonts,
  IBMPlexMono_400Regular as Mono400
} from '@expo-google-fonts/ibm-plex-mono'


const Stack = createStackNavigator()

function AppStack() {
  const [fontsLoaded] = useFonts({
    Mono400
  })

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Calculator}
        name="Calculator"
        options={{ title: "lazomaths", headerShown: false  }} />
      <Stack.Screen
        component={History}
        name="History"
        options={{
          title: "Historial",
          headerStyle: {
            backgroundColor: '#E2DDB1',
            borderBottomColor: '#ADA986',
            borderBottomWidth: 1
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontFamily: 'Mono400'
          }
        }} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer mode="modal">
      <StatusBar style="auto" backgroundColor="#E2DDB1" />
      <AppStack />
    </NavigationContainer>
  )
}