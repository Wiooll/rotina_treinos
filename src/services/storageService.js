export const saveWorkouts = (workouts) => {
  localStorage.setItem('workouts', JSON.stringify(workouts));
};

export const getWorkouts = () => {
  const data = localStorage.getItem('workouts');
  return data ? JSON.parse(data) : [];
};

export const saveCompletedWorkouts = (completedWorkouts) => {
  localStorage.setItem('completedWorkouts', JSON.stringify(completedWorkouts));
};

export const getCompletedWorkouts = () => {
  const data = localStorage.getItem('completedWorkouts');
  return data ? JSON.parse(data) : [];
};

export const saveSchedule = (schedule) => {
  localStorage.setItem('schedule', JSON.stringify(schedule));
};

export const getSchedule = () => {
  const data = localStorage.getItem('schedule');
  return data ? JSON.parse(data) : null;
}; 