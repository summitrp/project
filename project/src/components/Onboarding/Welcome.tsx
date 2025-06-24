import React from 'react';
import { Dumbbell, Heart, Target } from 'lucide-react';

interface WelcomeProps {
  onNext: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <div className="text-center text-white">
        <div className="mb-8">
          <Dumbbell size={80} className="mx-auto mb-4 text-white" />
          <h1 className="text-4xl font-bold mb-2">FitTracker Pro</h1>
          <p className="text-xl opacity-90">Your Personal Fitness Journey</p>
        </div>
        
        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-center space-x-3">
            <Target className="text-yellow-300" size={24} />
            <span className="text-lg">Personalized Workouts</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Heart className="text-red-300" size={24} />
            <span className="text-lg">Track Your Progress</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Dumbbell className="text-green-300" size={24} />
            <span className="text-lg">Unlock Achievements</span>
          </div>
        </div>
        
        <button
          onClick={onNext}
          className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};