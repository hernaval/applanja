import { FONT_NAME } from '@/constants'
import AntDesign from '@expo/vector-icons/AntDesign'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Tabs } from 'expo-router'
import { Text } from 'react-native'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: 'blue',
      tabBarLabelStyle: {
        fontFamily: FONT_NAME
      },
      headerTitleStyle: {
        fontFamily: FONT_NAME,
        fontWeight: 'regular'
      },
     //tabBarHideOnKeyboard: true
    }}

    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Tendances',
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name='grid-outline' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='weight'
        options={{
          title: 'Contrôle de poids',
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name='scale-outline' color={color} />
          ),
          
        }}
      />
      <Tabs.Screen
        name='history'
        options={{
          title: 'Historiques',
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name='pulse-outline' color={color} />
          ),
          
        }}
      />

      <Tabs.Screen
        name='goal'
        options={{
          title: 'Objectifs',
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name='trophy-outline' color={color} />
          ),
          
        }}
      />
    </Tabs>
  )
}
