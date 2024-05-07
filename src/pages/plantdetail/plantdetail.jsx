import './plantdetail.css';
import Navigation from "../../components/Navigation/Navigation.jsx";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {PlantContext} from '../../context/PlantContext.jsx';
import axios from "axios";
// import { useHistory } from 'react-router-dom';
import Footer from "../../components/Footer/Footer.jsx";
import WateringIcon from "../../assets/icon-watering.svg";
import SunIcon from "../../assets/icon-sun.svg";
import CycleIcon from "../../assets/icon-cycle.svg";
import placeholderImage from '../../assets/placeholder-plant.jpg';
import Arrow from "../../components/Arrow/Arrow.jsx";



function Plantdetail() {
    const {likedPlantIds, likePlant, unlikedPlant} = useContext(PlantContext);
    const {id} = useParams();
    const [plant, setPlant] = useState();
    const [error, setError] = useState();
    const numericId = parseInt(id, 10);
    const isLiked = likedPlantIds.includes(numericId);
    const [buttonText, setButtonText] = useState(isLiked ? "Remove from collection" : "Add to collection");

    // const history = useHistory();


    console.log('gelikte planten', likedPlantIds);

    useEffect(() => {
        async function fetchDetailData() {
            try {
                const response = await axios.get(`https://perenual.com/api/species/details/${id}?key=sk-nmqA66236192cd6f53490`);
                console.log('detail response', response.data);
                setPlant(response.data);
            } catch (e) {
                console.error(e);
                setError('Het ophalen van plant detail data is mislukt')
            }
        }

        fetchDetailData();
        console.log('huidige id ', id);

    }, [id]);

    const handleButtonClick = () => {
        if (isLiked) {
            unlikedPlant(numericId);
            setButtonText("Add to collection");
        } else {
            likePlant(numericId);
            setButtonText("Remove from collection");
        }
    }

    // const goBack = ()=>{
    //     history.goBack();
    // }


    return (
        <main>
            <article>
                <Navigation/>
                <section className="green-bg">
                    {error ? (
                        <p>{error}</p>) : (
                        <div className="plant-detail-wrapper">
                            <div className="plant-top">
                                <button className="back-btn btn-arrow">
                                    <Arrow pathClassName="svg-path-color"/>
                                    <p>Back</p>
                                </button>

                                <button className={isLiked ? 'btn-grey' : 'btn-orange'}
                                        onClick={handleButtonClick}>{buttonText}</button>
                            </div>
                            {plant && (
                                <div className="plant-detail-container">
                                    <div className="plant-image-wrapper">
                                        <img
                                            src={plant && plant.default_image ? plant.default_image.medium_url : placeholderImage}
                                            alt="main plant image"/>
                                    </div>
                                    <div className="plant-detail-content">
                                        <div className="plant-header">
                                            <h1>{plant.common_name}</h1>
                                            <p><span className="plant-sub-name">{plant.scientific_name}</span></p>
                                        </div>
                                        <div className="plant-txt">
                                            <p>
                                                {plant.description}
                                            </p>
                                        </div>

                                        <div className="plant-features">
                                            <div className="plant-feature">
                                                <div className="plant-icon-wrapper">
                                                    <img src={WateringIcon} alt=""/>
                                                </div>
                                                <div className="plant-feature-txt-wrapper">
                                                    <p><span className="plant-feature-name">Watering</span></p>
                                                    <p><span className="plant-feature-option">{plant.watering}</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="plant-feature">
                                                <div className="plant-icon-wrapper">
                                                    <img src={SunIcon} alt=""/>
                                                </div>
                                                <div className="plant-feature-txt-wrapper">
                                                    <p><span className="plant-feature-name">Sun</span></p>
                                                    <p>
                                                        {plant.sunlight.map((item, index) => (
                                                            <span key={index} className="plant-feature-option">
                                                    {item}
                                                                {index < plant.sunlight.length - 1 && ", "}
                                                </span>

                                                        ))}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="plant-feature">
                                                <div className="plant-icon-wrapper">
                                                    <img src={CycleIcon} alt=""/>
                                                </div>
                                                <div className="plant-feature-txt-wrapper">
                                                    <p><span className="plant-feature-name">Cycle</span></p>
                                                    <p><span className="plant-feature-option">{plant.cycle}</span></p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </section>
                {/*<section className="green-bg">*/}
                {/*    <div className="container">*/}
                {/*        <h2>Other Plants</h2>*/}
                {/*        <div className="grid">*/}
                {/*            <PlantCard*/}
                {/*                plantName="Plant Name"*/}
                {/*                subName="a long plant subname weet je wel"*/}
                {/*                image={plantImg01}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</section>*/}
                <Footer/>
            </article>
        </main>
    )
}

export default Plantdetail;