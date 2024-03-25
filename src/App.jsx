import './App.css'
import Logo from './assets/main-logo.svg'
import mainImg from './assets/login-img.jpg'

function App() {


    return (
        <>
            <main>
                <section className="login-splash">
                    <div className="main-image-wrapper">
                        <img className="main-image" src={mainImg} alt="main image for decoration"/>

                    </div>

                    <div className="intro-container">
                        <div className="intro-wrapper">
                            <header>
                                <p><span>Welcome to</span></p>
                                <img src={Logo} alt="main logo"/>
                                <p><span>Pretium vel dui viverra rutrum. Laoreet tristique amet neque sit laoreet viverra.</span>
                                </p>
                            </header>
                        </div>
                    </div>
                </section>
            </main>

        </>
    )
}

export default App
