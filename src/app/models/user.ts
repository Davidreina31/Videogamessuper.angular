export class User {
    public userId: number;
    public userName: string;
    public email: string;
    public passwordHash: string;
    public Admin: boolean;
    public deletedDate?: Date;
}
