import { Answer } from "./answer";
import { User } from "./user";

export class Question {
    public questionId: number;
    public questionText: string;
    public questionDate: Date;
    public userId: number;
    public plateform_videoGameId: number;
    public user: User;
    public answers : Answer[]
}
