import React from 'react'
import { Input, InputField } from '../ui/input'
import { VStack } from '../ui/vstack'
import { FormControlLabel, FormControlLabelText } from '../ui/form-control'

type TextFieldProps = {
    label: string 
    defaultValue: string
    onChange: (newValue: string) => void
}
const TextField = (props: TextFieldProps) => {
  return (
    <VStack
    >
    {/* <FormControlLabel>
    <FormControlLabelText>{props.label}</FormControlLabelText>
  </FormControlLabel> */}
    <Input 
        size='md'
        variant='outline'
        
    >
        <InputField
            onChangeText={props.onChange}
            defaultValue={props.defaultValue}
        />
    </Input>
    </VStack>
  )
}

export default TextField