import {createContext, useState} from "react";
// import axios from "axios";

export const PlantContext = createContext({});

function PlantContextProvider({children}) {
    const [LikedPlantIds, setLikedPlantIds] = useState([]);

    const likePlant = (plantId) => {
        setLikedPlantIds((prevLikedPlantIds) => [...prevLikedPlantIds, plantId]);
    };

    const unlikedPlant = (plantId) => {
        setLikedPlantIds((prevLikedPlantIds) => prevLikedPlantIds.filter((id) => id !== plantId));
    };



    const data = {
        likedPlantIds: LikedPlantIds,
        likePlant: likePlant,
        unlikedPlant: unlikedPlant,
    };


    return (
        <PlantContext.Provider value={data}>
            {children}
        </PlantContext.Provider>
    )
}

export default PlantContextProvider;