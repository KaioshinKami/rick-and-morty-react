import { useEffect, useState } from "react";
import axiosInstance from "@/shared/libs/axios.ts";
import Pagination from "@/shared/ui/pagination";
import Button from "@/shared/ui/button/Button.tsx";
import '@/shared/ui/button/index.scss';
import React from "react";
import {Link} from "react-router-dom";
import {LocationType} from "@/app/types/location.type.ts";

const Locations = () => {
    const itemsPerPage = 20;
    const [locations, setLocations] = useState<LocationType[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        fetchLocations();
    }, [currentPage]);

    const fetchLocations = async ():Promise<void> => {
        try {
            const response = await axiosInstance.get("/location", {
                params: {page: currentPage},
            });
            setLocations(response.data.results);
            setTotalCount(response.data.info.count);
        } catch (e) {
            console.log(e)
        }
    };


    return (
        <React.Fragment>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Locations</h1>
                {locations.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {locations.map((location) => (
                            <div
                                key={location.id}
                                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
                            >
                                <h2 className="text-lg font-semibold text-gray-800">{location.id}. {location.name}</h2>
                                <p className=" text-gray-600">Type: {location.type}</p>

                                <Link to={`/locations/${location.id}`}>
                                    <Button className="a-button--primary a-button--sm">Details</Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No locations found.</p>
                )}


                <Pagination
                    totalItems={totalCount}
                    paginate={setCurrentPage}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                />
            </div>
        </React.Fragment>
    );
};

export default Locations;
