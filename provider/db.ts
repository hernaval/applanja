import * as SQLiteDatabase from "expo-sqlite";
import { WeightEntry } from "../features/weight/types/weight-entry";
import dayjs from "dayjs";
type ColumnMigration = {
    name: string 
    script: string 
}

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

    const columnNotExist = async (name: string): Promise<boolean> => {
            const sql = `
            select 1 from pragma_table_info('WeightEntry')
            where name='${name}'
            `
            const result = await db.getFirstSync(sql)

            return result == null 
    }

    const MIGRATION_1 = `
        ALTER TABLE WeightEntry add column note varchar(100);
    `

    const newColumnMigrations: ColumnMigration[] = [{
        name: 'note',
        script: MIGRATION_1
    }]

    for(let migration of newColumnMigrations) {
        if(await columnNotExist(migration.name)) {
            await db.execAsync(migration.script)
        }
    }
}

async function saveWeightEntry(entry: WeightEntry) {
    console.log(entry.date, entry.value)
    try {
        const db = await SQLiteDatabase.openDatabaseAsync('applanja.bd');
        await db.runAsync(`
            INSERT INTO WeightEntry(date, value, note) VALUES ('${dayjs(entry.date).format("DD-MM-YYYY")}', '${entry.value}', '${entry.note}');    
        `)
    }catch(e) {
        console.log(e)
    }
}

async function updateWeightEntry(entry: WeightEntry) {
    try {
        const db = await SQLiteDatabase.openDatabaseAsync('applanja.bd');
        await db.runAsync(`
            UPDATE WeightEntry set value = '${entry.value}', note = '${entry.note}';    
        `)
    }catch(e) {
        console.log(e)
    }
}

async function getAllWeightEntries() {
    const db      = await SQLiteDatabase.openDatabaseAsync('applanja.bd');
    const entries = db.getAllAsync("select * from WeightEntry")
    return entries
}

async function getWeightEntryForDate(date: Date) {
    const db    = await SQLiteDatabase.openDatabaseAsync('applanja.bd');
    const entry = db.getFirstAsync(`select * from WeightEntry where date = '${dayjs(date).format("DD-MM-YYYY")}' `)
    return entry
}

export {
    saveWeightEntry,
    updateWeightEntry,
    initDb,
    getAllWeightEntries,
    getWeightEntryForDate
}