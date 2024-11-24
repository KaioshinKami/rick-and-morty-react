import React, {useEffect, useState} from 'react';
import axiosInstance from "@/shared/libs/axios.ts";
import {useParams} from "react-router-dom";
import CharactersList from "@/shared/ui/charactersList";
import Loader from "@/shared/ui/loader";
import {CharacterType} from "@/app/types/character.type.ts";

const LocationsId = () => {
    const {id}=useParams()
    const [characters, setCharacters]=useState<CharacterType[]>([])

    useEffect(()=>{
        fetchLocationsId()
    }, [])

    const fetchLocationsId = async ():Promise<void> =>{
        try {
            const response = await axiosInstance.get(`/location/${id}`)
            const residents = response.data.residents
            const fetchResidents = residents.map((resident) => axiosInstance(resident))
            const residentResponse= await Promise.all(fetchResidents)
            const dataMap=residentResponse.map((data)=>data.data)

            setCharacters(dataMap)
        }
        catch (e) {
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

export default LocationsId;