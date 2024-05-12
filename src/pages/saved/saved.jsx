import './saved.css';
import Navigation from "../../components/Navigation/Navigation.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import PlantCard from "../../components/PlantCard/PlantCard.jsx";
import {PlantContext} from '../../context/PlantContext.jsx';
import Hero3 from "../../assets/hero-bg-03.jpg";
import {useState, useEffect, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";

function Saved() {

    const {likedPlantIds} = useContext(PlantContext);
    const [savedPlants, setSavedPlants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const {getUserInfo} = useContext(AuthContext);


    console.log('Inhoud Plant context in saved page', likedPlantIds);
    // console.log('saved plants by user', user.info);

    // useEffect(() => {
    //     const fetchSavedPlants = async () => {
    //         try {
    //             const userInfo = await getUserInfo();
    //             console.log("User Info in saved page:", userInfo);
    //             setIsLoading(true);
    //             if (!likedPlantIds || likedPlantIds.length === 0) {
    //                 setSavedPlants([]);
    //                 setIsLoading(false);
    //                 return;
    //             }
    //
    //             const plantIds = likedPlantIds;
    //             console.log("Plant IDs:", plantIds);
    //
    //
    //             const plantRequests = plantIds.map((id) =>
    //                 axios.get(`https://perenual.com/api/species/details/${id}?key=sk-nmqA66236192cd6f53490`));
    //
    //             const responses = await Promise.all(plantRequests);
    //             console.log("API responses:", responses);
    //
    //             const plantData = responses.map((response) => response.data);
    //             console.log("Plant data:", plantData);
    //
    //             setSavedPlants(plantData);
    //             setIsLoading(false);
    //         } catch (error) {
    //             console.log('Error fetching saved plants: ', error);
    //             setIsLoading(false);
    //         }
    //     };
    //
    //     fetchSavedPlants();
    //
    // }, [likedPlantIds]);

    useEffect(() => {
        const fetchSavedPlants = async () => {
            try {
                const userInfo = await getUserInfo();
                console.log("User Info in saved page:", userInfo);
                setIsLoading(true);

                // if (!userInfo || Array.isArray(userInfo)) {
                //     setSavedPlants([]);
                //     setIsLoading(false);
                //     return;
                // }

                // const plantIds = userInfo.split(',');
                // console.log("Plant IDs:", userInfo);


                const plantRequests = userInfo.map((id) =>
                    axios.get(`https://perenual.com/api/species/details/${id}?key=sk-nmqA66236192cd6f53490`));

                const responses = await Promise.all(plantRequests);
                console.log("API responses saved page:", responses);

                const plantData = responses.map((response) => response.data);
                console.log("Plant data saved page:", plantData);

                setSavedPlants(plantData);
                setIsLoading(false);
            } catch (error) {
                console.log('Error fetching saved plants: ', error);
                setIsLoading(false);
            }
        };
        fetchSavedPlants();


    }, [getUserInfo]);


    return (
        <main>
            <article>
                <Navigation/>
                <header className="hero">
                    <img src={Hero3} alt="Hero image for the profile page"/>
                </header>
                <section className="suggested">
                    <div className="container">
                        <h2>Saved Plants</h2>
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : (
                            <div className="grid">
                                {savedPlants && savedPlants.map((plant) => (
                                    <PlantCard
                                        key={plant.id}
                                        plantName={plant.common_name}
                                        subName={plant.scientific_name.join(", ")}
                                        image={plant.default_image && plant.default_image.small_url}
                                        id={plant.id} // Hier voegen we de plant id toe
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                </section>
                <Footer/>
            </article>
        </main>
    );

}

export default Saved;