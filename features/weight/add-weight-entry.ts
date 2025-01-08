import { getAllWeightEntries, getWeightEntryForDate, initDb, saveWeightEntry, updateWeightEntry } from "@/provider/db";
import { WeightEntry } from "./types/weight-entry";

export async function addWeightEntry(entry: WeightEntry): Promise<void> {
    try {
        await initDb()
        const dayEntry = await getWeightEntryForDate(entry.date) as WeightEntry
        if(dayEntry != null) {
            await updateWeightEntry(entry)
        } else {
            await saveWeightEntry(entry)
        }
    }
        catch(e) {
            console.error(e)
            throw e
    }
}