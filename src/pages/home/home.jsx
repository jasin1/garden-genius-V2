import './home.css';
import whiteLogo from "../../assets/white-logo.svg";
import {useForm} from "react-hook-form";


function Home() {
    const {register, handleSubmit} = useForm();
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
                            <h1 className="intro-welcome-txt">Sign up</h1>

                            <p>
                                Join us today and let your green adventure begin!
                            </p>
                        </div>
                        <div className="form-wrapper">
                            <form onSubmit={handleSubmit((data) =>
                            {console.log(data);})} >
                                <div className="form-container">
                                    <label htmlFor="name-filed">
                                        Name
                                        <input
                                            type="text"
                                            id="name-field"
                                            placeholder="Enter your name"
                                            {...register("name")}
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
                                        <button className="submit-btn" type="submit">
                                            Signup
                                        </button>
                                        <button className="btn-alt">Login</button>
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

export default Home;