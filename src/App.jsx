import './App.css';
import Register from './pages/Register/Register.jsx';
import Search from './pages/search/Search.jsx';
import Saved from './pages/saved/Saved.jsx';
import Profile from './pages/profile/Profile.jsx';
import Onboarding from "./pages/Onboarding/Onboarding.jsx";
import PlantDetail from "./pages/PlantDetails/PlantDetails.jsx";
import Login from "./pages/login/Login.jsx";
import Confirmation from './pages/Confirmation/Confirmation.jsx';
import {Routes, Route} from "react-router-dom";




function App() {


    return (
        <>
            <Routes>
                <Route path="/" element={<Search/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/saved" element={<Saved/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/onboarding" element={<Onboarding/>}/>
                <Route path="/plantdetail/:id" element={<PlantDetail/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/confirmation" element={<Confirmation/>}/>
                <Route path="/register" element={<Register/>}/>

            </Routes>


        </>
    )
}

export default App;
