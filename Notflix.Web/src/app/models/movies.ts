export enum category{
    Unknown,
    Action,
    Comedy,
    Drama,
    SciFi,
    Romance,
}

export interface Movie {
    Id : number,
    Title : string,
    Category : category,
    Rating : number
}