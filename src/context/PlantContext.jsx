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
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("user_plants")
          .select("plants(*)")
          .eq("user_id", user.id);

        if (error) throw error;

        const plants = data.map((item) => item.plants);
        setSavedPlants(plants);
        localStorage.setItem("savedPlants", JSON.stringify(plants));
      } catch (err) {
        console.error("Error fetching saved plants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPlants();
  }, [user]);

  const savePlant = async (plant) => {
    if (!user) return;
    const { perenual_id, name } = plant;

    try {
      const { data: existingPlant, error: plantCheckError } = await supabase
        .from("plants")
        .select("*")
        .eq("perenual_id", perenual_id)
        .single();

      if (plantCheckError && plantCheckError.code !== "PGRST116") {
        throw plantCheckError;
      }

      if (!existingPlant) {
        const { error: plantInsertError } = await supabase
          .from("plants")
          .insert([
            {
              perenual_id,
              name,
            },
          ]);

        if (plantInsertError) throw plantInsertError;
      }

      const { error: userPlantInsertError } = await supabase
        .from("user_plants")
        .insert([
          {
            user_id: user.id,
            plant_id: perenual_id,
          },
        ]);

      if (userPlantInsertError) throw userPlantInsertError;
      const updatedPlants = [...savedPlants, plant];
      setSavedPlants(updatedPlants);
      localStorage.setItem("savedPlants", JSON.stringify(updatedPlants));

      console.log("Plant saved successfully!");
    } catch (error) {
      console.error("Error saving plant:", error.message);
    }
  };

  const removeSavedPlant = async (plantId) => {
    if (!user) return;
    const previousPlants = [...savedPlants];

    try {
      const updatedPlants = savedPlants.filter((plant) => plant.id !== plantId);
      setSavedPlants(updatedPlants);
      localStorage.setItem("savedPlants", JSON.stringify(updatedPlants));

      const { error } = await supabase
        .from("user_plants")
        .delete()
        .eq("user_id", user.id)
        .eq("plant_id", plantId);

      if (error) throw error;

      console.log("Plant removed from saved list");
    } catch (err) {
      console.error("Error removing saved plant:", err);
      setSavedPlants(previousPlants);
      localStorage.setItem("savedPlants", JSON.stringify(previousPlants));
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
