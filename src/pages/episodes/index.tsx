import { useEffect, useState } from "react";
import { EpisodeType } from "@/app/types/episode.type.ts";
import axiosInstance from "@/shared/libs/axios.ts";
import React from "react";
import Pagination from "@/shared/ui/pagination";
import {Link} from "react-router-dom";
import EpisodesList from "@/shared/ui/episodesList";

const Episodes = () => {
    const itemsPerPage = 20;
    const [episodes, setEpisodes] = useState<EpisodeType[]>([]);
    const [totatCount, setTotatCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        fetchEpisodes();
    }, [currentPage]);

    const fetchEpisodes = async ():Promise<void> => {
        const response = await axiosInstance.get("/episode", {
            params: {page: currentPage},
        });
        setEpisodes(response.data.results);
        setTotatCount(response.data.info.count);
    };

    return (
        <div>
            <EpisodesList
                itemsPerPage={itemsPerPage}
                episodes={episodes}
                currentPage={currentPage}
                totatCount={totatCount}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default Episodes;
