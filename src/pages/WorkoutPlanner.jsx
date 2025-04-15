import React, { useState, useContext } from 'react';
import { WorkoutContext } from '../contexts/WorkoutContext';
import ExerciseForm from '../components/ExerciseForm';
import TimerModal from '../components/TimerModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X, Timer, Copy, ArrowUpDown } from 'lucide-react';

const WorkoutPlanner = () => {
  const { 
    workouts, 
    addWorkout, 
    updateWorkout, 
    deleteWorkout,
    duplicateWorkout,
    selectedWorkout, 
    setSelectedWorkout 
  } = useContext(WorkoutContext);

  const [showTimer, setShowTimer] = useState(false);
  const [workoutName, setWorkoutName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // Adiciona exercício
  const handleAddExercise = (exercise) => {
    if (selectedWorkout) {
      const updatedWorkout = {
        ...selectedWorkout,
        exercises: [...selectedWorkout.exercises, exercise]
      };
      updateWorkout(updatedWorkout.id, updatedWorkout);
      setSelectedWorkout(updatedWorkout);
    }
  };

  const handleCreateWorkout = () => {
    if (workoutName.trim()) {
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

  const handleMoveExercise = (fromIndex, toIndex) => {
    if (selectedWorkout) {
      const updatedExercises = [...selectedWorkout.exercises];
      const [movedItem] = updatedExercises.splice(fromIndex, 1);
      updatedExercises.splice(toIndex, 0, movedItem);

      const updatedWorkout = {
        ...selectedWorkout,
        exercises: updatedExercises
      };
      updateWorkout(updatedWorkout.id, updatedWorkout);
      setSelectedWorkout(updatedWorkout);
    }
  };

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
          Planejador de Treinos
        </h1>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-screen-xl mx-auto space-y-6"
      >
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
              Meus Treinos
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreating(true)}
              className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Treino
            </motion.button>
          </div>

          <AnimatePresence>
            {isCreating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    placeholder="Nome do treino"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreateWorkout}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
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
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workouts.map(workout => (
                <motion.div
                  key={workout.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className={`
                    p-4 rounded-lg cursor-pointer transition-colors
                    ${selectedWorkout?.id === workout.id
                      ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500'
                      : 'bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600'
                    }
                  `}
                  onClick={() => setSelectedWorkout(workout)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {workout.name}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateWorkout(workout.id);
                        }}
                        className="p-1 text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                        title="Duplicar treino"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Tem certeza que deseja excluir o treino "${workout.name}"? Esta ação não pode ser desfeita.`)) {
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
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {workout.exercises.length} exercícios
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {selectedWorkout && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white">
                  {selectedWorkout.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {selectedWorkout.exercises.length} exercícios
                </p>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTimer(true)}
                  className="p-2 text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 bg-gray-100 dark:bg-gray-700 rounded-lg"
                  title="Temporizador"
                >
                  <Timer className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedWorkout(null)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            <ExerciseForm onAddExercise={handleAddExercise} />

            <div className="mt-6 space-y-4">
              {selectedWorkout.exercises.map((exercise, index) => (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {exercise.name}
                      </h4>
                      {exercise.category && (
                        <span className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full">
                          {exercise.category}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {exercise.sets} séries x {exercise.reps} repetições
                      {exercise.weight && ` - ${exercise.weight}kg`}
                      {exercise.restTime && ` - ${exercise.restTime}s descanso`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {index > 0 && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleMoveExercise(index, index - 1)}
                        className="p-2 text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                        title="Mover para cima"
                      >
                        <ArrowUpDown className="w-4 h-4 rotate-180" />
                      </motion.button>
                    )}
                    {index < selectedWorkout.exercises.length - 1 && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleMoveExercise(index, index + 1)}
                        className="p-2 text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                        title="Mover para baixo"
                      >
                        <ArrowUpDown className="w-4 h-4" />
                      </motion.button>
                    )}
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
          </motion.div>
        )}
      </motion.div>

      <TimerModal
        isOpen={showTimer}
        onClose={() => setShowTimer(false)}
        initialTime={60}
      />
    </div>
  );
};

export default WorkoutPlanner;