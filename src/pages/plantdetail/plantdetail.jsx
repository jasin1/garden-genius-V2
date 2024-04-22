import './plantdetail.css';
import Navigation from "../../components/Navigation/Navigation.jsx";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import PlantCard from "../../components/PlantCard/PlantCard.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import WateringIcon from "../../assets/icon-watering.svg";
import SunIcon from "../../assets/icon-sun.svg";
import CycleIcon from "../../assets/icon-cycle.svg";
import Tangerine from "../../assets/dummie-plant-02.jpg";
import plantImg01 from '../../assets/dummie-plant-01.jpg';
// import plantImg05 from '../../assets/dummie-plant-05.jpg';
// import plantImg03 from '../../assets/dummie-plant-03.jpg';
// import plantImg04 from '../../assets/dummie-plant-04.jpg';


function plantdetail() {
    const {id} = useParams();
    const [plant, setPlant] = useState();
    const [error, setError] = useState();

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

    }, [id]);

    return (
        <main>
            <article>
                <Navigation/>
                <section className="green-bg">
                    {error ? (
                        <p>{error}</p>):(
                    <div className="plant-detail-wrapper">
                        <div className="plant-top">
                            <div className="back-btn">Back</div>
                            <button className="btn-orange">Add to your collection</button>
                        </div>
                        {plant && (
                        <div className="plant-detail-container">
                            <div className="plant-image-wrapper">
                                <img src={plant.default_image.medium_url} alt="main plant image"/>
                            </div>
                            <div className="plant-detail-content">
                                <h1>{plant.common_name}</h1>
                                <p><span className="plant-sub-name">{plant.scientific_name}</span></p>
                                <p><span className="plant-alsoknown">
                                    Also Known As - American Persimmon, Eastern Persimmon
                                </span>
                                </p>

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
                                            <p><span className="plant-feature-option">{plant.watering}</span></p>
                                        </div>
                                    </div>

                                    <div className="plant-feature">
                                        <div className="plant-icon-wrapper">
                                            <img src={SunIcon} alt=""/>
                                        </div>
                                        <div className="plant-feature-txt-wrapper">
                                            <p><span className="plant-feature-name">Sun</span></p>
                                            <p><span className="plant-feature-option">Full Sun</span></p>
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
                <section className="green-bg">
                    <div className="container">
                        <h2>Other Plants</h2>
                        <div className="grid">
                            <PlantCard
                                plantName="Plant Name"
                                subName="a long plant subname weet je wel"
                                image={plantImg01}
                            />
                        </div>
                    </div>
                </section>
                <Footer/>
            </article>
        </main>
    )
}

export default plantdetail;