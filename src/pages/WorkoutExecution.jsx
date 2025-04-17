import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WorkoutContext } from '../contexts/WorkoutContext';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';

function WorkoutExecution() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workouts, addCompletedWorkout } = useContext(WorkoutContext);
  
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [exerciseProgress, setExerciseProgress] = useState([]);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);

  useEffect(() => {
    const workout = workouts.find(w => w.id === id);
    if (workout) {
      setCurrentWorkout(workout);
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
      setCurrentSetIndex(prev => prev + 1);
    } else if (!isLastExercise) {
      setCurrentExerciseIndex(prev => prev + 1);
      setCurrentSetIndex(0);
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Execução do Treino</h1>

      {currentWorkout ? (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{currentWorkout.name}</h2>

          {currentExercise && (
            <div className="mb-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                  {currentExercise.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {currentExercise.category} • {currentExercise.weight}kg
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Série Atual</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {currentSetIndex + 1}/{currentExercise.sets}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Repetições</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {currentExercise.reps}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Peso</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {currentExercise.weight}kg
                    </p>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleCompleteSet}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow transition duration-200"
                  >
                    Completar Série
                  </button>
                  <button
                    onClick={handleSkipSet}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg shadow transition duration-200"
                  >
                    Pular Série
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Progresso do Treino</h3>
            <div className="space-y-4">
              {currentWorkout.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className={`
                    p-4 rounded-lg
                    ${index < currentExerciseIndex ? 'bg-green-100 dark:bg-green-900' : 
                      index === currentExerciseIndex ? 'bg-blue-100 dark:bg-blue-900' : 
                      'bg-gray-50 dark:bg-gray-700'}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{exercise.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {exercise.sets} séries x {exercise.reps} repetições • {exercise.weight}kg
                      </p>
                    </div>
                    <div className="flex items-center">
                      {index < currentExerciseIndex && (
                        <span className="text-green-600 dark:text-green-400">
                          <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {index === currentExerciseIndex && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                        <div
                          className="bg-blue-500 h-2.5 rounded-full"
                          style={{ width: `${(currentSetIndex / exercise.sets) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {isWorkoutComplete && (
            <div className="mt-8 text-center">
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">
                Parabéns! Treino Concluído!
              </h3>
              <button
                onClick={() => navigate('/history')}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow transition duration-200"
              >
                Finalizar Treino
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Nenhum treino selecionado. Por favor, selecione um treino para começar.
          </p>
          <Link
            to="/workout-planner"
            className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow transition duration-200"
          >
            Ir para o Planejador de Treinos
          </Link>
        </div>
      )}
    </div>
  );
}

export default WorkoutExecution; 