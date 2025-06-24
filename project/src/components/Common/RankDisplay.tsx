import React from 'react';
import { Rank } from '../../types';

interface RankDisplayProps {
  rank: Rank;
  experience: number;
  showProgress?: boolean;
}

export const RankDisplay: React.FC<RankDisplayProps> = ({ 
  rank, 
  experience, 
  showProgress = false 
}) => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center space-x-3 mb-2">
        <span className="text-3xl">{rank.icon}</span>
        <div>
          <h3 className="text-xl font-bold" style={{ color: rank.color }}>
            {rank.name}
          </h3>
          <p className="text-sm text-gray-600">{experience.toLocaleString()} XP</p>
        </div>
      </div>
      
      {showProgress && (
        <div className="mt-4">
          <div className="text-sm text-gray-600 mb-2">
            Unlocked Features:
          </div>
          <div className="flex flex-wrap gap-2">
            {rank.unlocks.map(unlock => (
              <span 
                key={unlock}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {unlock.replace('_', ' ')}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};