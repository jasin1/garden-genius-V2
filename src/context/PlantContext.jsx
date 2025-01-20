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
          .select("plants(*)") // Perform a join with the plants table
          .eq("user_id", user.id);

        if (error) throw error;

        const plants = data.map((item) => item.plants); // Extract plants data from the result
        setSavedPlants(plants);
        // Sync with localStorage
        localStorage.setItem("savedPlants", JSON.stringify(plants));
      } catch (err) {
        console.error("Error fetching saved plants:", err);
        // setError("Failed to load saved plants.");
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
      // LocalStorage update for instant feedback
      const updatedPlants = [...savedPlants, plant];
      setSavedPlants(updatedPlants);
      localStorage.setItem("savedPlants", JSON.stringify(updatedPlants));

      const { data: existingPlant, error: plantCheckError } = await supabase
        .from("plants")
        .select("*")
        .eq("perenual_id", perenual_id)
        .single();

      if (plantCheckError && plantCheckError.code !== "PGRST116") {
        // Handle unexpected errors (PGRST116 = "No rows found")
        throw plantCheckError;
      }

      // Step 2: Insert into plants table if it doesn't exist
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

      // Step 3: Insert into user_plants table
      const { error: userPlantInsertError } = await supabase
        .from("user_plants")
        .insert([
          {
            user_id: user.id,
            plant_id: perenual_id,
          },
        ]);

      if (userPlantInsertError) throw userPlantInsertError;

      console.log("Plant saved successfully!");
    } catch (error) {
      console.error("Error saving plant:", error.message);
    }
  };

  const removeSavedPlant = async (plantId) => {
    if (!user) return;

    try {
      // LocalStorage update for instant feedback
      const updatedPlants = savedPlants.filter((plant) => plant.id !== plantId);
      setSavedPlants(updatedPlants);
      localStorage.setItem("savedPlants", JSON.stringify(updatedPlants));

      const { error } = await supabase
        .from("user_plants")
        .delete()
        .eq("user_id", user.id)
        .eq("plant_id", plantId);

      if (error) throw error;

      // setSavedPlants((prevPlants) =>
      //   prevPlants.filter((plant) => plant.id !== plantId),
      // );
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
