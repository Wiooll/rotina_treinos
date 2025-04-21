export class WorkoutService {
  constructor(supabase) {
    this.supabase = supabase;
  }

  async getWorkouts() {
    const { data, error } = await this.supabase
      .from('workouts')
      .select(`
        *,
        exercises (
          id,
          name,
          sets,
          reps,
          weight
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar treinos:', error);
      throw new Error('Falha ao carregar treinos');
    }

    return data;
  }

  async createWorkout(workout) {
    const { data, error } = await this.supabase
      .from('workouts')
      .insert([
        {
          name: workout.name,
          description: workout.description,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar treino:', error);
      throw new Error('Falha ao criar treino');
    }

    if (workout.exercises && workout.exercises.length > 0) {
      const exercises = workout.exercises.map(exercise => ({
        ...exercise,
        workout_id: data.id
      }));

      const { error: exerciseError } = await this.supabase
        .from('exercises')
        .insert(exercises);

      if (exerciseError) {
        console.error('Erro ao adicionar exercícios:', exerciseError);
        throw new Error('Falha ao adicionar exercícios ao treino');
      }
    }

    return data;
  }

  async updateWorkout(id, workout) {
    const { data, error } = await this.supabase
      .from('workouts')
      .update({
        name: workout.name,
        description: workout.description,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar treino:', error);
      throw new Error('Falha ao atualizar treino');
    }

    if (workout.exercises) {
      // Primeiro remove todos os exercícios existentes
      const { error: deleteError } = await this.supabase
        .from('exercises')
        .delete()
        .eq('workout_id', id);

      if (deleteError) {
        console.error('Erro ao remover exercícios antigos:', deleteError);
        throw new Error('Falha ao atualizar exercícios do treino');
      }

      // Adiciona os novos exercícios
      if (workout.exercises.length > 0) {
        const exercises = workout.exercises.map(exercise => ({
          ...exercise,
          workout_id: id
        }));

        const { error: exerciseError } = await this.supabase
          .from('exercises')
          .insert(exercises);

        if (exerciseError) {
          console.error('Erro ao adicionar novos exercícios:', exerciseError);
          throw new Error('Falha ao adicionar novos exercícios ao treino');
        }
      }
    }

    return data;
  }

  async deleteWorkout(id) {
    // Os exercícios serão deletados automaticamente pela foreign key constraint
    const { error } = await this.supabase
      .from('workouts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar treino:', error);
      throw new Error('Falha ao deletar treino');
    }
  }

  async addExerciseToWorkout(workoutId, exerciseId, sets, reps, weight, restTime, notes) {
    try {
      const { data, error } = await this.supabase
        .from('workout_exercises')
        .insert([{
          workout_id: workoutId,
          exercise_id: exerciseId,
          sets,
          reps,
          weight,
          rest_time: restTime,
          notes
        }])
        .select(`
          *,
          exercise:exercises (*)
        `)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao adicionar exercício:', error);
      throw error;
    }
  }

  async startWorkout(workoutId) {
    try {
      const { data, error } = await this.supabase
        .from('workout_logs')
        .insert([{
          workout_id: workoutId,
          started_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao iniciar treino:', error);
      throw error;
    }
  }

  async finishWorkout(workoutLogId, notes) {
    try {
      const { data, error } = await this.supabase
        .from('workout_logs')
        .update({
          finished_at: new Date().toISOString(),
          notes
        })
        .eq('id', workoutLogId)
        .select(`
          *,
          workout:workouts (*),
          workout_exercise_logs (
            *,
            exercise:exercises (*)
          )
        `)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao finalizar treino:', error);
      throw error;
    }
  }

  async logExercise(workoutLogId, exerciseId, setsCompleted, repsCompleted, weight, notes) {
    try {
      const { data, error } = await this.supabase
        .from('workout_exercise_logs')
        .insert([{
          workout_log_id: workoutLogId,
          exercise_id: exerciseId,
          sets_completed: setsCompleted,
          reps_completed: repsCompleted,
          weight,
          notes
        }])
        .select(`
          *,
          exercise:exercises (*)
        `)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao registrar exercício:', error);
      throw error;
    }
  }

  async getSchedule() {
    const { data, error } = await this.supabase
      .from('schedule')
      .select('*')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Retorna o schedule padrão se não existir
        return {
          'segunda-feira': [],
          'terça-feira': [],
          'quarta-feira': [],
          'quinta-feira': [],
          'sexta-feira': [],
          'sábado': [],
          'domingo': []
        };
      }
      console.error('Erro ao buscar agenda:', error);
      throw new Error('Falha ao carregar agenda');
    }

    return data.schedule;
  }

  async updateSchedule(schedule) {
    const { error } = await this.supabase
      .from('schedule')
      .upsert({
        id: 1, // Usamos um ID fixo já que só teremos uma agenda por usuário
        schedule: schedule,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Erro ao atualizar agenda:', error);
      throw new Error('Falha ao atualizar agenda');
    }
  }
} 