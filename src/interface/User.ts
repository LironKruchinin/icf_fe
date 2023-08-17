export interface UserData {
    _id: string | null;
    email: string | null;
    password: string | null;
    first_name: string | null;
    user_name: string | null;
    phone_number: string | null;
    created_at: number | null;
    updated_at: number | null;
    salt: string | null;
    roles: [string] | null;
    gameRole: [string] | null;
}[]