import { Rank } from '../types';

export const ranks: Rank[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    minExperience: 0,
    color: '#CD7F32',
    icon: '🥉',
    unlocks: ['basic_themes']
  },
  {
    id: 'silver',
    name: 'Silver',
    minExperience: 500,
    color: '#C0C0C0',
    icon: '🥈',
    unlocks: ['music_player', 'progress_charts']
  },
  {
    id: 'gold',
    name: 'Gold',
    minExperience: 1200,
    color: '#FFD700',
    icon: '🥇',
    unlocks: ['custom_workouts', 'advanced_stats']
  },
  {
    id: 'platinum',
    name: 'Platinum',
    minExperience: 2500,
    color: '#E5E4E2',
    icon: '💎',
    unlocks: ['dark_theme', 'workout_sharing']
  },
  {
    id: 'diamond',
    name: 'Diamond',
    minExperience: 5000,
    color: '#B9F2FF',
    icon: '💠',
    unlocks: ['premium_exercises', 'ai_coaching']
  },
  {
    id: 'elite',
    name: 'Elite',
    minExperience: 10000,
    color: '#9932CC',
    icon: '👑',
    unlocks: ['exclusive_content', 'priority_support']
  },
  {
    id: 'unreal',
    name: 'Unreal',
    minExperience: 20000,
    color: '#FF6B35',
    icon: '🔥',
    unlocks: ['legendary_themes', 'beta_features']
  },
  {
    id: 'beast',
    name: 'Beast',
    minExperience: 50000,
    color: '#8B0000',
    icon: '🦁',
    unlocks: ['all_content', 'beast_mode']
  }
];