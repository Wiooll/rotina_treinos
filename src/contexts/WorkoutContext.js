import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';
import { 
  saveWorkouts, 
  getWorkouts, 
  saveCompletedWorkouts, 
  getCompletedWorkouts,
  saveSchedule,
  getSchedule
} from '../services/storageService';

export const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const [schedule, setSchedule] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  // Carrega dados do localStorage na montagem
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        console.log('Iniciando carregamento de dados...');
        
        const savedWorkouts = await getWorkouts();
        console.log('Treinos carregados do storage:', savedWorkouts);
        
        const savedCompletedWorkouts = await getCompletedWorkouts();
        console.log('Treinos concluídos carregados:', savedCompletedWorkouts);
        
        const savedSchedule = await getSchedule();
        console.log('Agenda carregada:', savedSchedule);

        if (Array.isArray(savedWorkouts)) {
          setWorkouts(savedWorkouts);
        } else {
          console.warn('Treinos inválidos no storage, iniciando com array vazio');
          setWorkouts([]);
        }

        if (Array.isArray(savedCompletedWorkouts)) {
          setCompletedWorkouts(savedCompletedWorkouts);
        } else {
          setCompletedWorkouts([]);
        }

        if (savedSchedule && typeof savedSchedule === 'object') {
          setSchedule(savedSchedule);
        }
        
        console.log('Dados carregados com sucesso');
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast.error('Erro ao carregar seus dados de treino');
        // Garante estado inicial válido mesmo em caso de erro
        setWorkouts([]);
        setCompletedWorkouts([]);
        setSchedule({
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: []
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Salva treinos quando alterados
  useEffect(() => {
    if (!isLoading) {
      console.log('Salvando treinos:', workouts);
      saveWorkouts(workouts);
    }
  }, [workouts, isLoading]);

  // Salva treinos concluídos quando alterados
  useEffect(() => {
    if (!isLoading) {
      saveCompletedWorkouts(completedWorkouts);
    }
  }, [completedWorkouts, isLoading]);

  // Salva agenda quando alterada
  useEffect(() => {
    if (!isLoading) {
      saveSchedule(schedule);
    }
  }, [schedule, isLoading]);

  // Operações CRUD para treinos
  const addWorkout = (workout) => {
    // Validação
    if (!workout.name?.trim()) {
      toast.error('O nome do treino é obrigatório!');
      return null;
    }

    const newWorkout = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      exercises: [],
      ...workout
    };
    setWorkouts([...workouts, newWorkout]);
    toast.success('Treino adicionado!');
    return newWorkout;
  };

  const updateWorkout = (id, updatedWorkout) => {
    // Validação
    if (!updatedWorkout.name?.trim()) {
      toast.error('O nome do treino é obrigatório!');
      return;
    }

    const updated = workouts.map(workout => 
      workout.id === id ? { ...workout, ...updatedWorkout } : workout
    );
    setWorkouts(updated);
    toast.success('Treino atualizado!');
  };

  const deleteWorkout = (id) => {
    // Primeiro remove da agenda
    const updatedSchedule = { ...schedule };
    Object.keys(updatedSchedule).forEach(day => {
      updatedSchedule[day] = updatedSchedule[day].filter(workoutId => workoutId !== id);
    });
    setSchedule(updatedSchedule);
    
    // Depois remove o treino
    setWorkouts(workouts.filter(workout => workout.id !== id));
    toast.success('Treino excluído');
  };

  const duplicateWorkout = (workoutId) => {
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout) {
      toast.error('Treino não encontrado');
      return null;
    }

    const newWorkout = {
      ...workout,
      id: uuidv4(),
      name: `${workout.name} (Cópia)`,
      createdAt: new Date().toISOString(),
      exercises: workout.exercises.map(exercise => ({
        ...exercise,
        id: Date.now().toString()
      }))
    };

    setWorkouts([...workouts, newWorkout]);
    toast.success('Treino duplicado com sucesso!');
    return newWorkout;
  };

  // Operações de agenda
  const scheduleWorkout = (day, workoutId) => {
    // Não adiciona duplicados
    if (!schedule[day].includes(workoutId)) {
      setSchedule({
        ...schedule,
        [day]: [...schedule[day], workoutId]
      });
      toast.success('Treino agendado');
    }
  };

  const unscheduleWorkout = (day, workoutId) => {
    setSchedule({
      ...schedule,
      [day]: schedule[day].filter(id => id !== workoutId)
    });
    toast.success('Treino removido da agenda');
  };

  // Treinos concluídos
  const markWorkoutComplete = (workoutId, data = {}) => {
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout) return;

    const completedWorkout = {
      id: uuidv4(),
      workoutId,
      workoutName: workout.name,
      completedAt: new Date().toISOString(),
      exercises: workout.exercises.map(exercise => ({
        ...exercise,
        actualSets: data[exercise.id]?.sets || exercise.sets,
        actualReps: data[exercise.id]?.reps || exercise.reps,
        actualWeight: data[exercise.id]?.weight || exercise.weight
      }))
    };

    setCompletedWorkouts([...completedWorkouts, completedWorkout]);
    
    // Mostra mensagem motivacional
    const messages = [
      "Ótimo trabalho! Continue conquistando seus objetivos! 💪",
      "Mais um treino concluído! Você é imparável! 🔥",
      "Progresso feito! Sentindo-se mais forte a cada dia! 💯",
      "Você apareceu para si mesmo hoje. Isso é o que importa! 👏",
      "Modo fera ativado e conquistado! 🦁"
    ];
    toast.success(messages[Math.floor(Math.random() * messages.length)]);
    return completedWorkout;
  };

  const addCompletedWorkout = (completedWorkout) => {
    setCompletedWorkouts([...completedWorkouts, completedWorkout]);
    toast.success('Treino concluído com sucesso!');
  };

  const value = {
    workouts,
    completedWorkouts,
    schedule,
    isLoading,
    selectedWorkout,
    setSelectedWorkout,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    duplicateWorkout,
    scheduleWorkout,
    unscheduleWorkout,
    markWorkoutComplete,
    addCompletedWorkout
  };

  return (
    <WorkoutContext.Provider value={value}>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        children
      )}
    </WorkoutContext.Provider>
  );
};