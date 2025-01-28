import "./profile.css";
import Navigation from "../../components/Navigation/Navigation.jsx";
import Hero from "../../assets/profile-hero.jpg";
import Footer from "../../components/Footer/Footer.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useContext, useState, useEffect } from "react";
import Header from "../../components/Headers/Header.jsx";
import { PlantContext } from "../../context/PlantContext.jsx";
import Button from "../../components/Button/Button.jsx";

function Profile() {
  const { user } = useContext(AuthContext);
  const [numSavedPlants, setNumSavedPlants] = useState(0);
  const { savedPlants } = useContext(PlantContext);

  const userName = user ? user.user_metadata.username : null;
  const userEmail = user ? user.email : null;

  useEffect(() => {
    setNumSavedPlants(savedPlants.length);

  }, [user, savedPlants]);

  function sendEmail() {
    const emailLink =
      "mailto:jasin.tairaidrissi@gmail.com?subject=Feedback from Garden Genius";
    const newTab = window.open(); 
    if (newTab) {
      newTab.location.href = emailLink; 
    } else {
      alert(
        "Unable to open a new tab. Please check your popup blocker settings.",
      );
    }
  }

  return (
    <main>
      <article>
        <Navigation />
        <header className="hero">
          <img src={Hero} alt="Hero image for the profile page" />
        </header>
        <section className="suggested flex-align-left">
          <div className="block-top">
            <div className="heading-block">
              {userName ? (
                <Header Tag={"h1"}>Welcome {userName}!</Header>
              ) : (
                <Header Tag="h1">Please log in to view your profile</Header>
              )}
              <p>
                I’m so glad you’re here. This project has been a labor of love,
                built to help you save your favorite plants and explore the
                world of gardening.
                <br /> <br />I hope you enjoy using it as much as I’ve enjoyed
                creating it. Keep saving plants, growing your collection, and
                discovering the joy of gardening, one plant at a time.
              </p>
            </div>
            <div>
              <div className="profile-info-block">
                <div className="info-block">
                  <p>
                    <span className="font-bold">Logged in as</span>
                  </p>
                  <p>
                    <span className="color-secondary-green">{userEmail}</span>
                  </p>
                </div>
                <div className="info-block">
                  <p>
                    <span className="font-bold">Plants saved</span>
                  </p>
                  <p>
                    <span className="color-secondary-green">
                      {numSavedPlants}
                    </span>
                  </p>
                </div>
              </div>
              <div className="btn-container">
                <Button type="button" variant="orange" onClick={sendEmail}>

                  Send feedback
                </Button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </article>
    </main>
  );
}

export default Profile;
