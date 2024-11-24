import React, {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "@/app/layout/default.tsx";
import Loader from "@/shared/ui/loader";
import LocationsId from "@/pages/locations/[id]";
import EpisodesId from "@/pages/episodes/[id]";
import CharactersId from "@/pages/characters/[id]";



const Episodes = React.lazy(() => import('@/pages/episodes/index.tsx'))
const Characters = React.lazy(() => import('@/pages/characters/index.tsx'))
const Locations = React.lazy(() => import('@/pages/locations/index.tsx'))


const App = () => {
    return (
        <Suspense fallback={<Loader/>}>
            <DefaultLayout>
                <Routes>
                    <Route path="/" element={<Episodes/>}/>
                    <Route path="/characters" element={<Characters/>}/>
                    <Route path="/locations" element={<Locations/>}/>
                    <Route path="locations/:id" element={<LocationsId/>}/>
                    <Route path="episode/:id" element={<EpisodesId/>}/>
                    <Route path={"/characters/:id"} element={<CharactersId/>}/>
                </Routes>
            </DefaultLayout>
        </Suspense>
    );
};

export default App;