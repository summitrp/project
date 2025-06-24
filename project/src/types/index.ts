export interface User {
  id: string;
  name: string;
  equipment: Equipment[];
  goal: FitnessGoal;
  rank: Rank;
  experience: number;
  streak: number;
  lastWorkoutDate: string | null;
  theme: string;
  dailyTodos: DailyTodo[];
  completedWorkouts: number;
  createdAt: string;
}

export interface Equipment {
  id: string;
  name: string;
  category: 'cardio' | 'strength' | 'flexibility' | 'bodyweight';
}

export type FitnessGoal = 'strength' | 'weight_loss' | 'maintenance';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  instructions: string[];
  equipment: string[];
  muscle_groups: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration?: number; // in seconds for timed exercises
  reps?: number; // for rep-based exercises
  sets?: number;
  rest_time?: number; // in seconds
  type: 'timed' | 'reps' | 'duration';
  animation?: string;
}

export interface WorkoutPlan {
  id: string;
  date: string;
  exercises: Exercise[];
  estimatedDuration: number;
  difficulty: string;
  completed: boolean;
  completedExercises: string[];
}

export interface DailyTodo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  type: 'water' | 'steps' | 'sleep' | 'custom';
  target?: number;
  current?: number;
  unit?: string;
}

export interface Rank {
  id: string;
  name: string;
  minExperience: number;
  color: string;
  icon: string;
  unlocks: string[];
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };
  requiredRank: string;
}