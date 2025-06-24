import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Zap, Target, Heart } from 'lucide-react';
import { FitnessGoal } from '../../types';

interface GoalSelectorProps {
  onNext: (goal: FitnessGoal) => void;
  onBack: () => void;
}

export const GoalSelector: React.FC<GoalSelectorProps> = ({ onNext, onBack }) => {
  const [selectedGoal, setSelectedGoal] = useState<FitnessGoal | null>(null);

  const goals = [
    {
      id: 'strength' as FitnessGoal,
      title: 'Get Stronger',
      description: 'Build muscle and increase strength with resistance training',
      icon: Zap,
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'weight_loss' as FitnessGoal,
      title: 'Lose Weight',
      description: 'Burn calories and fat with high-intensity cardio workouts',
      icon: Target,
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 'maintenance' as FitnessGoal,
      title: 'Stay Fit',
      description: 'Maintain current fitness with balanced, moderate workouts',
      icon: Heart,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const handleNext = () => {
    if (selectedGoal) {
      onNext(selectedGoal);
    }
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
            What's your fitness goal?
          </h2>
          <p className="text-gray-600">
            Tell us what you want to achieve and we'll create the perfect workout plan for you.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {goals.map(goal => {
            const Icon = goal.icon;
            return (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
                  selectedGoal === goal.id
                    ? 'border-purple-600 bg-purple-50 shadow-lg transform scale-105'
                    : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${goal.color} text-white`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">{goal.title}</h3>
                    <p className="text-gray-600 text-sm">{goal.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={!selectedGoal}
          className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
            selectedGoal
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span>Continue</span>
          <ChevronRight size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
};