import {CharacterType} from "@/app/types/character.type.ts";

export interface LocationType {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: CharacterType[];
    url: string;
    created: string;
}
