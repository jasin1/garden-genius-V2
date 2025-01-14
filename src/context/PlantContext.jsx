import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { supabase } from "../config/supabaseClient.js";

export const PlantContext = createContext({});

function PlantContextProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [savedPlants, setSavedPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchSavedPlants = async () => {
      try {
        const { data, error } = await supabase
          .from("user_plants")
          .select("plant_id")
          .eq("user_id", user.id);

        if (error) throw error;

        const plantIds = data.map((item) => item.plant_id);

        if (plantIds.length > 0) {
          const { data: plants, error: plantsError } = await supabase
            .from("plants")
            .select("*")
            .in("id", plantIds);

          if (plantsError) throw plantsError;

          setSavedPlants(plants);
        } else {
          setSavedPlants([]); 
        }
      } catch (err) {
        console.error("Error fetching saved plants:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchSavedPlants();
  }, [user]);


  const savePlant = async (plantId) => {
    if (!user) return;

    try {
        const { data: existingPlant, error: checkError } = await supabase
            .from("user_plants")
            .select("id")
            .eq("user_id", user.id)
            .eq("plant_id", plantId)
            .single();

        if (checkError && checkError.code !== "PGRST116") throw checkError; // Ignore "no rows found" error

        if (existingPlant) {
            console.log("Plant already saved");
            return;
        } else {
            const { error } = await supabase
                .from("user_plants")
                .insert([{ user_id: user.id, plant_id: plantId, created_at: new Date() }]);

            if (error) throw error;
            console.log("Plant saved successfully");
        }
    } catch (err) {
        console.error("Error saving plant:", err);
    }
};


const removeSavedPlant = async (plantId) => {
    if (!user) return;

    try {
        const { error } = await supabase
            .from("user_plants")
            .delete()
            .eq("user_id", user.id)
            .eq("plant_id", plantId);

        if (error) throw error;

        setSavedPlants((prevPlants) =>
            prevPlants.filter((plant) => plant.id !== plantId)
        );
        console.log("Plant removed from saved list");
    } catch (err) {
        console.error("Error removing saved plant:", err);
    }
};


  const data = {
    savedPlants,
    loading,
    savePlant,
    removeSavedPlant,
  };

  return <PlantContext.Provider value={data}>{children}</PlantContext.Provider>;
}

export default PlantContextProvider;
