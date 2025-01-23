import { ActionButton, FlatButton } from '@/components/buttons'
import { MainView } from '@/components/layouts'
import { Title } from '@/components/typo'
import { Box } from '@/components/ui/box'
import { HStack } from '@/components/ui/hstack'
import { FONT_NAME } from '@/constants'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import AntIcon from '@expo/vector-icons/AntDesign'
import { WeightHistoryItem } from './history'


export default function HomePage() {
  return (
    <ScrollView className='p-2'>
      
      <View>
        {/* <Text className='font-bold text-4xl'>Bonjour Joe,</Text>   */}
        {/* <Text className='text-3xl text-gray-500 text-center'>Restez à jour sur vos progressions,</Text>   */}
      </View>      
      <View className='bg-white flex-row justify-around  rounded-[10px] py-6 px-2' >
        <View >
          <Text className='text-center text-4xl font-bold'>10kg</Text>
          <Box  className='mb-2'/>
          <Text className='text-tertiary-100'>🔥Total de poids perdu</Text>
        </View>
        <View >
          <Text className='text-center text-4xl font-bold'>2kg</Text>
          <Box  className='mb-2'/>
          <Text className='text-tertiary-100'>💪Plus grosse perte</Text>
        </View>
      </View>
      <Box className='mb-3' />

      <View className='bg-white items-center rounded-[10px]  py-6 px-2'>
        <AntIcon name='dashboard' size={24} />
        <Box className='mb-3' />
          <Text className='text-center text-4xl font-bold'>12 jours</Text>
          <Box  className='mb-5'/>
          <Text className='text-tertiary-100'>à atteindre l'objectif</Text>
      </View>

      <Box className='mb-5' />
      <Text className='text-md' style={{
        fontFamily: FONT_NAME
      }}>Ma progression</Text>

      <Box className='mb-5' />
      <View className='bg-white p-8 rounded-[10px]  py-6 px-2'>
        <HStack className='items-center '>
          <Text className='text-tertiary-100'>Poids actuel:</Text>
          <Text className='font-bold text-2xl '> 90.0 kg</Text>
        </HStack>
        <Box className='mb-2' />
        <HStack className='items-center'>
          <Text className=''>Objectif:</Text>
          <Text className='text-secondary-1 font-bold'> 90.0 kg</Text>
          <Box className='mr-2' />
          <Text className=''>Allez, continuez!</Text>
        </HStack>
        <Box className='mb-5' />
        <View className='w-full'>
          <View className='bg-secondary-1 h-4 rounded-full' />
          <Box className='mb-2' />
          <View className='flex-row justify-between'>
            <Text className='text-tertiary-100'>90kg</Text>
            <Text className='text-tertiary-100'>80kg</Text>
          </View>
        </View>
        <Box className='mb-5' />
        <ActionButton text='Mettez à jour votre poids' onPress={() => {}} />
      </View>

<Box className='mb-5' />
<View className='flex-row justify-between'>
    <Text className='text-md' style={{
          fontFamily: FONT_NAME
        }}>Derniers enregistrements</Text>

<FlatButton text='voir tout' onPress={() => {}}  /> 
</View>
    

      <Box className='mb-5' />
      {Array.from({length: 3}).map((i, k) => (
        <View key={k}>
          <WeightHistoryItem item={{date: new Date('2025-01-01'), value: 80, deltaN: 5, deltaP: 5}} />
          <Box className='mb-2' />
        </View>
      ))}
    </ScrollView>
  )
}
