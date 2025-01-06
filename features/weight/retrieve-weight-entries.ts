import { getAllWeightEntries, initDb } from "../../provider/db";
import { WeightEntry } from "./types/weight-entry";

export async function retrieveWeightEntries(): Promise<WeightEntry[]> {
    let entries: WeightEntry[] = []
    await initDb()
        .then(async () => {
            const results = await getAllWeightEntries();
            entries = results as WeightEntry[];
            
            console.log("finding entries", entries.length)
        })  
        .catch(e => {
            console.log("error retrieving ", e)
        })

    return entries
}