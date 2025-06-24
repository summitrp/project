import { Exercise } from '../types';

export const exerciseDatabase: Exercise[] = [
  // Bodyweight Exercises
  {
    id: 'push_ups',
    name: 'Push-ups',
    description: 'Classic upper body exercise targeting chest, shoulders, and triceps',
    instructions: [
      'Start in a plank position with hands shoulder-width apart',
      'Lower your body until chest nearly touches the floor',
      'Push back up to starting position',
      'Keep your core tight throughout the movement'
    ],
    equipment: ['bodyweight'],
    muscle_groups: ['chest', 'shoulders', 'triceps', 'core'],
    difficulty: 'beginner',
    reps: 10,
    sets: 3,
    rest_time: 60,
    type: 'reps'
  },
  {
    id: 'squats',
    name: 'Bodyweight Squats',
    description: 'Fundamental lower body exercise for legs and glutes',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower down as if sitting in a chair',
      'Keep chest up and knees behind toes',
      'Push through heels to return to standing'
    ],
    equipment: ['bodyweight'],
    muscle_groups: ['quadriceps', 'hamstrings', 'glutes', 'calves'],
    difficulty: 'beginner',
    reps: 15,
    sets: 3,
    rest_time: 45,
    type: 'reps'
  },
  {
    id: 'jumping_jacks',
    name: 'Jumping Jacks',
    description: 'High-energy cardio exercise to get your heart pumping',
    instructions: [
      'Start with feet together and arms at sides',
      'Jump while spreading legs and raising arms overhead',
      'Jump back to starting position',
      'Maintain a steady rhythm'
    ],
    equipment: ['bodyweight'],
    muscle_groups: ['full_body', 'cardiovascular'],
    difficulty: 'beginner',
    duration: 30,
    type: 'timed'
  },
  {
    id: 'mountain_climbers',
    name: 'Mountain Climbers',
    description: 'Dynamic exercise combining cardio and core strength',
    instructions: [
      'Start in plank position',
      'Alternate bringing knees to chest rapidly',
      'Keep hips level and core engaged',
      'Maintain steady breathing'
    ],
    equipment: ['bodyweight'],
    muscle_groups: ['core', 'shoulders', 'legs', 'cardiovascular'],
    difficulty: 'intermediate',
    duration: 45,
    type: 'timed'
  },
  {
    id: 'burpees',
    name: 'Burpees',
    description: 'Full-body exercise combining squat, plank, and jump',
    instructions: [
      'Start standing, then squat down',
      'Place hands on floor and jump feet back to plank',
      'Do a push-up (optional)',
      'Jump feet back to squat, then jump up with arms overhead'
    ],
    equipment: ['bodyweight'],
    muscle_groups: ['full_body', 'cardiovascular'],
    difficulty: 'advanced',
    reps: 8,
    sets: 3,
    rest_time: 90,
    type: 'reps'
  },
  {
    id: 'plank',
    name: 'Plank Hold',
    description: 'Isometric core strengthening exercise',
    instructions: [
      'Start in push-up position',
      'Lower to forearms, keeping body straight',
      'Hold position without letting hips sag',
      'Breathe steadily throughout'
    ],
    equipment: ['bodyweight'],
    muscle_groups: ['core', 'shoulders', 'back'],
    difficulty: 'beginner',
    duration: 30,
    type: 'timed'
  },
  // Dumbbell Exercises
  {
    id: 'dumbbell_press',
    name: 'Dumbbell Chest Press',
    description: 'Upper body strength exercise for chest and arms',
    instructions: [
      'Lie on bench with dumbbells in hands',
      'Press weights up until arms are extended',
      'Lower slowly to chest level',
      'Maintain control throughout the movement'
    ],
    equipment: ['dumbbells', 'bench'],
    muscle_groups: ['chest', 'shoulders', 'triceps'],
    difficulty: 'intermediate',
    reps: 12,
    sets: 3,
    rest_time: 75,
    type: 'reps'
  },
  {
    id: 'dumbbell_rows',
    name: 'Dumbbell Rows',
    description: 'Back strengthening exercise with dumbbells',
    instructions: [
      'Bend over with dumbbell in one hand',
      'Pull weight up to your side',
      'Lower slowly and repeat',
      'Keep back straight throughout'
    ],
    equipment: ['dumbbells'],
    muscle_groups: ['back', 'biceps', 'shoulders'],
    difficulty: 'intermediate',
    reps: 10,
    sets: 3,
    rest_time: 60,
    type: 'reps'
  }
];