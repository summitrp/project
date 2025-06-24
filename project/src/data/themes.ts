import { Theme } from '../types';

export const themes: Theme[] = [
  {
    id: 'default',
    name: 'Default',
    colors: {
      primary: '#8B5CF6',
      secondary: '#3B82F6',
      accent: '#10B981',
      background: '#FFFFFF',
      surface: '#F8FAFC',
      text: '#1F2937'
    },
    requiredRank: 'bronze'
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    colors: {
      primary: '#A78BFA',
      secondary: '#60A5FA',
      accent: '#34D399',
      background: '#111827',
      surface: '#1F2937',
      text: '#F9FAFB'
    },
    requiredRank: 'platinum'
  },
  {
    id: 'neon',
    name: 'Neon Glow',
    colors: {
      primary: '#FF00FF',
      secondary: '#00FFFF',
      accent: '#FFFF00',
      background: '#000000',
      surface: '#1A1A1A',
      text: '#FFFFFF'
    },
    requiredRank: 'diamond'
  },
  {
    id: 'forest',
    name: 'Forest Green',
    colors: {
      primary: '#059669',
      secondary: '#0D9488',
      accent: '#F59E0B',
      background: '#F0FDF4',
      surface: '#DCFCE7',
      text: '#064E3B'
    },
    requiredRank: 'gold'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    colors: {
      primary: '#F97316',
      secondary: '#EF4444',
      accent: '#FBBF24',
      background: '#FFF7ED',
      surface: '#FFEDD5',
      text: '#9A3412'
    },
    requiredRank: 'elite'
  },
  {
    id: 'beast',
    name: 'Beast Mode',
    colors: {
      primary: '#DC2626',
      secondary: '#B91C1C',
      accent: '#FBBF24',
      background: '#1C1917',
      surface: '#292524',
      text: '#FEF2F2'
    },
    requiredRank: 'beast'
  }
];