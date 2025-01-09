import './home.css';
import whiteLogo from "../../assets/white-logo.svg";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext.jsx';
import Button from '../../components/Button/Button.jsx';
import Notification from "../../components/Notification/Notification.jsx";
import {useState, useContext} from "react";


function Home() {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const { signUp } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    async function handleFormSubmit(data) {
        console.log("Form Data:", data); 

        try {
            // Call the signUp function from AuthContext
            const result = await signUp(data.username, data.email, data.password);

            if (result.error) {
                console.error('Signup Error: ', result.error);
                setError(result.error.message || 'Something went wrong. Please try again.');
            } 
            if(!result.error) {
                console.log("Signup successful:", result);
                setSuccess(true);
                navigate('/confirmation')
            }
        } catch (err) {
            console.error('Unexpected error during signup:', err);
            setError('An unexpected error occurred. Please try again.');
        }
    }

    function handleNavigate(){
        navigate('/login');
    }

    const handleCloseNotification = () =>{
        setError(null);
        setSuccess(false);
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
                            <h1 className="intro-welcome-txt">Sign up!</h1>

                            <p>
                                Embark on your green journey with! Sign up today and discover a world of botanical
                                beauty.
                            </p>
                        </div>
                        <div className="form-wrapper">
                            <form onSubmit={handleSubmit(handleFormSubmit)}>
                                <div className="form-container">
                                    <label htmlFor="name-filed">
                                        Name
                                        <input
                                            type="text"
                                            id="name-field"
                                            placeholder="Enter your name"
                                            {...register("username", {required: true})}
                                        />
                                    </label>
                                    <label htmlFor="email-field">
                                        Email
                                        <input
                                            type="email"
                                            id="email-field"
                                            placeholder="Enter your email"
                                            {...register("email", {required: true})}
                                        />
                                    </label>
                                    <label htmlFor="password-field">
                                        password
                                        <input
                                            type="password"
                                            id="password-field"
                                            placeholder="Enter your password"
                                            {...register("password", {required: true})}
                                        />
                                    </label>
                                    <div className="btn-wrapper">
                                        <Button type="submit" variant="alt">Sign up Now</Button>
                                    </div>
                                    <div className="register-wrapper">
                                        <p>Already have an account? </p>

                                        <Button type="button" variant="orange" onClick={handleNavigate}> Login </Button>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {error && (
                    <Notification
                        message={error}
                        type="error"
                        onClose={handleCloseNotification}
                    />
                )}
                {success && (
                    <Notification
                        message="Signup successful! Please check your email to confirm your account."
                        type="success"
                        onClose={handleCloseNotification}
                    />
                )}  
            </section>
        </main>
    );
}

export default Home;

