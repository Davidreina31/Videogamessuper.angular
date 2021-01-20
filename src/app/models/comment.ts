import { User } from "./user";

export class Comment {
    public commentId: number;
    public note: number;
    public commentText: string;
    public commentDate: Date;
    public userId: number;
    public plateform_videoGameId: number;
    public user: User;
}
