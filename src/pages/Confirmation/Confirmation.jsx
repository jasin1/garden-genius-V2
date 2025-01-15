import "./Confirmation.css";
import { useEffect, useContext } from "react";
import { supabase } from "../../config/supabaseClient";
import { AuthContext } from "../../context/AuthContext.jsx";
import emailIcon from "../../assets/email-icon.svg";

function Confirmation() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function handleConfirmation() {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        const { data, error } = await supabase.auth.verifyOtp({ token });
        if (error) {
          console.error("Error during email verification:", error.message);
        } else {
          console.log("Email verified, user logged in:", data);
        }
      } else {
        console.log("No token found in URL");
      }
    }

    handleConfirmation();
  }, []);

  return (
    <main className="main-confirmation">
      <article>
        <section>
          <div className="confirm-wrapper">
            <div className="confirm-header">
              <div className="icon-wrapper">
                <img src={emailIcon} alt="GardenGenius main logo" />
              </div>
                <h1 className="color-orange">Just one more step...</h1>
              <div className="header-txt">
                Thank you for signing up <span className="font-bold">{user.user_metadata.username}</span> , Please verify your email address, we&#39;ve sent a confirmation email to: <span className="confirm-highlight-txt">{user.email}</span><br/><br/>
                After receiving the email follow the link provided to complete your registration.               
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}

export default Confirmation;
