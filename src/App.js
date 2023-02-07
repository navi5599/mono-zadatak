import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CarModelsPage from './pages/CarModelsPage/CarModelsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="models" element={<CarModelsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
