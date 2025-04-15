import React, { useContext } from 'react';
import { WorkoutContext } from '../contexts/WorkoutContext';
import { Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const days = [
  { id: 'domingo', label: 'Domingo' },
  { id: 'segunda', label: 'Segunda' },
  { id: 'terca', label: 'Terça' },
  { id: 'quarta', label: 'Quarta' },
  { id: 'quinta', label: 'Quinta' },
  { id: 'sexta', label: 'Sexta' },
  { id: 'sabado', label: 'Sábado' },
];

const WorkoutCalendar = () => {
  const { schedule, workouts, updateSchedule } = useContext(WorkoutContext);

  const handleToggleWorkout = (day, workoutId) => {
    const updatedSchedule = { ...schedule };
    if (!updatedSchedule[day]) {
      updatedSchedule[day] = [];
    }

    const index = updatedSchedule[day].indexOf(workoutId);
    if (index === -1) {
      updatedSchedule[day].push(workoutId);
    } else {
      updatedSchedule[day].splice(index, 1);
    }

    updateSchedule(updatedSchedule);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
            <Calendar className="w-6 h-6 text-primary-500 dark:text-primary-400" />
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
            Calendário de Treinos
          </h1>
        </div>

        <div className="grid gap-6">
          {days.map((day) => (
            <motion.div
              key={day.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {day.label}
              </h2>
              {workouts && workouts.length > 0 ? (
                <div className="grid gap-3">
                  {workouts.map((workout) => (
                    <motion.button
                      key={workout.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleToggleWorkout(day.id, workout.id)}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                        schedule[day.id]?.includes(workout.id)
                          ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-700'
                          : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        {workout.name}
                      </span>
                      {schedule[day.id]?.includes(workout.id) ? (
                        <CheckCircle2 className="w-5 h-5 text-primary-500 dark:text-primary-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                      )}
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    Nenhum treino disponível para agendar.
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                    Crie treinos primeiro para poder agendá-los.
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutCalendar;