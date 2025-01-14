import './PlantCard.css';
import {Link} from 'react-router-dom';
import {useContext, useEffect, useState, useMemo} from "react";
import placeholderImage from '../../assets/placeholder-plant.jpg';
import LikeButton from "../LikeButton/LikeButton.jsx";
import {PlantContext} from '../../context/PlantContext.jsx';
// import {AuthContext} from "../../context/AuthContext.jsx";


function PlantCard({plantName, subName, image, id}) {

    const {savePlant, removeSavedPlant, savedPlants} = useContext(PlantContext);
    // const {Info} = useContext(AuthContext);
    const [isLiked, setIsLiked] = useState(false);

    const userPlantIds = useMemo(() => savedPlants.map((plant) => plant.id), [savedPlants]);

    useEffect(() => {
        setIsLiked(userPlantIds.includes(id));
    }, [userPlantIds, id]);
    
    

    const handleLikeClick = () => {
        if (!isLiked) {
            savePlant(id);
        } else {
            removeSavedPlant(id);
        }
    }


    return (
        <div className="card-wrapper">
            <div className="plant-save">
                <LikeButton isLiked={isLiked} onClick={handleLikeClick}/>
            </div>
            <Link to={`/plantdetail/${id}`} className="card-link">
                <div className="card" key={id}>
                    <div className="card-img-wrapper">
                        {image ? (
                            <img src={image} alt="Plant Thumbnail"/>
                        ) : (
                            <img src={placeholderImage} alt="placeholder"/>
                        )}
                    </div>
                    <div className="card-description">
                        <div className="plant-title">
                            <h3>
                                {plantName ? plantName : 'No available plant name'}
                            </h3>

                            <p>
                                {subName ? subName : 'No available sub name'}
                            </p>
                            <p>
                                Plant id: {id}
                            </p>
                        </div>

                    </div>
                </div>
            </Link>
        </div>
    );

}


export default PlantCard;