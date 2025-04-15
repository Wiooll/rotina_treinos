import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WorkoutContext } from '../contexts/WorkoutContext';
import TimerModal from '../components/TimerModal';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';

function WorkoutExecution() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workouts, addCompletedWorkout } = useContext(WorkoutContext);
  
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [exerciseProgress, setExerciseProgress] = useState([]);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);

  useEffect(() => {
    const workout = workouts.find(w => w.id === id);
    if (workout) {
      setCurrentWorkout(workout);
      // Inicializa o progresso dos exercícios
      setExerciseProgress(
        workout.exercises.map(exercise => ({
          completedSets: new Array(exercise.sets).fill(false)
        }))
      );
    }
  }, [id, workouts]);

  if (!currentWorkout) {
    return (
      <div className="p-4">
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Voltar
          </button>
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Treino não encontrado
        </p>
      </div>
    );
  }

  const currentExercise = currentWorkout.exercises[currentExerciseIndex];
  const isLastSet = currentSetIndex === currentExercise.sets - 1;
  const isLastExercise = currentExerciseIndex === currentWorkout.exercises.length - 1;

  const handleCompleteSet = () => {
    const newProgress = [...exerciseProgress];
    newProgress[currentExerciseIndex].completedSets[currentSetIndex] = true;
    setExerciseProgress(newProgress);
    
    if (!isLastSet) {
      setShowTimer(true);
    } else if (!isLastExercise) {
      setCurrentExerciseIndex(prev => prev + 1);
      setCurrentSetIndex(0);
      setShowTimer(true);
    } else {
      handleWorkoutComplete();
    }
  };

  const handleSkipSet = () => {
    const newProgress = [...exerciseProgress];
    newProgress[currentExerciseIndex].completedSets[currentSetIndex] = false;
    setExerciseProgress(newProgress);
    
    if (!isLastSet) {
      setCurrentSetIndex(prev => prev + 1);
    } else if (!isLastExercise) {
      setCurrentExerciseIndex(prev => prev + 1);
      setCurrentSetIndex(0);
    } else {
      handleWorkoutComplete();
    }
  };

  const handleWorkoutComplete = () => {
    const completedWorkout = {
      ...currentWorkout,
      completedAt: new Date().toISOString(),
      exerciseProgress
    };
    addCompletedWorkout(completedWorkout);
    setIsWorkoutComplete(true);
  };

  const handleTimerClose = () => {
    setShowTimer(false);
    if (isLastSet && !isLastExercise) {
      setCurrentExerciseIndex(prev => prev + 1);
      setCurrentSetIndex(0);
    } else if (!isLastSet) {
      setCurrentSetIndex(prev => prev + 1);
    }
  };

  if (isWorkoutComplete) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Treino Concluído!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Parabéns por completar seu treino!
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Voltar ao Início
            </button>
            <button
              onClick={() => navigate('/history')}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Ver Histórico
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Voltar
        </button>
        <h1 className="text-xl font-bold">{currentWorkout.name}</h1>
        <div className="w-8" /> {/* Espaçador */}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            Exercício {currentExerciseIndex + 1} de {currentWorkout.exercises.length}
          </h2>
          <h3 className="text-2xl font-bold mb-4">{currentExercise.name}</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Repetições</p>
              <p className="font-semibold">{currentExercise.reps}x</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Peso</p>
              <p className="font-semibold">{currentExercise.weight}kg</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Progresso das Séries
          </h4>
          <div className="flex gap-2">
            {exerciseProgress[currentExerciseIndex].completedSets.map((completed, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full ${
                  completed
                    ? 'bg-green-500'
                    : index === currentSetIndex
                    ? 'bg-primary-500'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleCompleteSet}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <CheckCircle2 className="w-5 h-5" />
            Completar Série
          </button>
          <button
            onClick={handleSkipSet}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <XCircle className="w-5 h-5" />
            Pular
          </button>
        </div>
      </div>

      {currentExerciseIndex < currentWorkout.exercises.length - 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Próximo Exercício
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">
                {currentWorkout.exercises[currentExerciseIndex + 1].name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentWorkout.exercises[currentExerciseIndex + 1].sets} séries ×{' '}
                {currentWorkout.exercises[currentExerciseIndex + 1].reps} repetições
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      )}

      {showTimer && (
        <TimerModal
          initialTime={currentExercise.rest || 60}
          onClose={handleTimerClose}
        />
      )}
    </div>
  );
}

export default WorkoutExecution; 