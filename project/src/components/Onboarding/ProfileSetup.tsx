import React, { useState } from 'react';
import { ChevronLeft, User } from 'lucide-react';
import { Equipment, FitnessGoal, User as UserType } from '../../types';
import { ranks } from '../../data/ranks';

interface ProfileSetupProps {
  equipment: Equipment[];
  goal: FitnessGoal;
  onComplete: (user: UserType) => void;
  onBack: () => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ 
  equipment, 
  goal, 
  onComplete, 
  onBack 
}) => {
  const [name, setName] = useState('');

  const handleComplete = () => {
    if (!name.trim()) return;

    const user: UserType = {
      id: Date.now().toString(),
      name: name.trim(),
      equipment,
      goal,
      rank: ranks[0], // Start with Bronze
      experience: 0,
      streak: 0,
      lastWorkoutDate: null,
      theme: 'default',
      dailyTodos: [
        {
          id: 'water',
          title: 'Drink Water',
          description: 'Stay hydrated throughout the day',
          completed: false,
          type: 'water',
          target: 8,
          current: 0,
          unit: 'glasses'
        },
        {
          id: 'steps',
          title: 'Take Steps',
          description: 'Get moving with daily steps',
          completed: false,
          type: 'steps',
          target: 10000,
          current: 0,
          unit: 'steps'
        }
      ],
      completedWorkouts: 0,
      createdAt: new Date().toISOString()
    };

    onComplete(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-purple-600 mb-4"
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Almost there!
          </h2>
          <p className="text-gray-600">
            Let's personalize your experience. What should we call you?
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={40} className="text-white" />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              maxLength={50}
            />
          </div>

          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex justify-between">
              <span>Equipment:</span>
              <span className="font-medium">{equipment.length} items</span>
            </div>
            <div className="flex justify-between">
              <span>Goal:</span>
              <span className="font-medium capitalize">{goal.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span>Starting Rank:</span>
              <span className="font-medium">{ranks[0].name} {ranks[0].icon}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleComplete}
          disabled={!name.trim()}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            name.trim()
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Start My Fitness Journey
        </button>
      </div>
    </div>
  );
};