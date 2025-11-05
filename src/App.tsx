import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CompanyDetailPage from './pages/CompanyDetailPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/company/:slug" element={<CompanyDetailPage />} />
    </Routes>
  );
}

export default App;
