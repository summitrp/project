import React from 'react';
import { Clock, Repeat, Zap } from 'lucide-react';
import { Exercise } from '../../types';

interface ExerciseCardProps {
  exercise: Exercise;
  isCompleted?: boolean;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, isCompleted = false }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg ${isCompleted ? 'border-2 border-green-500' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">{exercise.name}</h2>
          <p className="text-gray-600 text-sm">{exercise.description}</p>
        </div>
        
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(exercise.difficulty)}`}>
          {exercise.difficulty}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {exercise.type === 'timed' ? (
          <div className="text-center">
            <Clock className="mx-auto mb-1 text-purple-600" size={20} />
            <p className="text-sm text-gray-600">Duration</p>
            <p className="font-semibold">{exercise.duration}s</p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <Repeat className="mx-auto mb-1 text-purple-600" size={20} />
              <p className="text-sm text-gray-600">Reps</p>
              <p className="font-semibold">{exercise.reps}</p>
            </div>
            <div className="text-center">
              <Zap className="mx-auto mb-1 text-purple-600" size={20} />
              <p className="text-sm text-gray-600">Sets</p>
              <p className="font-semibold">{exercise.sets}</p>
            </div>
          </>
        )}
        
        {exercise.rest_time && (
          <div className="text-center">
            <Clock className="mx-auto mb-1 text-blue-600" size={20} />
            <p className="text-sm text-gray-600">Rest</p>
            <p className="font-semibold">{exercise.rest_time}s</p>
          </div>
        )}
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold text-gray-800 mb-2">Target Muscles</h3>
        <div className="flex flex-wrap gap-2">
          {exercise.muscle_groups.map(muscle => (
            <span 
              key={muscle}
              className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
            >
              {muscle.replace('_', ' ')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};