import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { WorkoutProvider } from './contexts/WorkoutContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import WorkoutPlanner from './pages/WorkoutPlanner';
import WorkoutCalendar from './pages/WorkoutCalendar';
import WorkoutExecution from './pages/WorkoutExecution';
import History from './pages/History';
import Progress from './pages/Progress';
import BodyMeasurements from './pages/BodyMeasurements';
import Settings from './pages/Settings';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WorkoutProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
              <Navbar />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/planner" element={<WorkoutPlanner />} />
                  <Route path="/calendar" element={<WorkoutCalendar />} />
                  <Route path="/workout/:workoutId" element={<WorkoutExecution />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/measurements" element={<BodyMeasurements />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
            </div>
          </Router>
        </WorkoutProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 