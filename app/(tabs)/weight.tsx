import { useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { addWeightEntry } from '../../features/weight/add-weight-entry'

export default function WeightScreen() {
  const [weight, setWeight] = useState<number>(60)
  const today               = new Date(2025, 1, 1)

  const changeWeight = (value: string) => {
    setWeight(Number(value))
  }
  const save = () => {
    console.log('save weight')
    addWeightEntry({date: today, value: weight})

  }

  return (
    <View>
      <Text>Votre assistant de poids</Text>

       <TextInput
       defaultValue={weight.toString()}
        editable
        onChangeText={changeWeight}
        keyboardType='numeric'
       />

      <Button
        onPress={save}
        title='Enregister'
      />
    </View>
  )
}
