import { MainView } from "@/components/layouts";
import { VStack } from "@/components/ui/vstack";
import { FONT_NAME } from "@/constants";
import { retrieveRangeofWeightEntry } from "@/features/weight/retrieve-rangeof-weight-entry";
import { WeightEntry } from "@/features/weight/types/weight-entry";
import dayjs from "dayjs";
import { Suspense, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import 'dayjs/locale/fr'
import { Box } from "@/components/ui/box";
import Ionicons from '@expo/vector-icons/Ionicons'

interface WeightHistoryItemProps {
  item: WeightEntry
}
const WeightHistoryItem: React.FC<WeightHistoryItemProps> = ({item}) => {
    return <View className="bg-secondary-10 rounded py-2 px-4">
        <VStack>
            <Text
                style={{fontFamily: FONT_NAME}}
                className="text-sm"
            >{item.date.toString()}</Text>
            <Box className="my-2" />
            <View 
                className="flex-row items-center"
            >
                    <Text 
                    style={{fontFamily: FONT_NAME}}
                    className="font-bold text-3xl">{item.value} kg</Text>
                    <Box className="mx-4" />
                    <View className="flex-row justify-between  items-center w-24 bg-secondary-1 py-1 px-[5px] rounded-full tracking-wide">
                        <Text className="text-xs font-bold"> + </Text>
                    <Text className="text-xs font-bold">5kg
                    </Text>
                    <Ionicons name="trending-up-outline" size={14} className="font-bold" />

                    </View>
            </View>
        </VStack>
    </View>
}
export default function History() {
    const [selectedCustomDateRange, setSelectedCustomDateRange] = useState<{from: Date, to: Date}>()
    const [history, setHistory] = useState<WeightEntry[]>([])
    const [isLoading, setIsLoading]                             = useState(false)
    const fetchWeightHistory = async () => {
        setIsLoading(true)
        const history: WeightEntry[] = await retrieveRangeofWeightEntry({type: 'predefined', range: '1y'})
        setHistory(history)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchWeightHistory()
    }, [])
    return <MainView>
        <Suspense fallback={"loading..."}>
            <FlatList 
                data={history}
                renderItem={({item}) => <WeightHistoryItem item={item} />}
                keyExtractor={item => item.id?.toString()!!}
                ItemSeparatorComponent={({item}) => <Box className="mb-4" />}
                />      
        </Suspense>
    </MainView>
}