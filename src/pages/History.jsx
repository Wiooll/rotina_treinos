import React, { useContext } from 'react';
import { WorkoutContext } from '../contexts/WorkoutContext';

const History = () => {
  const { completedWorkouts } = useContext(WorkoutContext);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Histórico de Treinos</h1>
      
      {completedWorkouts.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center text-gray-400">
          <p>Nenhum treino completado ainda.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {completedWorkouts
            .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
            .map(workout => (
              <div key={workout.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-medium">{workout.name}</h2>
                  <span className="text-sm text-gray-400">
                    {formatDate(workout.completedAt)}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {workout.exercises.map((exercise, index) => (
                    <div key={index} className="bg-gray-700 rounded p-2">
                      <div className="font-medium">{exercise.name}</div>
                      <div className="text-sm text-gray-400">
                        {exercise.sets} séries x {exercise.reps} repetições
                        {exercise.weight && ` - ${exercise.weight}kg`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default History; 