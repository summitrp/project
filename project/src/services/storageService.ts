import { User, WorkoutPlan, DailyTodo } from '../types';

const STORAGE_KEYS = {
  USER: 'fitness_tracker_user',
  WORKOUTS: 'fitness_tracker_workouts',
  CURRENT_WORKOUT: 'fitness_tracker_current_workout',
  DAILY_TODOS: 'fitness_tracker_daily_todos',
  SETTINGS: 'fitness_tracker_settings'
};

export const storageService = {
  // User data
  saveUser: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getUser: (): User | null => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    return userData ? JSON.parse(userData) : null;
  },

  // Workout plans
  saveWorkoutPlan: (plan: WorkoutPlan): void => {
    const plans = storageService.getWorkoutPlans();
    const existingIndex = plans.findIndex(p => p.id === plan.id);
    
    if (existingIndex >= 0) {
      plans[existingIndex] = plan;
    } else {
      plans.push(plan);
    }
    
    localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(plans));
  },

  getWorkoutPlans: (): WorkoutPlan[] => {
    const plans = localStorage.getItem(STORAGE_KEYS.WORKOUTS);
    return plans ? JSON.parse(plans) : [];
  },

  getTodayWorkoutPlan: (): WorkoutPlan | null => {
    const plans = storageService.getWorkoutPlans();
    const today = new Date().toISOString().split('T')[0];
    return plans.find(p => p.date === today) || null;
  },

  // Daily todos
  saveDailyTodos: (todos: DailyTodo[]): void => {
    const todosWithDate = {
      date: new Date().toISOString().split('T')[0],
      todos
    };
    localStorage.setItem(STORAGE_KEYS.DAILY_TODOS, JSON.stringify(todosWithDate));
  },

  getDailyTodos: (): DailyTodo[] => {
    const todosData = localStorage.getItem(STORAGE_KEYS.DAILY_TODOS);
    if (!todosData) return [];
    
    const parsed = JSON.parse(todosData);
    const today = new Date().toISOString().split('T')[0];
    
    // Reset todos if it's a new day
    if (parsed.date !== today) {
      const resetTodos = parsed.todos.map((todo: DailyTodo) => ({
        ...todo,
        completed: false,
        current: 0
      }));
      storageService.saveDailyTodos(resetTodos);
      return resetTodos;
    }
    
    return parsed.todos;
  },

  // Settings
  saveSettings: (settings: any): void => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  getSettings: (): any => {
    const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return settings ? JSON.parse(settings) : {};
  }
};