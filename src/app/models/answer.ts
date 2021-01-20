import { User } from "./user";

export class Answer {
    public answerId : number;
    public answerText: string;
    public answerDate: Date;
    public userId: number;
    public questionId: number;
    public user: User;
}
