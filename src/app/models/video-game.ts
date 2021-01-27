import { Developer } from "./developer";
import { Plateform } from "./plateform";
import { Publisher } from "./publisher";

export class VideoGame {
    public videoGameId: number;
    public name: string;
    public description: string;
    public releaseDate: Date;
    public developerId: number;
    public publisherId: number;
    public jacketUrl: string;
    public plateforms: Plateform[];
    public developer: Developer;
    public publisher: Publisher;
}
