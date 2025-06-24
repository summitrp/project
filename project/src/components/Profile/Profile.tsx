import React from 'react';
import { Trophy, Calendar, Flame, Target } from 'lucide-react';
import { useUser } from '../../hooks/useUser';
import { rankingService } from '../../services/rankingService';
import { RankDisplay } from '../Common/RankDisplay';
import { ProgressBar } from '../Common/ProgressBar';

export const Profile: React.FC = () => {
  const { user } = useUser();

  if (!user) return null;

  const nextRank = rankingService.getNextRank(user.experience);
  const progressToNext = rankingService.getProgressToNextRank(user.experience);
  const unlockedFeatures = rankingService.getUnlockedFeatures(user.rank);

  const stats = [
    {
      icon: Trophy,
      label: 'Workouts Completed',
      value: user.completedWorkouts.toString(),
      color: 'text-yellow-600'
    },
    {
      icon: Flame,
      label: 'Current Streak',
      value: `${user.streak} days`,
      color: 'text-red-600'
    },
    {
      icon: Target,
      label: 'Experience Points',
      value: user.experience.toLocaleString(),
      color: 'text-purple-600'
    },
    {
      icon: Calendar,
      label: 'Member Since',
      value: new Date(user.createdAt).toLocaleDateString(),
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile</h1>
          <p className="text-gray-600">Track your fitness journey progress</p>
        </div>

        {/* User Info */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="text-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-600 capitalize">{user.goal.replace('_', ' ')} focused</p>
          </div>
          
          <RankDisplay rank={user.rank} experience={user.experience} />
          
          {nextRank && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress to {nextRank.name}</span>
                <span>{Math.round(progressToNext)}%</span>
              </div>
              <ProgressBar progress={progressToNext} />
              <p className="text-xs text-gray-500 mt-1">
                {(nextRank.minExperience - user.experience).toLocaleString()} XP needed
              </p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <Icon className={`mx-auto mb-2 ${stat.color}`} size={24} />
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="font-semibold text-gray-800">{stat.value}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Equipment */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Equipment</h3>
          <div className="flex flex-wrap gap-2">
            {user.equipment.map(equipment => (
              <span 
                key={equipment.id}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
              >
                {equipment.name}
              </span>
            ))}
          </div>
        </div>

        {/* Unlocked Features */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Unlocked Features</h3>
          <div className="grid grid-cols-2 gap-2">
            {unlockedFeatures.map(feature => (
              <div 
                key={feature}
                className="p-3 bg-green-50 border border-green-200 rounded-lg text-center"
              >
                <span className="text-sm font-medium text-green-800">
                  {feature.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Rank Preview */}
        {nextRank && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Next Rank Unlocks</h3>
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl">{nextRank.icon}</span>
              <div>
                <h4 className="font-semibold" style={{ color: nextRank.color }}>
                  {nextRank.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {nextRank.minExperience.toLocaleString()} XP required
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {nextRank.unlocks.map(unlock => (
                <span 
                  key={unlock}
                  className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium"
                >
                  {unlock.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};