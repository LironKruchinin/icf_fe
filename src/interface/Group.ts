import { GameRole } from "./User";

export interface GroupData {
    _id?: string;
    groupName: string;
    groupDescription: string;
    createdAt?: number;
    users?: User[];
}

interface User {
    _id: string;
    first_name: string;
    user_name: string[];
    gameRole: GameRole[];
}