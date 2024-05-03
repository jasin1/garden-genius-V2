import './login.css';
import whiteLogo from "../../assets/white-logo.svg";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";
import axios from "axios";


function Login() {

    const {register, handleSubmit} = useForm();
    const {login} = useContext(AuthContext);

    async function handleFormSubmit(data) {
        console.log('formulier gegevens: ', data);

        try {
            const response = await axios.post('https://api.datavortex.nl/gardengenius/users/authenticate', {
                "username": data.username,
                "password": data.password

            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'gardengenius:5jLE5O1NAeo3qWOhGKuQ'
                }
            });
            console.log('Login succesvol: ', response.data.jwt);
        login(response.data.jwt);
        } catch (error) {
            console.error('login fout: ', error);
        }
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
                            <h1 className="intro-welcome-txt">Welcome back!</h1>

                            <p>
                                Get our hands dirty and dive back into the green world of gardening together!
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
                                            {...register("username")}
                                        />
                                    </label>
                                    <label htmlFor="email-field">
                                        Email
                                        <input
                                            type="email"
                                            id="email-field"
                                            placeholder="Enter your email"
                                            {...register("email")}
                                        />
                                    </label>
                                    <label htmlFor="password-field">
                                        password
                                        <input
                                            type="password"
                                            id="password-field"
                                            placeholder="Enter your password"
                                            {...register("password")}
                                        />
                                    </label>
                                    <div className="btn-wrapper">
                                        <button type="submit" className="btn-alt">Login</button>
                                    </div>
                                    <div className="register-wrapper">
                                        <p>If this is your first time, please </p>
                                        <button className="btn-orange">
                                            Register
                                        </button>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );

}

export default Login;