import whiteLogo from "../../assets/white-logo.svg";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";
// import axios from "axios";
import Button from '../../components/Button/Button.jsx';
import Header from "../../components/Headers/Header.jsx";
import Notification from "../../components/Notification/Notification.jsx";



function Login() {

    const {register, handleSubmit} = useForm();
    const {login, error, setError, loading} = useContext(AuthContext);
    const navigate = useNavigate();
    // const [error, setError] = useState(null);


    async function handleFormSubmit(data) {
        try {
            const loginResult = await login(data.email, data.password);
            if (loginResult.error) {
              setError(loginResult.error.message); // Use setError from context
            }
          } catch (err) {
            console.error("Login error:", err);
            setError("An unexpected error occurred during login");
          }
    }

    function handleNavigate(){
        navigate('/');
    }

    const handleCloseNotification = () =>{
        setError(null);
    }

    return (
        <main>
            <section className="login-splash">
                <div className="main-image-wrapper">
                    <div className="overlay">
                        <div className="login-whitelogo-wrapper">
                            <img src={whiteLogo} alt="main logo"/>
                        </div>
                        <p>
                            Our platform is your gateway to discovering the perfect plants for your garden oasis.
                            Whether you are a seasoned gardener or just starting out, GardenGenius is here to help
                            you bring your gardening dreams to life.
                        </p>
                    </div>
                </div>

                <div className="intro-container">
                    <div className="intro-wrapper">
                        <div className="intro-header">
                            <Header className={"intro-welcome-txt"} Tag={"h1"}>Welcome Back!</Header>
                            <p>
                                Let&apos;s get our hands dirty and dive back into the green world of gardening together!
                            </p>
                        </div>
                        <div className="form-wrapper">
                            <form onSubmit={handleSubmit(handleFormSubmit)}>
                                <div className="form-container">
{/* 
                                    <label htmlFor="name-filed">
                                        Name
                                        <input
                                            type="text"
                                            id="name-field"
                                            placeholder="Enter your name"
                                            {...register("username")}
                                        />
                                    </label> */}
                                    <label htmlFor="email-filed">
                                        Email
                                        <input
                                            type="email"
                                            id="email-field"
                                            placeholder="Enter your email"
                                            {...register("email")}
                                        />
                                    </label>

                                    <label htmlFor="password-filed">
                                        Password
                                        <input
                                            type="password"
                                            id="password-field"
                                            placeholder="Enter your password"
                                            {...register("password")}
                                        />
                                    </label>


                                    <div className="btn-wrapper">
                                        <Button type="submit" variant="alt">
                                            {loading ?"Logging in...": "Login"}
                                            </Button>
                                    </div>
                                    <div className="register-wrapper">
                                        <p>If this is your first time, please </p>

                                        <Button type="button" variant="orange" onClick={handleNavigate}> Register </Button>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {error && (
                    <Notification
                        message={error}
                        onClose={handleCloseNotification}
                    />
                )}
            </section>
        </main>
    );

}

export default Login;