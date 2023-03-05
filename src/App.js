import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import CarModelsPage from './pages/CarModelsPage/CarModelsPage';
import NavBar from './layouts/NavBar/NavBar';
import Footer from './layouts/Footer/Footer';
import Login from './components/Login/Login';
import AddCarPage from './pages/AddCarPage/AddCarPage';

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          exact
          path="/"
          element={!token ? <Navigate to="/welcome" /> : <HomePage />}
        />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/models/:carId"
          element={!token ? <Navigate to="/welcome" /> : <CarModelsPage />}
        />
        <Route path="/createCarBrand" element={<AddCarPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
