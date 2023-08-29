import { GameRole } from "./User";

export interface GameRoleData {
    _id?: string;
    gameRoleName: string;
    gameRoleDescription: string;
    createdAt?: number;
    users?: User[];
}

interface User {
    _id: string;
    first_name: string;
    user_name: string[];
    gameRole: GameRole[];
}