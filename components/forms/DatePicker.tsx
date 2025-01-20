import React from 'react'
import DateTimePicker, { DatePickerOptions } from '@react-native-community/datetimepicker'

type DatePickerProps = {
    visible: boolean
    maxDate?: Date 
} & DatePickerOptions
const DatePicker = (props: DatePickerProps) => {
  if(!props.visible) return 
  
  return (
    <DateTimePicker
            mode='date'
            locale={'fr'}
            maximumDate={props.maxDate ? props.maxDate : new Date(Date.now())}
            {...props}        
    />
  )
}


export default DatePicker