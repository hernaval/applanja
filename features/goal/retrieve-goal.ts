import { getMyGoal, getWeightEntryForDate, initDb } from "@/provider/db";
import { Goal } from "./types/goal";

export async function retrieveGoal(): Promise<Goal | null> {
    let goal: Goal |null = null
    await initDb()
        .then(async () => {
            const result = await getMyGoal()
            goal = result as Goal 
            console.log("finding goal", goal)
        })  
        .catch(e => {
            console.log("error retrieving ", e)
        })
    return goal
}