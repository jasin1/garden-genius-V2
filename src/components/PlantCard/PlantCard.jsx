import './PlantCard.css';
import {Link} from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import placeholderImage from '../../assets/placeholder-plant.jpg';
import LikeButton from "../LikeButton/LikeButton.jsx";
import {PlantContext} from '../../context/PlantContext.jsx';
// import {AuthContext} from "../../context/AuthContext.jsx";


function PlantCard({plantName, subName, image, id}) {

    const {savePlant, removeSavedPlant, savedPlants} = useContext(PlantContext);
    // const {Info} = useContext(AuthContext);
    const [isLiked, setIsLiked] = useState(false);



    useEffect(() => {
        console.log('Saved Plants:', savedPlants);
        console.log('Plant ID:', id);
    
        const isAlreadyLiked = savedPlants.some(plant => String(plant.perenual_id) === String(id));
        console.log('Is Already Liked:', isAlreadyLiked);
        setIsLiked(isAlreadyLiked);
    }, [savedPlants, id]);
    

    const handleLikeClick = () => {
        const plant ={
            perenual_id: id,
            name: plantName,
        };
        if (!isLiked) {
            savePlant(plant);
        } else {
            removeSavedPlant(id);
        }
        setIsLiked(!isLiked);
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