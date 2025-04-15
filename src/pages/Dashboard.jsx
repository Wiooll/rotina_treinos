import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WorkoutContext } from '../contexts/WorkoutContext';
import { motion } from 'framer-motion';
import { Dumbbell, Calendar, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { schedule, workouts, completedWorkouts } = useContext(WorkoutContext);
  
  const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long' });
  const todayWorkouts = schedule[today] || [];
  
  const totalWorkouts = completedWorkouts.length;
  const lastWeekWorkouts = completedWorkouts.filter(workout => {
    const workoutDate = new Date(workout.date);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return workoutDate >= oneWeekAgo;
  }).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 pb-20">
      <div className="max-w-screen-xl mx-auto mb-6">
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-screen-xl mx-auto space-y-6"
      >
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Treinos de Hoje
          </h2>
          {todayWorkouts.length > 0 ? (
            <div className="space-y-4">
              {todayWorkouts.map(workoutId => {
                const workout = workouts.find(w => w.id === workoutId);
                if (!workout) return null;
                return (
                  <motion.div
                    key={workoutId}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-4 rounded-lg border border-primary-200 dark:border-primary-700"
                  >
                    <h3 className="font-semibold text-primary-700 dark:text-primary-300">
                      {workout.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {workout.exercises.length} exercícios
                    </p>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Nenhum treino agendado para hoje
              </p>
              <Link
                to="/calendar"
                className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Treino
              </Link>
            </div>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Estatísticas
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total de Treinos</p>
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {totalWorkouts}
                  </p>
                </div>
                <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full">
                  <Dumbbell className="w-6 h-6 text-primary-500 dark:text-primary-400" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Últimos 7 dias</p>
                  <p className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                    {lastWeekWorkouts}
                  </p>
                </div>
                <div className="bg-secondary-100 dark:bg-secondary-900/30 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-secondary-500 dark:text-secondary-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Progresso Recente
            </h3>
            {completedWorkouts.length > 0 ? (
              <div className="space-y-3">
                {completedWorkouts.slice(0, 3).map(workout => (
                  <motion.div
                    key={workout.id}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {workout.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(workout.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {workout.exercises.length} exercícios
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-600 dark:text-gray-400">
                Seus dados de progresso aparecerão aqui
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard; 