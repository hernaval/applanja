import { getAllWeightEntries, getWeightEntryForDate, initDb, saveWeightEntry, updateWeightEntry } from "@/provider/db";
import { WeightEntry } from "./types/weight-entry";

export async function addWeightEntry(entry: WeightEntry): Promise<void> {
    initDb()
    .then(async () => {

        const dayEntry = await getWeightEntryForDate(entry.date) as WeightEntry
        return dayEntry != null 
    })
    .then((hasDayEntry: boolean) => {
        if(hasDayEntry) {
            updateWeightEntry(entry)
        } else {
            saveWeightEntry(entry)
        }
    }
    )
    .then(() => {
        getAllWeightEntries()
            .then(v => console.log("last entry "))
    })
    .catch(e => {
            console.error(e)
    }) 
    return ;
}