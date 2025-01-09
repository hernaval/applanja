export type LiteralRange =  "1w" | "2w" | "1m" | "3m" | "1y" | "all"

export type PredefinedRange = {
    type : 'predefined',
    range: LiteralRange
} 

export type CustomRange = {
    type: 'custom'
    from: Date 
    to: Date 
}

export type DateRange = PredefinedRange | CustomRange