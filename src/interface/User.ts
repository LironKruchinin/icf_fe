export interface UserData {
    _id: string | null;
    email: string | null;
    // password: string | null;
    first_name: string | null;
    user_name: string | null;
    phone_number: string | null;
    created_at: number | null;
    updated_at: number | null;
    // salt: string | null;
    roles: Roles[] | null;
    user_color: string;
    gameRole: GameRole[] | null;
    userGroups: UserGroups[];
    missions: MissionsData[] | null;
}[]

export interface MissionsData {
    _id: string,
    eventName: string,
    eventDate: number
}

export interface UserGroups {
    _id: string,
    groupName: string,
    members: string[]
}

export interface GameRole {
    _id: string;
    gameRoleName: string;
}

export interface Roles {
    _id: string;
    roleName: string;
}