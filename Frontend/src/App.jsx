import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import SavedArticlesPage from './pages/SavedArticlesPage';
import HistoryPage from './pages/HistoryPage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Toaster position="top-center" />
        <Navbar />
        <main className="container">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/saved" element={<SavedArticlesPage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;