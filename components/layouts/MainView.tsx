import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'
import { VStack } from '../ui/vstack'

type MainViewProps = {
  children: ReactNode
}
const MainView: React.FC<MainViewProps> = ({children}) => {
  return (
    <VStack
      className='h-full bg-white p-2'
    >
      {children}
    </VStack>
  )
}

export default MainView
