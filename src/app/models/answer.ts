import { User } from "./user";

export class Answer {
    public id : number;
    public answerText: string;
    public answerDate: Date;
    public userId: number;
    public questionId: number;
    public user: User;
}
