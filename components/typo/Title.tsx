import React from 'react'
import { Text } from 'react-native'

interface TitleProps {
    text: string 
    size: string
    color: string 
}
const Title = (props: TitleProps) => {
    const {text, size, color} = props
  return (
    <Text 
    className={`text-${color} text-${size}`}
    >{text}</Text>
  )
}

export default Title