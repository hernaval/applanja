export interface WeightEntry {
    id?: number
    date: Date 
    value: number 
    note?: string
    

    //TODO transform to class
    //TODO add function to check if empty i.e. all attributes are empty
}

export type WeightEntryHistory = WeightEntry & {
    deltaN: number // the difference between previous weight and current weight
    deltaP: number // same but percentage
}