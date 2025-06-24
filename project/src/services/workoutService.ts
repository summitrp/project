import { Exercise, WorkoutPlan, User, FitnessGoal } from '../types';
import { exerciseDatabase } from '../data/exercises';

export const workoutService = {
  generateWorkoutPlan: (user: User): WorkoutPlan => {
    const today = new Date().toISOString().split('T')[0];
    const userEquipment = user.equipment.map(eq => eq.id);
   
    // Filter exercises based on available equipment
    const availableExercises = exerciseDatabase.filter(exercise =>
      exercise.equipment.some(eq => userEquipment.includes(eq) || eq === 'bodyweight')
    );

    // Select exercises based on goal
    let selectedExercises: Exercise[] = [];
    
    switch (user.goal) {
      case 'strength':
        selectedExercises = availableExercises
          .filter(ex => ex.muscle_groups.some(mg => 
            ['chest', 'back', 'shoulders', 'legs', 'arms'].includes(mg)
          ))
          .slice(0, 6);
        break;
      
      case 'weight_loss':
        selectedExercises = availableExercises
          .filter(ex => 
            ex.muscle_groups.includes('cardiovascular') || 
            ex.type === 'timed'
          )
          .slice(0, 8);
        break;
      
      case 'maintenance':
        selectedExercises = availableExercises
          .filter(ex => ex.difficulty === 'beginner' || ex.difficulty === 'intermediate')
          .slice(0, 5);
        break;
    }

    // Ensure we have at least some exercises
    if (selectedExercises.length === 0) {
      selectedExercises = availableExercises.slice(0, 4);
    }

    const estimatedDuration = selectedExercises.reduce((total, exercise) => {
      const exerciseTime = exercise.duration || (exercise.reps! * exercise.sets! / 2);
      const restTime = exercise.rest_time || 60;
      return total + exerciseTime + restTime;
    }, 0);

    return {
      id: `workout_${today}`,
      date: today,
      exercises: selectedExercises,
      estimatedDuration,
      difficulty: user.goal === 'strength' ? 'intermediate' : 'beginner',
      completed: false,
      completedExercises: []
    };
  },

  calculateExperience: (exercise: Exercise, completed: boolean): number => {
    if (!completed) return 0;
    
    const baseXP = 50;
    const difficultyMultiplier = {
      beginner: 1,
      intermediate: 1.5,
      advanced: 2
    };
    
    return Math.floor(baseXP * difficultyMultiplier[exercise.difficulty]);
  },

  getStreakBonus: (streak: number): number => {
    if (streak >= 30) return 100;
    if (streak >= 14) return 50;
    if (streak >= 7) return 25;
    return 0;
  }
};