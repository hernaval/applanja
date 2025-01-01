import * as SQLiteDatabase from "expo-sqlite";
import { WeightEntry } from "../features/weight/types/weight-entry";

async function initDb() {
    console.log("init db")
    const db = await SQLiteDatabase.openDatabaseAsync('applanja.bd');

    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS WeightEntry (
            id INTEGER PRIMARY KEY NOT NULL, 
            date DATE NOT NULL,
            value INTEGER NOT NULL
        );
    `);
}

async function saveWeightEntry(entry: WeightEntry) {
    console.log(entry.date, entry.value)
    try {

        const db = await SQLiteDatabase.openDatabaseAsync('applanja.bd');
        await db.runAsync(`
            INSERT INTO WeightEntry(date, value) VALUES ('${entry.date}', '${entry.value}');    
        `)
    }catch(e) {
        console.log(e)
    }
}

async function getAllWeightEntries() {
    const db = await SQLiteDatabase.openDatabaseAsync('applanja.bd');

    const entries = db.getAllAsync("select * from WeightEntry")

    return entries
}

export {
    saveWeightEntry,
    initDb,
    getAllWeightEntries
}