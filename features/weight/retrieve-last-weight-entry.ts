import { getLastWeightEntry, getWeightEntryForDate, initDb } from "@/provider/db";
import { WeightEntry } from "./types/weight-entry";

export async function retrieveLastWeightEntry(): Promise<WeightEntry | null> {
    let entry: WeightEntry|null = null
    await initDb()
        .then(async () => {
            const results = await getLastWeightEntry();
            entry = results as WeightEntry;
            
            console.log("finding last entry", entry)
        })  
        .catch(e => {
            console.log("error retrieving ", e)
        })

    return entry
}