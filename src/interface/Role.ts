import { GameRole } from "./User";

export interface RoleData {
    _id?: string;
    roleName: string;
    roleDescription: string;
    createdAt?: number;
    users?: User[];
}

interface User {
    _id: string;
    first_name: string;
    user_name: string[];
    gameRole: GameRole[];
}