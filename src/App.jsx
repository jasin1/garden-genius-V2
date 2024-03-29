import './App.css';
import Home from './pages/home/home.jsx';
import Search from './pages/search/search.jsx';
import About from './pages/about/about.jsx';
import {Routes, Route} from "react-router-dom";


function App() {


    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/about" element={<About/>}></Route>

            </Routes>


        </>
    )
}

export default App
