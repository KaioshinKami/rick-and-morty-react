import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axiosInstance from "@/shared/libs/axios.ts";
import CharactersList from "@/shared/ui/charactersList";
import Loader from "@/shared/ui/loader";
import {CharacterType} from "@/app/types/character.type.ts";

const EpisodesId = () => {
    const {id}=useParams()
    const [characters, setCharacters]=useState<CharacterType[]>([])

    useEffect(()=>{
        fetchEpisodesId()
    }, [])

    const fetchEpisodesId = async ():Promise<void> =>{
        try{
            const response = await axiosInstance(`/episode/${id}`);
            const residents = response.data.characters
            const fetchResidents=residents.map((residents)=>axiosInstance(residents))
            const residentResponse=await Promise.all(fetchResidents)
            const dataMap=residentResponse.map((residents)=>residents.data)

            setCharacters(dataMap)
        }
        catch (e){
            console.log(e)
        }
    }

    return (
        <div>
            {characters.length > 0
                ? <CharactersList characters={characters}/>
                : <Loader/>
            }

        </div>
    );
};

export default EpisodesId;