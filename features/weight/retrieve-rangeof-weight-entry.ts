import { getWeightEntryBetween, getWeightEntryForDate, initDb } from "@/provider/db";
import { WeightEntry } from "./types/weight-entry";
import { CustomRange, DateRange } from "./types/date-range";
import dayjs from "dayjs";

export async function retrieveRangeofWeightEntry(params: DateRange): Promise<WeightEntry[]> {
    let entries: WeightEntry[] = []
    let fromDate: Date 
    let toDate: Date 
    if(params.type == 'custom') {
        console.log('custom filter ', params)
        fromDate = params.from
        toDate   = params.to
    } else {
        console.log('predefined filter', params)
        const {from, to} = calculateDateRange(params.range)
        fromDate = from
        toDate   = to
    }
    await initDb()
        .then(async () => {
            console.log("retrieve from ", fromDate, " to ", toDate)
            const results = await getWeightEntryBetween(fromDate, toDate);
            entries = results as WeightEntry[];
            
            console.log("finding rangeof entries", entries)
        })  
        .catch(e => {
            console.log("error retrieving ", e)
        })

    return entries
}

function calculateDateRange(range: string): {from: Date, to: Date} {
    const now = dayjs()
    switch(range) {
        case "1w":
            return {from: now.subtract(7, 'days').toDate(), to: now.toDate()}
        case "2w":
            return {from: now.subtract(14, 'days').toDate(), to: now.toDate()}
        case "1m":
            return {from: now.subtract(1, 'months').toDate(), to: now.toDate()}
        case "3w":
            return {from: now.subtract(3, 'months').toDate(), to: now.toDate()}
        case "1y":
            return {from: now.subtract(1, 'years').toDate(), to: now.toDate()}
    }
    return {from: now.toDate(), to: now.toDate()}
}
