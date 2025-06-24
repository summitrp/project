import { useState, useEffect } from 'react';
import { User } from '../types';
import { storageService } from '../services/storageService';
import { rankingService } from '../services/rankingService';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      const savedUser = storageService.getUser();
      if (savedUser) {
        // Check for skipped days and update rank
        const updatedUser = rankingService.handleSkippedDay(savedUser);
        const currentRank = rankingService.getCurrentRank(updatedUser.experience);
        
        const finalUser = {
          ...updatedUser,
          rank: currentRank
        };
        
        setUser(finalUser);
        if (finalUser !== savedUser) {
          storageService.saveUser(finalUser);
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    const currentRank = rankingService.getCurrentRank(updatedUser.experience);
    updatedUser.rank = currentRank;
    
    setUser(updatedUser);
    storageService.saveUser(updatedUser);
  };

  const addExperience = (amount: number) => {
    if (!user) return;
    
    const newExperience = user.experience + amount;
    updateUser({ experience: newExperience });
  };

  const updateStreak = (increment: boolean = true) => {
    if (!user) return;
    
    const today = new Date().toISOString().split('T')[0];
    const newStreak = increment ? user.streak + 1 : 0;
    
    updateUser({
      streak: newStreak,
      lastWorkoutDate: today
    });
  };

  return {
    user,
    isLoading,
    updateUser,
    addExperience,
    updateStreak
  };
};