import React from 'react'
import { View } from 'react-native'

type FlexCenterProps = {
    variant: "horizontal" | "vertical"
    children: React.ReactNode
}
const FlexCenter: React.FC<FlexCenterProps> = ({variant, children}) => {
  const direction = variant === 'horizontal' ? 'row' : 'col'
  return (
    <View 
      className={`flex-${direction} justify-center items-center`}
    >
      {children} 
    </View> 
  )
}

export default FlexCenter