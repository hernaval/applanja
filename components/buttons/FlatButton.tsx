import React from 'react'
import { Button, ButtonText } from '../ui/button'
import { FONT_NAME } from '@/constants'
import { Text, TouchableHighlight } from 'react-native'

type FlatButtonPropsProps = {
    onPress: () => void
    text: string 
    containerClassName?: string 
    underlayColor?:string
}
const FlatButtonProps = (props: FlatButtonPropsProps) => {
  return (
    <TouchableHighlight
    onPress={props.onPress}
    className={props.containerClassName}
    activeOpacity={0.5} 
    underlayColor={`${props.underlayColor ? props.underlayColor : '#fffffd'}`}
    >
        <Text className='font-normal text-center tracking-wider'
          style={{fontFamily: FONT_NAME}}
        >{props.text}</Text>
    </TouchableHighlight>
  )
}

export default FlatButtonProps