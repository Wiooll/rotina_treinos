const STORAGE_KEYS = {
  WORKOUTS: 'workouts',
  COMPLETED_WORKOUTS: 'completedWorkouts',
  SCHEDULE: 'schedule'
};

const isValidWorkout = (workout) => {
  return workout && 
         typeof workout === 'object' &&
         typeof workout.name === 'string' &&
         Array.isArray(workout.exercises);
};

const isValidWorkouts = (workouts) => {
  return Array.isArray(workouts) && workouts.every(isValidWorkout);
};

export const saveWorkouts = (workouts) => {
  try {
    if (!isValidWorkouts(workouts)) {
      console.error('Tentativa de salvar dados inválidos:', workouts);
      throw new Error('Dados de treino inválidos');
    }
    localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(workouts));
    console.log('Treinos salvos com sucesso:', workouts);
  } catch (error) {
    console.error('Erro ao salvar treinos:', error);
    throw error;
  }
};

export const getWorkouts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.WORKOUTS);
    if (!data) {
      console.log('Nenhum treino encontrado no storage');
      return [];
    }
    
    const workouts = JSON.parse(data);
    if (!isValidWorkouts(workouts)) {
      console.warn('Dados inválidos encontrados no storage');
      return [];
    }
    
    console.log('Treinos recuperados com sucesso:', workouts);
    return workouts;
  } catch (error) {
    console.error('Erro ao recuperar treinos:', error);
    return [];
  }
};

export const saveCompletedWorkouts = (completedWorkouts) => {
  try {
    if (!Array.isArray(completedWorkouts)) {
      throw new Error('Dados de treinos concluídos inválidos');
    }
    localStorage.setItem(STORAGE_KEYS.COMPLETED_WORKOUTS, JSON.stringify(completedWorkouts));
  } catch (error) {
    console.error('Erro ao salvar treinos concluídos:', error);
    throw error;
  }
};

export const getCompletedWorkouts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_WORKOUTS);
    const completedWorkouts = data ? JSON.parse(data) : [];
    if (!Array.isArray(completedWorkouts)) {
      console.warn('Dados inválidos de treinos concluídos no storage');
      return [];
    }
    return completedWorkouts;
  } catch (error) {
    console.error('Erro ao recuperar treinos concluídos:', error);
    return [];
  }
};

export const saveSchedule = (schedule) => {
  try {
    if (!schedule || typeof schedule !== 'object') {
      throw new Error('Dados de agenda inválidos');
    }
    localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(schedule));
  } catch (error) {
    console.error('Erro ao salvar agenda:', error);
    throw error;
  }
};

export const getSchedule = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
    if (!data) {
      return {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      };
    }
    
    const schedule = JSON.parse(data);
    if (!schedule || typeof schedule !== 'object') {
      console.warn('Dados inválidos de agenda no storage');
      return {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      };
    }
    
    return schedule;
  } catch (error) {
    console.error('Erro ao recuperar agenda:', error);
    return {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    };
  }
}; 