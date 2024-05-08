import {createContext, useState, useContext} from "react";
import {AuthContext} from "./AuthContext.jsx";
// import axios from "axios";

export const PlantContext = createContext({});

function PlantContextProvider({children}) {
    const [LikedPlantIds, setLikedPlantIds] = useState([]);
    const {user, updateUserInfo} = useContext(AuthContext);


    const likePlant = (plantId) => {
        setLikedPlantIds((prevLikedPlantIds) => {
            const updatedLikedPlantIds = [...prevLikedPlantIds, plantId];

            updateUserInfo(user.username, {likedPlantIds: updatedLikedPlantIds});
            return updatedLikedPlantIds;
        });

    };

    const unlikedPlant = (plantId) => {
        setLikedPlantIds((prevLikedPlantIds) => {
           const updatedLikedPlantIds = prevLikedPlantIds.filter((id) => id !== plantId);

            updateUserInfo(user.username, {likedPlantIds: updatedLikedPlantIds});
            return updatedLikedPlantIds;
        });

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