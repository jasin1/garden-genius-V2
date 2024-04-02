import './App.css';
import Home from './pages/home/home.jsx';
import Search from './pages/search/search.jsx';
import About from './pages/about/about.jsx';
import Saved from './pages/saved/saved.jsx';
import Onboarding from "./pages/onboarding/onboarding.jsx";
import PlantDetail from "./pages/plantdetail/plantdetail.jsx";
import {Routes, Route} from "react-router-dom";


function App() {


    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/saved" element={<Saved/>}/>
                <Route path="/onboarding" element={<Onboarding/>}/>
                <Route path="/plantdetail" element={<PlantDetail/>}/>

            </Routes>


        </>
    )
}

export default App
