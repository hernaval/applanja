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
import 'dayjs/locale/fr'
import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, TextInputBase, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import AntIcon from '@expo/vector-icons/AntDesign'
import { HStack } from '@/components/ui/hstack'
import Ionicons from '@expo/vector-icons/Ionicons'
import { FONT_NAME } from '@/constants'
import LoadingSpinner from '@/components/LoadingSpinner'
import { retrieveDayWeightEntry } from '@/features/weight/retrieve-day-weight-entry'
import { retrieveLastWeightEntry } from '@/features/weight/retrieve-last-weight-entry'

export default function WeightScreen() {
  const [weight, setWeight]                         = useState<number>(60)
  const [desiredWeight, setDesiredWeight]           = useState<number>(60)
  const today                                       = new Date(Date.now())
  const [date, setDate]                             = useState(today)
  const [goalDate, setGoalDate]                     = useState(null)
  const [weightEntry, setWeightEntry]               = useState<WeightEntry | null>(null)
  const [lastWeightEntry, setLastWeightEntry]       = useState<WeightEntry | null>(null)
  const [showDatePicker, setShowDatePicker]         = useState(false)
  const [showGoalDatePicker, setShowGoalDatePicker] = useState(false)
  const [note, setNote]                             = useState("")
  const [isLoading, setIsLoading]                   = useState(false)

  const changeWeight = (value: string) => {
    setWeight(Number(value))
  }
  const changeDesiredWeight = (value: string) => {
    setDesiredWeight(Number(value))
  }
  const save = () => {
    console.log('save weight')
    setIsLoading(true)
    addWeightEntry({id: weightEntry?.id,date: date, value: weight, note})
    setIsLoading(false)
  }
  const fetchDayEntry = async () => {
    setIsLoading(true)
    const entry: WeightEntry | null = await retrieveDayWeightEntry(date)
    if(entry != null) {
      setWeightEntry(entry)
    }
    setIsLoading(false)
  }

  const fetchLastEntry = async () => {
    setIsLoading(true)
    const entry: WeightEntry | null = await retrieveLastWeightEntry()
    if(entry != null) {
      setLastWeightEntry(entry)
    }
    setIsLoading(false)
  }

  const changeDate = (target: string, date: any) => {
    console.log(date)
    if(target == 'goal') {
      setShowGoalDatePicker(false)
      setGoalDate(date)
    } else {
      setShowDatePicker(false)
      setDate(new Date(date))
    }
  }

  useEffect(() => {
    fetchDayEntry()

    return () => {
      //TODO move entry state of the weightEntry object 
      setWeightEntry(null)
      setNote("")
    }
  }, [date])

  useEffect(() => {
    fetchLastEntry()
  }, [])

  return (
    <MainView>

      {/* adding this scrollview to adapt the screen when editing form */}
      <ScrollView
      >
          <View className='flex-1'>
          {showDatePicker && <DateTimePicker  
            mode='date'
            locale={'fr'}
            value={date} 
            onChange={(event, value) => changeDate('data', value)}
        
            />}

          {showGoalDatePicker && <DateTimePicker  
            mode='date'
            locale={'fr'}
            value={date} 
            onChange={(event, value) => changeDate('goal', value)}
            />}

        <Box
          className='mb-5'
        />

        <View className='flex-row items-center justify-center'>
              <AntIcon name='left' size={24} color={'rgba(255, 149, 37, 1)'} />
              <TouchableHighlight
            onPress={() => setShowDatePicker(true)}
            underlayColor="#fffffd"
            activeOpacity={0.5}
          >

              <View style={styles.button}>
                <Text className='text-lg'> {dayjs(date).locale('fr').format("dddd, DD-MM-YYYY")} </Text>
              </View>
          </TouchableHighlight>
              <AntIcon name='right' size={24} color={'rgba(255, 149, 37, 1)'} />
        </View>

        <Box
          className='mb-5'
        />

    <View
      className='flex-row items-center justify-center'
    >
      <Ionicons name='alert-circle-outline' color={'rgba(52, 52,52, 0.45)'} />
        <Text className='' style={{color: 'rgba(52, 52,52, 0.45)', fontFamily: FONT_NAME  }}> Dernier poids enregistré : </Text>
        <Text className='text-secondary-1 font-bold text-xl'>{lastWeightEntry == null ? 'N/A': `${lastWeightEntry.value}kg` }</Text>
    </View>

        <Box
          className='mb-5'
        />


          <Title text='Données' color='tertiary-100' size='xl' />
            <Box
          className='mb-3'
        />

            <View
            className='flex-row items-center bg-secondary-10 rounded-[5px] h-14 px-2'
            >
              <View
                className='flex-1'
              > 
                  <TextInput
                  className='h-14 text-secondary-1'
                  placeholder='Entrer votre poids actuel'
                  keyboardType='numeric'
                  onChangeText={changeWeight}
                  defaultValue={weightEntry?.value.toString() ?? ''}
                  />
              </View>
              
                  <Text className='text-secondary-1 font-bold'>kg</Text>
            </View>


            <Box
          className='mb-3'
        />

            <View
            className='bg-secondary-10 rounded-[5px] h-32'
            >
              <View
                className=''
              >
                  <TextInput
                  className='text-secondary-1'
                  placeholder='Ajouter une note'
                  multiline
                  numberOfLines={5}
                  onChangeText={(value) => setNote(value)}
                  defaultValue={weightEntry?.note ?? ''}
                  />
              </View>
              
            </View>

        <Box
          className='m-5'
        />

        <Title text='Objectif' color='tertiary-100' size='xl' /> 
        <Box
          className='m-2'
        />
        <View
            className='flex-row items-center bg-secondary-10 rounded-[5px] h-14 px-2'
            >
              <View
                className='flex-1'
              >
                  <TextInput
                  className='h-14 text-secondary-1'
                  placeholder="Entrer le poids désiré"
                  keyboardType='numeric'
                  onChangeText={changeDesiredWeight}
                  />
              </View>
              
                  <Text className='text-secondary-1 font-bold'>kg</Text>
            </View>

            <Box className='mb-2' />
            
          <View
            className='flex-row items-center bg-secondary-10 rounded-[5px] h-14 px-2'
            >
              <View
                className='flex-1'
              >
                {goalDate 
                ?               
                <TouchableOpacity
                onPress={() => setShowGoalDatePicker(true)}
                >

                <Text className='' style={{color: 'rgba(52, 52, 52, 0.8)'}}>
                {dayjs(goalDate).locale('fr').format('DD-MM-YYYY')}
                </Text>

                </TouchableOpacity>
                : 
                <TouchableOpacity
                  onPress={() => setShowGoalDatePicker(true)}
                >

                  <Text className='' style={{color: 'rgba(52, 52, 52, 0.8)'}}>
                  Date
                  </Text>
                </TouchableOpacity>

                }
              </View>
              
              <TouchableOpacity
                onPress={() => setShowGoalDatePicker(true)}
              >
                <AntIcon size={24} name='calendar' color={'rgba(52, 52, 52, 0.5)'} />
              </TouchableOpacity>
            </View>
          </View>
      </ScrollView>
      <View>
{/* action view with button  */}

      {/* <FlatList 
        data={weightEntry}
        renderItemy{item}) => <WeightEntryItem item={item}  />}
        keyExtractor={item => item.id?.toString()!!}
        />       */}
      <ActionButton onPress={save} text={weightEntry == null ? 'Enregistrer' : 'Mettre à jour'} />
        </View>
        <LoadingSpinner visible={isLoading} />
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
    marginHorizontal: 15
  }
})