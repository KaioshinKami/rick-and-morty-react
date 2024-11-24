import {Status} from "@/app/enums/status.enum.ts";
import {Gender} from "@/app/enums/gender.enum.ts";
import {EpisodeType} from "@/app/types/episode.type.ts";


export interface CharacterType {
    id: number;
    name: string;
    status: Status;
    species: string;
    type: string;
    gender: Gender;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: EpisodeType[];
    url: string;
    created: string;
}
