import "./PlantCard.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import placeholderImage from "../../assets/placeholder-plant.jpg";
import LikeButton from "../LikeButton/LikeButton.jsx";
import { PlantContext } from "../../context/PlantContext.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";

function PlantCard({ plantName, subName, image, id, triggerModal }) {
  const { savePlant, removeSavedPlant, savedPlants } = useContext(PlantContext);
  const { user } = useContext(AuthContext);

  const [isLiked, setIsLiked] = useState(() => {
    // Check if the plant is liked from the savedPlants context initially
    return savedPlants.some(
      (plant) => String(plant.perenual_id) === String(id),
    );
  });

  const handleLikeClick = async () => {
    if(!user){
      console.log('user not logged in');
      return;
    }
    const plant = {
        perenual_id: id,
        name: plantName,
    };

    // Update local state for immediate feedback
    setIsLiked(prevState => !prevState);

    try {
        if (isLiked) {
            // Remove from saved plants
            await removeSavedPlant(id);
        } else {
            // Add to saved plants
            await savePlant(plant);
        }
    } catch (err) {
        // Handle error here if needed
        console.error("Error in saving/removing plant:", err);
    }
};

const handleCardClick = (e) =>{
  if(!user){
    e.preventDefault();
    triggerModal();
    console.log("not logged in!")
  }
}

  return (
    <div className="card-wrapper">
      <div className="plant-save">
        <LikeButton isLiked={isLiked} onClick={handleLikeClick} />
      </div>
      <Link to={`/plantdetail/${id}`} className="card-link" onClick={handleCardClick}>
        <div className="card" key={id}>
          <div className="card-img-wrapper">
            {image ? (
              <img src={image} alt="Plant Thumbnail" />
            ) : (
              <img src={placeholderImage} alt="placeholder" />
            )}
          </div>
          <div className="card-description">
            <div className="plant-title">
              <h3>{plantName ? plantName : "No available plant name"}</h3>

              <p>{subName ? subName : "No available sub name"}</p>
              {/* <p>
                                Plant id: {id}
                            </p> */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PlantCard;
