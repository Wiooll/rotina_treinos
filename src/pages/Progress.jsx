import React, { useContext } from 'react';
import { WorkoutContext } from '../contexts/WorkoutContext';

const Progress = () => {
  const { completedWorkouts } = useContext(WorkoutContext);
  
  // Agrupa treinos por semana
  const workoutsByWeek = completedWorkouts.reduce((acc, workout) => {
    const date = new Date(workout.completedAt);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = weekStart.toISOString().split('T')[0];
    
    if (!acc[weekKey]) {
      acc[weekKey] = {
        date: weekStart,
        count: 0,
        exercises: {}
      };
    }
    
    acc[weekKey].count++;
    
    // Conta exercícios por tipo
    workout.exercises.forEach(exercise => {
      if (!acc[weekKey].exercises[exercise.name]) {
        acc[weekKey].exercises[exercise.name] = {
          count: 0,
          totalWeight: 0
        };
      }
      
      acc[weekKey].exercises[exercise.name].count++;
      if (exercise.weight) {
        acc[weekKey].exercises[exercise.name].totalWeight += exercise.weight;
      }
    });
    
    return acc;
  }, {});
  
  const weeks = Object.entries(workoutsByWeek)
    .sort(([a], [b]) => new Date(b) - new Date(a));
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Acompanhamento de Progresso</h1>
      
      {weeks.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center text-gray-400">
          <p>Nenhum dado de progresso disponível ainda.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {weeks.map(([weekKey, weekData]) => (
            <div key={weekKey} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h2 className="text-lg font-medium mb-4">
                Semana de {weekData.date.toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded p-3">
                  <div className="text-2xl font-bold">{weekData.count}</div>
                  <div className="text-sm text-gray-400">Treinos Realizados</div>
                </div>
                
                <div className="bg-gray-700 rounded p-3">
                  <div className="text-2xl font-bold">
                    {Object.keys(weekData.exercises).length}
                  </div>
                  <div className="text-sm text-gray-400">Exercícios Diferentes</div>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-md font-medium mb-2">Exercícios Realizados</h3>
                <div className="space-y-2">
                  {Object.entries(weekData.exercises).map(([name, data]) => (
                    <div key={name} className="bg-gray-700 rounded p-2">
                      <div className="font-medium">{name}</div>
                      <div className="text-sm text-gray-400">
                        {data.count} vezes
                        {data.totalWeight > 0 && ` - Média de ${(data.totalWeight / data.count).toFixed(1)}kg`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Progress; 