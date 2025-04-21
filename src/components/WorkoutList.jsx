import React, { useEffect, useState } from 'react';
import { WorkoutService } from '../services/workoutService';
import { useSupabase } from '../hooks/useSupabase';

export function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const supabase = useSupabase();
  const workoutService = new WorkoutService(supabase);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const workoutData = await workoutService.getWorkouts();
        setWorkouts(workoutData);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar treinos:', err);
        setError('Não foi possível carregar os treinos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  if (loading) {
    return <div>Carregando treinos...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="workout-list">
      <h2>Meus Treinos</h2>
      {workouts.length === 0 ? (
        <p>Nenhum treino encontrado. Crie seu primeiro treino!</p>
      ) : (
        <ul>
          {workouts.map((workout) => (
            <li key={workout.id} className="workout-item">
              <h3>{workout.name}</h3>
              <p>{workout.description}</p>
              <div className="workout-exercises">
                <h4>Exercícios:</h4>
                <ul>
                  {workout.exercises?.map((exercise) => (
                    <li key={exercise.id}>
                      {exercise.name} - {exercise.sets}x{exercise.reps} 
                      {exercise.weight > 0 && ` (${exercise.weight}kg)`}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 