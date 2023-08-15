export interface ApplicationData {
    firstName: string;
    lastName?: string;
    discordId: string;
    age: string;
    hoursPlayed: string;
    reason: string;
    prevoiusClan: string;
    amoundOfHours: string;
    freeTimeForPlay: string;
}

export interface FormEntries {
    entryName: string;
    placeholder: string;
    inputType?: string;
    radioOptions?: Options[];
    labelText: string;
    radioButtons?: any
}


interface Options {
    display: string;
    value: string
}