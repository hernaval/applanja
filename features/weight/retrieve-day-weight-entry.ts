import { getWeightEntryForDate, initDb } from "@/provider/db";
import { WeightEntry } from "./types/weight-entry";

export async function retrieveDayWeightEntry(date: Date): Promise<WeightEntry | null> {
    let entry: WeightEntry|null = null
    await initDb()
        .then(async () => {
            const results = await getWeightEntryForDate(date);
            entry = results as WeightEntry;
            
            console.log("finding day entry", entry)
        })  
        .catch(e => {
            console.log("error retrieving ", e)
        })

    return entry
}