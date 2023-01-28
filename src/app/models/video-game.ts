import { Comment } from "./comment";
import { Developer } from "./developer";
import { Plateform } from "./plateform";
import { Plateform_VideoGame } from "./plateform_VideoGame";
import { Publisher } from "./publisher";

export class VideoGame {
    public id: number;
    public name: string;
    public description: string;
    public releaseDate: Date;
    public developerId: number;
    public publisherId: number;
    public jacketUrl: string;
    public plateformVideoGame: Plateform_VideoGame[];
    public developer: Developer;
    public publisher: Publisher;
    public comments: Comment[];
}
