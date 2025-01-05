import React from 'react'
import { Button, ButtonText } from '../ui/button'

type ActionButtonProps = {
    onPress: () => void
    text: string 
}
const ActionButton = (props: ActionButtonProps) => {
  return (
    <Button
    onPress={props.onPress}
    className='bg-primary-1 h-14 rounded-full'
    android_ripple={{color: 'rgba(35, 110, 250, 1)'}}
    >
        <ButtonText className='text-white'>{props.text}</ButtonText>
    </Button>
  )
}

export default ActionButton