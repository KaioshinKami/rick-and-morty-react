import { useEffect, useState } from "react";
import { CharacterType } from "@/app/types/character.type.ts";
import axiosInstance from "@/shared/libs/axios.ts";
import Loader from "@/shared/ui/loader";
import CharactersList from "../../shared/ui/charactersList";


const Characters = () => {
    const [characters, setCharacters] = useState<CharacterType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchCharacters();
    }, [currentPage]);

    const fetchCharacters = async ():Promise<void> => {
        if (isLoading || currentPage > totalPages) return; // Avoid redundant requests
        setIsLoading(true);

        try {
            const response = await axiosInstance.get("/character", {
                params: { page: currentPage },
            });

            setCharacters((prev) => [...prev, ...response.data.results]);
            setTotalPages(response.data.info.pages);
        } catch (error) {
            console.error("Error fetching charactersList:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleScroll = ():void => {
        const scrollPosition = window.innerHeight + window.scrollY;
        const threshold = document.documentElement.offsetHeight - 100; // Adjust threshold as needed

        if (scrollPosition >= threshold && !isLoading) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isLoading]);

    return (
        <div>
            <CharactersList characters={characters} isLoading={isLoading}/>
        </div>
    );
};

export default Characters;
