import React, { useState, useContext } from 'react';
import { WorkoutContext } from '../contexts/WorkoutContext';
import ExerciseForm from '../components/ExerciseForm';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X, Copy, ArrowUpDown } from 'lucide-react';

const WorkoutPlanner = () => {
  const { 
    workouts, 
    addWorkout, 
    updateWorkout, 
    deleteWorkout,
    duplicateWorkout,
    selectedWorkout, 
    setSelectedWorkout,
    isLoading 
  } = useContext(WorkoutContext);

  const [workoutName, setWorkoutName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleAddExercise = (exercise) => {
    if (!selectedWorkout) return;
    
    try {
      const updatedWorkout = {
        ...selectedWorkout,
        exercises: [...selectedWorkout.exercises, exercise]
      };
      updateWorkout(updatedWorkout.id, updatedWorkout);
      setSelectedWorkout(updatedWorkout);
    } catch (error) {
      console.error('Erro ao adicionar exercício:', error);
    }
  };

  const handleCreateWorkout = () => {
    if (!workoutName.trim()) return;
    
    try {
      const newWorkout = {
        name: workoutName,
        exercises: []
      };
      const createdWorkout = addWorkout(newWorkout);
      if (createdWorkout) {
        setSelectedWorkout(createdWorkout);
        setIsCreating(false);
        setWorkoutName('');
      }
    } catch (error) {
      console.error('Erro ao criar treino:', error);
    }
  };

  const handleDeleteExercise = (exerciseIndex) => {
    if (selectedWorkout) {
      const updatedExercises = [...selectedWorkout.exercises];
      updatedExercises.splice(exerciseIndex, 1);
      const updatedWorkout = {
        ...selectedWorkout,
        exercises: updatedExercises
      };
      updateWorkout(updatedWorkout.id, updatedWorkout);
      setSelectedWorkout(updatedWorkout);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const inputClasses = `
    w-full px-3 py-2 
    bg-white dark:bg-gray-800 
    border border-gray-300 dark:border-gray-600 
    rounded-md shadow-sm 
    text-gray-900 dark:text-white 
    placeholder-gray-500 dark:placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
  `;

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Planejador de Treinos
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Crie e gerencie seus treinos personalizados
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de Treinos */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Meus Treinos
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreating(true)}
                className="flex items-center px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Plus className="w-4 h-4 mr-1" />
                Novo
              </motion.button>
            </div>

            <AnimatePresence>
              {isCreating && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4"
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={workoutName}
                      onChange={(e) => setWorkoutName(e.target.value)}
                      placeholder="Nome do treino"
                      className={inputClasses}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCreateWorkout}
                      className="px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm"
                    >
                      Criar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsCreating(false);
                        setWorkoutName('');
                      }}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              {workouts.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Você ainda não tem nenhum treino
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsCreating(true)}
                    className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Primeiro Treino
                  </motion.button>
                </div>
              ) : (
                workouts.map(workout => (
                  <motion.div
                    key={workout.id}
                    whileHover={{ scale: 1.02 }}
                    className={`
                      p-4 rounded-lg cursor-pointer transition-all
                      ${selectedWorkout?.id === workout.id
                        ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500'
                        : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                      }
                    `}
                    onClick={() => setSelectedWorkout(workout)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {workout.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {workout.exercises.length} exercícios
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateWorkout(workout.id);
                          }}
                          className="p-1 text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                          title="Duplicar treino"
                        >
                          <Copy className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Tem certeza que deseja excluir o treino "${workout.name}"?`)) {
                              deleteWorkout(workout.id);
                              if (selectedWorkout?.id === workout.id) {
                                setSelectedWorkout(null);
                              }
                            }
                          }}
                          className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                          title="Excluir treino"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Detalhes do Treino */}
        <div className="lg:col-span-2">
          {selectedWorkout ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedWorkout.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedWorkout.exercises.length} exercícios
                  </p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedWorkout(null)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <ExerciseForm onAddExercise={handleAddExercise} />

              <div className="mt-6 space-y-3">
                {selectedWorkout.exercises.map((exercise, index) => (
                  <motion.div
                    key={exercise.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {exercise.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {exercise.sets} séries x {exercise.reps} repetições
                        {exercise.weight > 0 && ` • ${exercise.weight}kg`}
                        {exercise.restTime > 0 && ` • ${exercise.restTime}s descanso`}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteExercise(index)}
                        className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                        title="Excluir exercício"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <ArrowUpDown className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Selecione um Treino
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Escolha um treino da lista para ver e editar seus exercícios
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlanner;