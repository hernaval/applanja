import { MainView } from "@/components/layouts";
import { VStack } from "@/components/ui/vstack";
import { FONT_NAME } from "@/constants";
import { retrieveRangeofWeightEntry } from "@/features/weight/retrieve-rangeof-weight-entry";
import { WeightEntry, WeightEntryHistory } from "@/features/weight/types/weight-entry";
import dayjs from "dayjs";
import { Suspense, useEffect, useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import 'dayjs/locale/fr'
import { Box } from "@/components/ui/box";
import Ionicons from '@expo/vector-icons/Ionicons'
import AntIcons from '@expo/vector-icons/AntDesign'
import LoadingSpinner from "@/components/LoadingSpinner";
import { LiteralRange } from "@/features/weight/types/date-range";
import { Link } from "expo-router";
import ActionButton from "@/components/buttons/ActionButton";
import { HStack } from "@/components/ui/hstack";

interface WeightHistoryItemProps {
  item: WeightEntryHistory
}
type PredifinedLabel = {
    id: LiteralRange,
    label: string 
}
const predefinedRange: PredifinedLabel[] = [
    {id: 'all', label: "Tout"},
    {id: '1w', label: "1s"},
    {id: '2w', label: "2s"},
    {id: '1m', label: "1m"},
    {id: '3m', label: "3m"},
    {id: '1y', label: "1a"},
]
const WeightHistoryItem: React.FC<WeightHistoryItemProps> = ({item}) => {
    return <View className="bg-secondary-10 rounded py-2 px-4">
        <VStack>
            <Text
                style={{fontFamily: FONT_NAME}}
                className="text-sm"
            >{item.date.toString()}</Text>
            <Box className="my-2" />
            <View className="flex-row items-center ">
                <View 
                    className="flex-row items-center flex-1"
                >
                    <Text 
                            style={{fontFamily: FONT_NAME}}
                            className="font-bold text-3xl">{item.value} kg
                    </Text>
                    <Box className="mx-4" />
                    {item.deltaN != undefined && 
                    <View className={`flex-row justify-between  items-center w-24 
                        ${item.deltaN <= 0 ? 'bg-error-500': 'bg-success-500'} 
                        py-1 px-[5px] rounded-full tracking-wide`}>
                        <Text className="text-xs font-bold"> {item.deltaN > 0 ? '+': '-'} </Text>
                        <Text className="text-xs font-bold">{Math.abs(item.deltaN)}kg</Text>
                        {item.deltaN > 0 && 
                            <Ionicons name="trending-up-outline" size={14} className="font-bold" />
                        }
                        {item.deltaN < 0 && 
                            <Ionicons name="trending-down-outline" size={14} className="font-bold" />
                        }
                        {item.deltaN == 0 && 
                            <Ionicons name="trending-down-outline" size={14} className="font-bold" />
                        }
                    </View>
                    }
                </View>
                <View >
                    <HStack>
                        <TouchableOpacity className="p-1">
                            <Ionicons name="heart-outline" size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity className="p-1">
                            <Ionicons name="flame-outline" size={24} />
                        </TouchableOpacity>
                    </HStack>
                </View>
            </View>
           
        </VStack>
    </View>
}

const EmptyHistory = () => {
    return <View className="flex items-center justify-center h-full">
        <AntIcons name="folder1" size={128} color={'rgba(255, 149, 37, 0.5)'}   />
        <Text
        style={{
            fontFamily: FONT_NAME
        }}
        className="text-center"
        >Vous n'avez aucun enregistrement pour le moment.</Text>
        <Box className="mb-5"/>
        <Link href={'/weight'}  className="text-white font-normal text-center tracking-wider bg-secondary-1 rounded-full p-4">
            <Text
            style={{fontFamily: FONT_NAME}}
            >Ajouter maintenant</Text>
        </Link>
    </View>
}
export default function History() {
    const [selectedCustomDateRange, setSelectedCustomDateRange] = useState<{from: Date, to: Date}>()
    const [history, setHistory]                                 = useState<WeightEntryHistory[]>([])
    const [isLoading, setIsLoading]                             = useState(false)
    const [selectedPredefinedRange, setSelectedPredefinedRange] = useState<LiteralRange>("all")

    const fetchWeightHistory = async () => {
        setIsLoading(true)
        const history: WeightEntryHistory[] = await retrieveRangeofWeightEntry({type: 'predefined', range: selectedPredefinedRange})
        setHistory(history)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchWeightHistory()
    }, [selectedPredefinedRange])
    
    return <MainView>
            <Box className="mb-3" />
            
           
        <View className="flex-row items-center">
            {predefinedRange.map((range => (
                <TouchableOpacity
                key={range.id}
                    onPress={() => setSelectedPredefinedRange(range.id)}
                >
                    <Text className={`w-14 text-sm ${selectedPredefinedRange == range.id ? 'bg-secondary-1' : 'bg-secondary-10' } 
                    ${selectedPredefinedRange == range.id ? 'text-white' : 'text-tertiary-1'}
                    mr-1
                    py-1 px-[5px] rounded-full text-center`}>
                        {range.label}
                    </Text>
                </TouchableOpacity>
            )))}
            <Ionicons name="calendar" size={24} color={'rgba(52, 52, 52, 0.5)'} />
        </View>

        {(history.length == 0 && !isLoading)
        ?  <EmptyHistory />
        : 
        <View className="flex-1">

            <Box className="mb-5" />
            <FlatList 
                data={history}
                renderItem={({item}) => <WeightHistoryItem item={item} />}
                keyExtractor={item => item.id?.toString()!!}
                ItemSeparatorComponent={({item}) => <Box className="mb-4" />}
                showsVerticalScrollIndicator={false}
                />      
                <LoadingSpinner visible={isLoading} />
                </View>

            }
    </MainView>
}