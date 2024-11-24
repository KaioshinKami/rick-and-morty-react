import {CharacterType} from "@/app/types/character.type.ts";

export interface EpisodeType {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: CharacterType[];
    url: string;
    created: string
}