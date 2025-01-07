import React from 'react'
import { Button, ButtonText } from '../ui/button'
import { FONT_NAME } from '@/constants'
import { Text, TouchableHighlight } from 'react-native'

type ActionButtonProps = {
    onPress: () => void
    text: string 
}
const ActionButton = (props: ActionButtonProps) => {
  return (
    <TouchableHighlight
    onPress={props.onPress}
    className='bg-primary-1 rounded-full mx-8 py-5'
    underlayColor={'rgba(35, 110, 250, 0.8)'}
    >
        <Text className='text-white font-normal text-center tracking-wider'
          style={{fontFamily: FONT_NAME}}
        >{props.text}</Text>
    </TouchableHighlight>
  )
}

export default ActionButton