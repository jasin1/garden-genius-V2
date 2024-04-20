import './PlantCard.css';
// import plantImg from '../../assets/dummie-plant-01.jpg'

function PlantCard({plantName, subName, image, id}) {
    console.log("Plant name:", plantName);
    console.log("Sub name:", subName);
    console.log("Image:", image);
    return (
        <div className="card" key={id}>
            <div className="card-img-wrapper">
                <img src={image} alt=""/>
            </div>
            <div className="card-description">
                <div className="plant-title">
                    <h3>{plantName}</h3>
                    <p>{subName}</p>
                </div>

                <div className="plant-save">
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.94668e-08 5.40093C-0.000248434 3.95126 0.582385 2.56238 1.61681 1.54676C2.65124 0.531135 4.05058 -0.0259184 5.5 0.000927231C7.21732 -0.00819277 8.85599 0.720102 10 2.00093C11.144 0.720102 12.7827 -0.00819277 14.5 0.000927231C15.9494 -0.0259184 17.3488 0.531135 18.3832 1.54676C19.4176 2.56238 20.0002 3.95126 20 5.40093C20 10.7569 13.621 14.8009 10 18.0009C6.387 14.7739 7.94668e-08 10.7609 7.94668e-08 5.40093Z" fill="#BCBCBC"/>
                    </svg>
                </div>
            </div>
        </div>
    );

}

export default PlantCard;