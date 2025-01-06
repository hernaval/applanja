import React from 'react'
import { Input, InputField, InputIcon, InputSlot } from '../ui/input'
import { VStack } from '../ui/vstack'
import { FormControlLabel, FormControlLabelText } from '../ui/form-control'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import AntIcon from '@expo/vector-icons/AntDesign'
import { KeyboardType, Text, TextInput, View } from 'react-native'
import { Box } from '../ui/box'
import { HStack } from '../ui/hstack'

type TextFieldProps = {
    label: string 
    defaultValue: string
    placeholder: string
    onChange: (newValue: string) => void
    mode: KeyboardType
}
const TextField = (props: TextFieldProps) => {
  return (
    <Box 
       className='flex-1 flex-row items-center bg-secondary-10 px-2 py-1 rounded-[7px] m-1'
      >
   <TextInput 
    editable
    placeholder={props.placeholder}
    defaultValue={props.defaultValue}
    onChangeText={props.onChange}
    className='flex-1 h-14 text-tertiary-1'
    placeholderClassName='font-bold'
    keyboardType={props.mode}  
    />
      <AntIcon size={24} name='Trophy' color={'rgba(52, 52, 52, 0.5)'} />
    </Box>
  )
}

export default TextField