import { Comment } from "./comment";
import { User } from "./user";

export class Report {
    public id: number;
    public reason: string;
    public reportDate: Date;
    public commentId: number;
    public reporterUserId: number;
    public reporterUser: User;
    public comment: Comment;
}
