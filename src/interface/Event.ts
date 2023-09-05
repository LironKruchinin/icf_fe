import { GroupData, MissionGroupData } from "./Group";
import { UserData } from "./User";

export interface EventData {
    _id?: string;
    eventName: string;
    eventDescription: string;
    eventDate: number;
    eventCloseDate?: number;
    createdAt?: number;
    users?: UserData[];
    groups?: GroupData[];
    blacklistedUsers?: string[]
}

export interface MissionData extends EventData {
    groups?: MissionGroupData[]
}