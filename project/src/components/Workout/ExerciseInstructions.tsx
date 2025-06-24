import React, { useState } from 'react';
import { Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';
import { Exercise } from '../../types';

interface ExerciseInstructionsProps {
  exercise: Exercise;
  timer: any;
  onComplete: () => void;
}

export const ExerciseInstructions: React.FC<ExerciseInstructionsProps> = ({ 
  exercise, 
  timer, 
  onComplete 
}) => {
  const [currentSet, setCurrentSet] = useState(1);
  const [currentRep, setCurrentRep] = useState(0);

  const handleRepComplete = () => {
    if (exercise.type === 'reps' && exercise.reps && exercise.sets) {
      if (currentRep < exercise.reps) {
        setCurrentRep(prev => prev + 1);
      } else if (currentSet < exercise.sets) {
        setCurrentSet(prev => prev + 1);
        setCurrentRep(0);
      } else {
        onComplete();
      }
    }
  };

  const handleSetComplete = () => {
    if (exercise.type === 'reps' && exercise.sets) {
      if (currentSet < exercise.sets) {
        setCurrentSet(prev => prev + 1);
        setCurrentRep(0);
      } else {
        onComplete();
      }
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Exercise Instructions</h3>
      
      <div className="space-y-3 mb-6">
        {exercise.instructions.map((instruction, index) => (
          <div key={index} className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              {index + 1}
            </span>
            <p className="text-gray-700">{instruction}</p>
          </div>
        ))}
      </div>

      {exercise.type === 'timed' ? (
        <div className="text-center">
          <div className="text-6xl font-bold text-purple-600 mb-4">
            {timer.formatTime()}
          </div>
          
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={timer.isRunning ? timer.pauseTimer : timer.startTimer}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                timer.isRunning 
                  ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {timer.isRunning ? <Pause size={20} /> : <Play size={20} />}
              <span>{timer.isRunning ? 'Pause' : 'Start'}</span>
            </button>
            
            <button
              onClick={() => timer.resetTimer()}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <RotateCcw size={20} />
              <span>Reset</span>
            </button>
          </div>

          {timer.isFinished && (
            <div className="text-center">
              <CheckCircle className="mx-auto text-green-600 mb-2" size={48} />
              <p className="text-green-600 font-semibold">Exercise Complete!</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <div className="mb-4">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              Set {currentSet} of {exercise.sets}
            </div>
            <div className="text-lg text-gray-600">
              {currentRep} / {exercise.reps} reps
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleRepComplete}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors font-semibold"
            >
              <span>Rep Complete</span>
            </button>
            
            <button
              onClick={handleSetComplete}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span>Skip Set</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};