import { useState } from 'react'
import MovieCard from './components/MovieCard'
import './css/App.css'
import Home from './pages/Home';
import { Routes ,Route} from 'react-router-dom';
import Favourite from './pages/Favourites';
import NavBar from './components/NavBar';
import { MovieProvider } from './Context/MovieContext';


function App() {
  const movieNumber=1;
  
  return (
      <>
      <NavBar/>
      <main className='main-content'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/favourites" element={<Favourite/>}/>
      </Routes>
    </main>
      </>
  )
}


export default App
