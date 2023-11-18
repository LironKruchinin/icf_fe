import { GameRole } from "./User";

export interface GroupData {
    _id?: string;
    groupName?: string;
    groupDescription?: string;
    createdAt?: number;
    users?: User[];
}

export interface MissionGroupData extends GroupData {
    attendees?: number;
    numberOfAttendess?: number;
    votes?: {
        userId: string;
        vote: boolean;
        _id: string;
    }[]
}

interface User {
    _id: string;
    first_name: string;
    user_name: string[];
    gameRole: GameRole[];
}