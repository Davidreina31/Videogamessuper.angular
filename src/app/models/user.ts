export class User {
    public id: number;
    public userName: string;
    public email: string;
    public passwordHash: string;
    public Admin: boolean;
    public role: string;
    public sub: string;
    public deletedDate?: Date;
}
