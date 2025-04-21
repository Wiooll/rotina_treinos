import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

type Workout = Database["public"]["Tables"]["workouts"]["Row"];
type WorkoutExercise = Database["public"]["Tables"]["workout_exercises"]["Row"];

export class WorkoutService {
  constructor(private supabase: SupabaseClient<Database>) {}

  async createWorkout(name: string, description?: string) {
    const { data: user } = await this.supabase.auth.getUser();
    if (!user.user) throw new Error("Usuário não autenticado");

    const { data, error } = await this.supabase
      .from("workouts")
      .insert({
        name,
        description,
        user_id: user.user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getWorkouts() {
    const { data, error } = await this.supabase
      .from("workouts")
      .select(`
        *,
        workout_exercises (
          *,
          exercise: exercises (*)
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  async getWorkoutById(id: string) {
    const { data, error } = await this.supabase
      .from("workouts")
      .select(`
        *,
        workout_exercises (
          *,
          exercise: exercises (*)
        )
      `)
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  async addExerciseToWorkout(
    workoutId: string,
    exerciseId: string,
    sets: number,
    reps: number,
    weight?: number,
    restTime?: number,
    notes?: string
  ) {
    const { data: exercises } = await this.supabase
      .from("workout_exercises")
      .select("order_position")
      .eq("workout_id", workoutId)
      .order("order_position", { ascending: false })
      .limit(1);

    const nextPosition = exercises && exercises[0] 
      ? exercises[0].order_position + 1 
      : 0;

    const { data, error } = await this.supabase
      .from("workout_exercises")
      .insert({
        workout_id: workoutId,
        exercise_id: exerciseId,
        sets,
        reps,
        weight,
        rest_time: restTime,
        notes,
        order_position: nextPosition,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async startWorkout(workoutId: string) {
    const { data: user } = await this.supabase.auth.getUser();
    if (!user.user) throw new Error("Usuário não autenticado");

    const { data, error } = await this.supabase
      .from("workout_logs")
      .insert({
        workout_id: workoutId,
        user_id: user.user.id,
        started_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async finishWorkout(workoutLogId: string, notes?: string) {
    const { data, error } = await this.supabase
      .from("workout_logs")
      .update({
        finished_at: new Date().toISOString(),
        notes,
      })
      .eq("id", workoutLogId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async logExercise(
    workoutLogId: string,
    exerciseId: string,
    setsCompleted: number,
    repsCompleted: number,
    weight?: number,
    notes?: string
  ) {
    const { data, error } = await this.supabase
      .from("workout_exercise_logs")
      .insert({
        workout_log_id: workoutLogId,
        exercise_id: exerciseId,
        sets_completed: setsCompleted,
        reps_completed: repsCompleted,
        weight,
        notes,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
} 