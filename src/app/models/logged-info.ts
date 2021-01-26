export class LoggedInfo {
    userId: number;
    userName: string;
    role: string;
    lifeTime: number;

    constructor(userId: number, userName: string, role: string, lifeTime: number){
        this.userId=userId;
        this.userName=userName;
        this.role=role;
        this.lifeTime=lifeTime;
    }
}
