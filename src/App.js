import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ClerkProvider, SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import WorkoutPlanner from './pages/WorkoutPlanner';
import WorkoutCalendar from './pages/WorkoutCalendar';
import History from './pages/History';
import Progress from './pages/Progress';
import BodyMeasurements from './pages/BodyMeasurements';
import Settings from './pages/Settings';
import { WorkoutProvider } from './contexts/WorkoutContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Chave pública do Clerk não encontrada! Adicione REACT_APP_CLERK_PUBLISHABLE_KEY no arquivo .env");
}

function App() {
  return (
    <ClerkProvider publishableKey={process.env.REACT_APP_CLERK_PUBLISHABLE_KEY}>
      <ThemeProvider>
        <WorkoutProvider>
          <Router>
            <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
              <Toaster 
                position="top-center"
                toastOptions={{
                  style: {
                    background: '#333',
                    color: '#fff',
                  },
                  duration: 3000,
                }} 
              />
              
              <Routes>
                {/* Rotas públicas */}
                <Route
                  path="/sign-in/*"
                  element={
                    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                      <div className="w-full max-w-md p-6 space-y-8">
                        <div className="text-center">
                          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Malhaê</h1>
                          <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Acompanhe seus treinos e evolução
                          </p>
                        </div>
                        <SignIn routing="path" path="/sign-in" />
                      </div>
                    </div>
                  }
                />
                <Route
                  path="/sign-up/*"
                  element={
                    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                      <div className="w-full max-w-md p-6 space-y-8">
                        <div className="text-center">
                          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Malhaê</h1>
                          <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Acompanhe seus treinos e evolução
                          </p>
                        </div>
                        <SignUp routing="path" path="/sign-up" />
                      </div>
                    </div>
                  }
                />

                {/* Rotas protegidas */}
                <Route
                  path="/*"
                  element={
                    <>
                      <SignedIn>
                        <main className="flex-1 overflow-auto pb-16 md:pb-0 text-gray-900 dark:text-white">
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
                      </SignedIn>
                      <SignedOut>
                        <Navigate to="/sign-in" />
                      </SignedOut>
                    </>
                  }
                />
              </Routes>
            </div>
          </Router>
        </WorkoutProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default App;