import ActionButton from '@/components/buttons/ActionButton'
import { TextField } from '@/components/forms'
import { MainView } from '@/components/layouts'
import { Title } from '@/components/typo'
import { Box } from '@/components/ui/box'
import { addWeightEntry } from '@/features/weight/add-weight-entry'
import { retrieveWeightEntries } from '@/features/weight/retrieve-weight-entries'
import { WeightEntry } from '@/features/weight/types/weight-entry'
import DateTimePicker from '@react-native-community/datetimepicker'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native'

type WeightEntryItemProps = {
  item: WeightEntry
}
const WeightEntryItem = (props: WeightEntryItemProps) => {
  const {value, date} = props.item
  return (
    <Text>{value}</Text>
  )
}

export default function WeightScreen() {
  const [weight, setWeight]                 = useState<number>(60)
  const today                               = new Date(2025, 0, 1)
  const [date, setDate]                     = useState(today)
  const [weightEntries, setWeightEntries]   = useState<WeightEntry[]>([])
  const [showDatePicker, setShowDatePicker] = useState(false)

  const changeWeight = (value: string) => {
    setWeight(Number(value))
  }
  const save = () => {
    console.log('save weight')
    addWeightEntry({date: date, value: weight})
    fetchWeightEntries()
  }
  const fetchWeightEntries = async () => {
    const results: WeightEntry[] = await retrieveWeightEntries();
    setWeightEntries(results)
  }

  const changeDate = (event: any, date: any) => {
    console.log(date)
    setShowDatePicker(false)
    setDate(new Date(date))
  }

  useEffect(() => {
    fetchWeightEntries()
  }, [])

  return (
    <MainView>

      {showDatePicker && <DateTimePicker  
        mode='date'
        locale={'fr'}
        value={date} 
        onChange={changeDate}
        />}

    <Box
      className='mb-5'
    />

    <TouchableHighlight
        onPress={() => setShowDatePicker(true)}
        underlayColor="#fffffd"
        activeOpacity={0.5}
      >
        <View style={styles.button}>
        <Text> {dayjs(date).format("DD-MM-YYYY")} </Text>
        </View>
      </TouchableHighlight>

      <Title text='General' color='tertiary-1' size='xl' />

      <TextField mode='numeric' label='Poids en kg' defaultValue={weight.toString()} onChange={changeWeight} placeholder='Entrer votre poids actuel'/>
      <TextField mode='numeric' label='Poids en kg' defaultValue={weight.toString()} onChange={changeWeight} placeholder='Entrer votre poids actuel'/>
      <TextField mode='numeric' label='Poids en kg' defaultValue={weight.toString()} onChange={changeWeight} placeholder='Entrer votre poids actuel'/>
      <TextField mode='numeric' label='Poids en kg' defaultValue={weight.toString()} onChange={changeWeight} placeholder='Entrer votre poids actuel'/>

    <Box
      className='m-5'
    />
       

     <ActionButton onPress={save} text='Enregister' />

      <FlatList 
        data={weightEntries}
        renderItem={({item}) => <WeightEntryItem item={item}  />}
        keyExtractor={item => item.id?.toString()!!}
      />      
    </MainView>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#dddddd",
  }
})