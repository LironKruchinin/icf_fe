import { UserData } from "./User";

export interface EventData {
    _id?: string;
    eventName: string;
    eventDescription: string;
    eventDate: number;
    eventCloseDate?: number;
    createdAt?: number;
    users?: UserData[];
}
