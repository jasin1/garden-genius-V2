import "./Modal.css";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useContext, useState } from "react";
import Header from "../../components/Headers/Header.jsx";
import Button from "../../components/Button/Button.jsx";

function Modal({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);

  async function handleFormSubmit(data) {
    try {
      const response = await login(data.email, data.password);
      console.log("Login Response:", response);
      if (response?.error) {
        setError(response.error.message || "login failed"); 
      } else {
        console.log("Login successful:", response);
        onClose(); 
      }
    } catch (error) {
      console.error("Login error: ", error);
      setError("Login failed: " + error.message);
    }
  }

  function handleNavigate() {
    window.location.href = "/register";
  }

  return (
    <div className="main-overlay">
      <div className="modal-wrapper">
        <div className="modal-btn-wrapper">
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <Header className={"intro-welcome-txt"} Tag={"h1"}>
          Login Please
        </Header>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="form-container">
              <label htmlFor="email-filed">
                Email
                <input
                  type="email"
                  id="email-field"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/i,
                  })}
                />
                {errors.email && (
                  <span className="error-text">{errors.email.message}</span>
                )}
              </label>

              <label htmlFor="password-filed">
                Password
                <input
                  type="password"
                  id="password-field"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <span className="error-text">{errors.password.message}</span>
                )}
              </label>

              {error && <span className="error-text">{error}</span>}

              <div className="btn-wrapper">
                <Button type="submit" variant="alt">
                  Login
                </Button>
              </div>
              <div className="register-wrapper">
                <p>If this is your first time, please </p>

                <Button type="button" variant="orange" onClick={handleNavigate}>
                  {" "}
                  Register{" "}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
