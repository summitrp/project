import { Equipment } from '../types';

export const availableEquipment: Equipment[] = [
  // Bodyweight
  { id: 'bodyweight', name: 'Bodyweight Only', category: 'bodyweight' },
  { id: 'yoga_mat', name: 'Yoga Mat', category: 'flexibility' },
  
  // Strength
  { id: 'dumbbells', name: 'Dumbbells', category: 'strength' },
  { id: 'barbell', name: 'Barbell', category: 'strength' },
  { id: 'kettlebell', name: 'Kettlebell', category: 'strength' },
  { id: 'resistance_bands', name: 'Resistance Bands', category: 'strength' },
  { id: 'pull_up_bar', name: 'Pull-up Bar', category: 'strength' },
  { id: 'bench', name: 'Weight Bench', category: 'strength' },
  
  // Cardio
  { id: 'treadmill', name: 'Treadmill', category: 'cardio' },
  { id: 'stationary_bike', name: 'Stationary Bike', category: 'cardio' },
  { id: 'jump_rope', name: 'Jump Rope', category: 'cardio' },
  { id: 'rowing_machine', name: 'Rowing Machine', category: 'cardio' },
];