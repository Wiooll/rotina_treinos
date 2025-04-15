import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import WorkoutPlanner from './pages/WorkoutPlanner';
import WorkoutCalendar from './pages/WorkoutCalendar';
import History from './pages/History';
import Progress from './pages/Progress';
import BodyMeasurements from './pages/BodyMeasurements';
import Settings from './pages/Settings';
import { WorkoutProvider } from './contexts/WorkoutContext';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Verifica status online/offline
    const handleOnlineStatus = () => setIsOnline(true);
    const handleOfflineStatus = () => setIsOnline(false);

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    // Registra service worker para PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('SW registrado: ', registration);
          })
          .catch(error => {
            console.log('Falha no registro do SW: ', error);
          });
      });
    }

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
    };
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <WorkoutProvider>
          <Router>
            <div className="flex flex-col h-screen bg-gray-900 text-white">
              <Toaster position="top-center" />
              
              {!isOnline && (
                <div className="bg-yellow-600 text-white text-center p-2 text-sm">
                  Você está offline. Suas alterações serão sincronizadas quando reconectar.
                </div>
              )}
              
              <main className="flex-1 overflow-auto pb-16 md:pb-0">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/planner" element={<WorkoutPlanner />} />
                  <Route path="/calendar" element={<WorkoutCalendar />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/measurements" element={<BodyMeasurements />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
              
              <Navbar />
            </div>
          </Router>
        </WorkoutProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;