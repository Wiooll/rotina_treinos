import React, { createContext, useState, useEffect } from 'react';
import { useSupabase } from '../hooks/useSupabase';
import { WorkoutService } from '../services/workoutService';
import { toast } from 'react-hot-toast';

export const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const supabase = useSupabase();
  const workoutService = new WorkoutService(supabase);
  const [workouts, setWorkouts] = useState([]);
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const [schedule, setSchedule] = useState({
    'segunda-feira': [],
    'terça-feira': [],
    'quarta-feira': [],
    'quinta-feira': [],
    'sexta-feira': [],
    'sábado': [],
    'domingo': []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkouts();
    loadSchedule();
  }, []);

  const loadSchedule = async () => {
    try {
      const data = await workoutService.getSchedule();
      if (data) {
        setSchedule(data);
      }
    } catch (error) {
      console.error('Erro ao carregar agenda:', error);
      toast.error('Erro ao carregar agenda');
    }
  };

  const updateSchedule = async (newSchedule) => {
    try {
      await workoutService.updateSchedule(newSchedule);
      setSchedule(newSchedule);
      toast.success('Agenda atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar agenda:', error);
      toast.error('Erro ao atualizar agenda');
      throw error;
    }
  };

  const loadWorkouts = async () => {
    try {
      setLoading(true);
      const data = await workoutService.getWorkouts();
      setWorkouts(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar treinos:', error);
      toast.error('Erro ao carregar treinos');
      setLoading(false);
    }
  };

  const addWorkout = async (name, description) => {
    try {
      const newWorkout = await workoutService.createWorkout(name, description);
      setWorkouts([newWorkout, ...workouts]);
      toast.success('Treino criado com sucesso!');
      return newWorkout;
    } catch (error) {
      console.error('Erro ao criar treino:', error);
      toast.error('Erro ao criar treino');
      throw error;
    }
  };

  const addExerciseToWorkout = async (workoutId, exerciseId, sets, reps, weight, restTime, notes) => {
    try {
      const newExercise = await workoutService.addExerciseToWorkout(
        workoutId,
        exerciseId,
        sets,
        reps,
        weight,
        restTime,
        notes
      );
      
      setWorkouts(workouts.map(workout => {
        if (workout.id === workoutId) {
          return {
            ...workout,
            workout_exercises: [...(workout.workout_exercises || []), newExercise]
          };
        }
        return workout;
      }));

      toast.success('Exercício adicionado com sucesso!');
      return newExercise;
    } catch (error) {
      console.error('Erro ao adicionar exercício:', error);
      toast.error('Erro ao adicionar exercício');
      throw error;
    }
  };

  const startWorkout = async (workoutId) => {
    try {
      const workoutLog = await workoutService.startWorkout(workoutId);
      toast.success('Treino iniciado!');
      return workoutLog;
    } catch (error) {
      console.error('Erro ao iniciar treino:', error);
      toast.error('Erro ao iniciar treino');
      throw error;
    }
  };

  const finishWorkout = async (workoutLogId, notes) => {
    try {
      const completedWorkout = await workoutService.finishWorkout(workoutLogId, notes);
      setCompletedWorkouts([completedWorkout, ...completedWorkouts]);
      toast.success('Treino finalizado com sucesso!');
      return completedWorkout;
    } catch (error) {
      console.error('Erro ao finalizar treino:', error);
      toast.error('Erro ao finalizar treino');
      throw error;
    }
  };

  const logExercise = async (workoutLogId, exerciseId, setsCompleted, repsCompleted, weight, notes) => {
    try {
      const exerciseLog = await workoutService.logExercise(
        workoutLogId,
        exerciseId,
        setsCompleted,
        repsCompleted,
        weight,
        notes
      );
      toast.success('Exercício registrado!');
      return exerciseLog;
    } catch (error) {
      console.error('Erro ao registrar exercício:', error);
      toast.error('Erro ao registrar exercício');
      throw error;
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        completedWorkouts,
        schedule,
        loading,
        addWorkout,
        addExerciseToWorkout,
        startWorkout,
        finishWorkout,
        logExercise,
        updateSchedule
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}