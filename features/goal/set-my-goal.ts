import { initDb, saveGoal } from "@/provider/db";
import { Goal } from "./types/goal";

export async function setMyGoal(goal: Goal): Promise<void> {
    try {
        await initDb()
        await saveGoal(goal) 
        
    }
        catch(e) {
            console.error(e)
            throw e
    }
}