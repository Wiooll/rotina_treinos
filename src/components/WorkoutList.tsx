import { useEffect, useState } from "react";
import { useSupabase } from "../hooks/useSupabase";
import { WorkoutService } from "../services/workoutService";
import { Database } from "../types/supabase";

type Workout = Database["public"]["Tables"]["workouts"]["Row"] & {
  workout_exercises: Array<
    Database["public"]["Tables"]["workout_exercises"]["Row"] & {
      exercise: Database["public"]["Tables"]["exercises"]["Row"];
    }
  >;
};

export function WorkoutList() {
  const supabase = useSupabase();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const workoutService = new WorkoutService(supabase);
    
    async function loadWorkouts() {
      try {
        setLoading(true);
        const data = await workoutService.getWorkouts();
        setWorkouts(data as Workout[]);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar treinos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, [supabase]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Meus Treinos</h2>
      {workouts.length === 0 ? (
        <p>Nenhum treino encontrado</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="p-4 border rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold">{workout.name}</h3>
              {workout.description && (
                <p className="text-gray-600 mt-2">{workout.description}</p>
              )}
              <div className="mt-4">
                <h4 className="font-medium">Exercícios:</h4>
                <ul className="mt-2 space-y-2">
                  {workout.workout_exercises.map((we) => (
                    <li key={we.id} className="text-sm">
                      {we.exercise.name} - {we.sets}x{we.reps}{" "}
                      {we.weight && `@ ${we.weight}kg`}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {/* Implementar início do treino */}}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Iniciar Treino
                </button>
                <button
                  onClick={() => {/* Implementar edição */}}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 