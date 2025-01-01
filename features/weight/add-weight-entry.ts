import { getAllWeightEntries, initDb, saveWeightEntry } from "../../provider/db";
import { WeightEntry } from "./types/weight-entry";

export async function addWeightEntry(entry: WeightEntry): Promise<void> {
    initDb()
    .then(() => 
        saveWeightEntry(entry)
    )
    .then(() => {
        getAllWeightEntries()
            .then(v => console.log("all entries ", v))
    })
    .catch(e => {
            console.error(e)
    }) 
    return ;
}