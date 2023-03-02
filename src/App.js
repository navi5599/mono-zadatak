import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import CarModelsPage from './pages/CarModelsPage/CarModelsPage';
import NavBar from './layouts/NavBar/NavBar';
import Footer from './layouts/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="models/:carId" element={<CarModelsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
