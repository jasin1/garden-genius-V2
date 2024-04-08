import './plantdetail.css';
import Navigation from "../../components/Navigation/Navigation.jsx";
import PlantCard from "../../components/PlantCard/PlantCard.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import WateringIcon from "../../assets/icon-watering.svg";
import SunIcon from "../../assets/icon-sun.svg";
import CycleIcon from "../../assets/icon-cycle.svg";
import Tangerine from "../../assets/dummie-plant-02.jpg";
import plantImg01 from '../../assets/dummie-plant-01.jpg';
import plantImg05 from '../../assets/dummie-plant-05.jpg';
import plantImg03 from '../../assets/dummie-plant-03.jpg';
import plantImg04 from '../../assets/dummie-plant-04.jpg';


function plantdetail() {
    return (
        <main>
            <article>
                <Navigation/>
                <section className="green-bg">
                    <div className="plant-detail-wrapper">
                        <div className="plant-top">
                            <div className="back-btn">Back</div>
                            <button className="btn-orange">Add to your collection</button>
                        </div>
                        <div className="plant-detail-container">
                            <div className="plant-image-wrapper">
                                <img src={Tangerine} alt="main plant image"/>
                            </div>
                            <div className="plant-detail-content">
                                <h1>Tangerine</h1>
                                <p><span className="plant-sub-name">Citrus reticulata</span></p>
                                <p><span className="plant-alsoknown">
                                    Also Known As - American Persimmon, Eastern Persimmon
                                </span>
                                </p>

                                <div className="plant-txt">
                                    <p>
                                        Id sit odio ac integer tincidunt pellentesque id consectetur consequat.
                                        Elementum
                                        sodales et ut euismod lobortis faucibus vivamus sit magnis. Mi laoreet
                                        scelerisque
                                        scelerisque non amet purus. Penatibus ac nec eu vel malesuada nunc. Malesuada
                                        egestas quis ultrices nibh non sapien ut. Semper nisi dictumst sollicitudin
                                        suspendisse sed tortor tortor dui egestas.<br/><br/>

                                        Lacus amet urna egestas orci rhoncus feugiat. A et ut tincidunt tempor cursus.
                                        Consectetur libero facilisi hac massa neque praesent dui. Duis blandit ornare
                                        faucibus orci in varius amet. Aliquam sed eget elit eu mattis.
                                    </p>
                                </div>

                                <div className="plant-features">
                                    <div className="plant-feature">
                                        <div className="plant-icon-wrapper">
                                            <img src={WateringIcon} alt=""/>
                                        </div>
                                        <div className="plant-feature-txt-wrapper">
                                            <p><span className="plant-feature-name">Watering</span></p>
                                            <p><span className="plant-feature-option">Frequent</span></p>
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
                                            <p><span className="plant-feature-option">Perennial</span></p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
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
                            <PlantCard
                                plantName="Plant Name"
                                subName="a long plant subname weet je wel"
                                image={plantImg05}
                            />
                            <PlantCard
                                plantName="Plant Name"
                                subName="a long plant subname weet je wel"
                                image={plantImg03}
                            />
                            <PlantCard
                                plantName="Plant Name"
                                subName="a long plant subname weet je wel"
                                image={plantImg04}
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