import React, { useState, useEffect } from 'react';
import { ChevronLeft, Play, Pause, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { useTimer } from '../../hooks/useTimer';
import { WorkoutPlan, Exercise } from '../../types';
import { storageService } from '../../services/storageService';
import { workoutService } from '../../services/workoutService';
import { ExerciseCard } from './ExerciseCard';
import { ExerciseInstructions } from './ExerciseInstructions';

export const WorkoutScreen: React.FC = () => {
  const { user, addExperience, updateStreak } = useUser();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<WorkoutPlan | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isInExercise, setIsInExercise] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const currentExercise = workout?.exercises[currentExerciseIndex];
  const timer = useTimer(currentExercise?.duration || 0);

  useEffect(() => {
    if (!user) return;

    const todayWorkout = storageService.getTodayWorkoutPlan();
    if (todayWorkout) {
      setWorkout(todayWorkout);
      setCompletedExercises(todayWorkout.completedExercises);
    } else {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (timer.isFinished && currentExercise) {
      handleExerciseComplete();
    }
  }, [timer.isFinished, currentExercise]);

  const handleExerciseComplete = () => {
    if (!workout || !currentExercise) return;

    const newCompletedExercises = [...completedExercises, currentExercise.id];
    setCompletedExercises(newCompletedExercises);

    // Add experience
    const xp = workoutService.calculateExperience(currentExercise, true);
    addExperience(xp);

    // Update workout progress
    const updatedWorkout = {
      ...workout,
      completedExercises: newCompletedExercises,
      completed: newCompletedExercises.length === workout.exercises.length
    };
    setWorkout(updatedWorkout);
    storageService.saveWorkoutPlan(updatedWorkout);

    // If workout is complete
    if (updatedWorkout.completed) {
      updateStreak(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      // Move to next exercise
      setTimeout(() => {
        setCurrentExerciseIndex(prev => prev + 1);
        setIsInExercise(false);
        if (workout.exercises[currentExerciseIndex + 1]?.duration) {
          timer.resetTimer(workout.exercises[currentExerciseIndex + 1].duration);
        }
      }, 1000);
    }
  };

  const handleStartExercise = () => {
    setIsInExercise(true);
    if (currentExercise?.type === 'timed') {
      timer.startTimer();
    }
  };

  const handleSkipExercise = () => {
    if (currentExerciseIndex < workout!.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setIsInExercise(false);
      if (workout!.exercises[currentExerciseIndex + 1]?.duration) {
        timer.resetTimer(workout!.exercises[currentExerciseIndex + 1].duration);
      }
    }
  };

  if (!workout || !currentExercise) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading workout...</p>
      </div>
    </div>;
  }

  const progress = ((currentExerciseIndex + 1) / workout.exercises.length) * 100;
  const isCompleted = completedExercises.includes(currentExercise.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-purple-600"
            >
              <ChevronLeft size={20} />
              <span>Back</span>
            </button>
            <div className="text-center">
              <h1 className="font-semibold text-gray-800">Today's Workout</h1>
              <p className="text-sm text-gray-600">
                {currentExerciseIndex + 1} of {workout.exercises.length}
              </p>
            </div>
            <div className="w-16" />
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Exercise Content */}
        <div className="p-4">
          {workout.completed ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Workout Complete!
              </h2>
              <p className="text-gray-600 mb-4">
                Great job! You've completed today's workout.
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          ) : (
            <>
              <ExerciseCard 
                exercise={currentExercise}
                isCompleted={isCompleted}
              />
              
              {isInExercise ? (
                <div className="mt-6">
                  <ExerciseInstructions 
                    exercise={currentExercise}
                    timer={timer}
                    onComplete={handleExerciseComplete}
                  />
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  <button
                    onClick={handleStartExercise}
                    disabled={isCompleted}
                    className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                      isCompleted
                        ? 'bg-green-600 text-white'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {isCompleted ? 'Completed ✓' : 'Start Exercise'}
                  </button>
                  
                  <button
                    onClick={handleSkipExercise}
                    className="w-full py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Skip Exercise
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};