import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axiosInstance from "@/shared/libs/axios.ts";
import EpisodesList from "@/shared/ui/episodesList";
import Loader from "@/shared/ui/loader";
import {EpisodeType} from "@/app/types/episode.type.ts";

const CharactersId = () => {
    const{id}=useParams()
    const[episodes, setEpisodes]=useState<EpisodeType[]>([])

    useEffect(()=>{
        fetchCharactersId()
    }, [])

    const fetchCharactersId = async():Promise<void> =>{
        try {
            const response = await axiosInstance(`/character/${id}`)
            const episodeUrl = response.data.episode;
            const episodeFetch= episodeUrl.map((episode)=>axiosInstance(episode))
            const episodeResponse=await Promise.all(episodeFetch)
            const episodeMap=episodeResponse.map((episode)=>episode.data)

            setEpisodes(episodeMap)

        }
        catch (e){
            console.log(e)
        }
    }

    return (
        <div>
            {episodes.length > 0
                ? <EpisodesList episodes={episodes}/>
                : <Loader/>
            }
        </div>
    );
};

export default CharactersId;