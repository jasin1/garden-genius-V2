import './App.css';
import Home from './pages/home/home.jsx';
import Search from './pages/search/search.jsx';
import Saved from './pages/saved/saved.jsx';
import Profile from './pages/profile/profile.jsx';
import Onboarding from "./pages/onboarding/onboarding.jsx";
import PlantDetail from "./pages/plantdetail/plantdetail.jsx";
import {Routes, Route} from "react-router-dom";


function App() {


    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/saved" element={<Saved/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/onboarding" element={<Onboarding/>}/>
                <Route path="/plantdetail" element={<PlantDetail/>}/>
            </Routes>


        </>
    )
}

export default App
