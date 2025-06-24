import { User, Rank } from '../types';
import { ranks } from '../data/ranks';

export const rankingService = {
  getCurrentRank: (experience: number): Rank => {
    const sortedRanks = ranks.sort((a, b) => b.minExperience - a.minExperience);
    return sortedRanks.find(rank => experience >= rank.minExperience) || ranks[0];
  },

  getNextRank: (experience: number): Rank | null => {
    const sortedRanks = ranks.sort((a, b) => a.minExperience - b.minExperience);
    return sortedRanks.find(rank => experience < rank.minExperience) || null;
  },

  getProgressToNextRank: (experience: number): number => {
    const currentRank = rankingService.getCurrentRank(experience);
    const nextRank = rankingService.getNextRank(experience);
    
    if (!nextRank) return 100;
    
    const progressNeeded = nextRank.minExperience - currentRank.minExperience;
    const currentProgress = experience - currentRank.minExperience;
    
    return Math.min(100, Math.max(0, (currentProgress / progressNeeded) * 100));
  },

  handleSkippedDay: (user: User): User => {
    const today = new Date().toISOString().split('T')[0];
    const lastWorkout = user.lastWorkoutDate;
    
    if (lastWorkout) {
      const lastDate = new Date(lastWorkout);
      const todayDate = new Date(today);
      const daysDiff = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff > 1) {
        // Reduce experience for skipped days
        const experienceLoss = Math.min(user.experience * 0.05, 100) * (daysDiff - 1);
        return {
          ...user,
          experience: Math.max(0, user.experience - experienceLoss),
          streak: 0
        };
      }
    }
    
    return user;
  },

  getUnlockedFeatures: (rank: Rank): string[] => {
    const allRanks = ranks.sort((a, b) => a.minExperience - b.minExperience);
    const currentRankIndex = allRanks.findIndex(r => r.id === rank.id);
    
    return allRanks
      .slice(0, currentRankIndex + 1)
      .flatMap(r => r.unlocks);
  }
};