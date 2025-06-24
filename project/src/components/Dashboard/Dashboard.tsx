import React, { useEffect, useState } from 'react';
import { Calendar, Trophy, Target, Droplets } from 'lucide-react';
import { useUser } from '../../hooks/useUser';
import { WorkoutPlan, DailyTodo } from '../../types';
import { workoutService } from '../../services/workoutService';
import { rankingService } from '../../services/rankingService';
import { storageService } from '../../services/storageService';
import { RankDisplay } from '../Common/RankDisplay';
import { ProgressBar } from '../Common/ProgressBar';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user, updateUser } = useUser();
  const [todayWorkout, setTodayWorkout] = useState<WorkoutPlan | null>(null);
  const [dailyTodos, setDailyTodos] = useState<DailyTodo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    // Load or generate today's workout
    let workout = storageService.getTodayWorkoutPlan();
    if (!workout) {
      workout = workoutService.generateWorkoutPlan(user);
      storageService.saveWorkoutPlan(workout);
    }
    setTodayWorkout(workout);

    // Load daily todos
    const todos = storageService.getDailyTodos();
    if (todos.length === 0) {
      setDailyTodos(user.dailyTodos);
      storageService.saveDailyTodos(user.dailyTodos);
    } else {
      setDailyTodos(todos);
    }
  }, [user]);

  const handleTodoToggle = (todoId: string) => {
    const updatedTodos = dailyTodos.map(todo =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    setDailyTodos(updatedTodos);
    storageService.saveDailyTodos(updatedTodos);
  };

  const handleTodoProgress = (todoId: string, increment: number) => {
    const updatedTodos = dailyTodos.map(todo => {
      if (todo.id === todoId && todo.target && todo.current !== undefined) {
        const newCurrent = Math.min(todo.target, Math.max(0, todo.current + increment));
        return {
          ...todo,
          current: newCurrent,
          completed: newCurrent >= todo.target
        };
      }
      return todo;
    });
    setDailyTodos(updatedTodos);
    storageService.saveDailyTodos(updatedTodos);
  };

  const completedTodos = dailyTodos.filter(todo => todo.completed).length;
  const totalTodos = dailyTodos.length;
  const workoutCompleted = todayWorkout?.completed || false;
  const dailyProgress = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

  if (!user) return null;

  const nextRank = rankingService.getNextRank(user.experience);
  const progressToNext = rankingService.getProgressToNextRank(user.experience);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">Ready to crush your fitness goals?</p>
        </div>

        {/* Rank Display */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <RankDisplay rank={user.rank} experience={user.experience} />
          {nextRank && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress to {nextRank.name}</span>
                <span>{Math.round(progressToNext)}%</span>
              </div>
              <ProgressBar progress={progressToNext} />
            </div>
          )}
        </div>

        {/* Daily Progress */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Today's Progress</h2>
            <Calendar className="text-purple-600" size={24} />
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Daily Tasks</span>
                <span>{completedTodos}/{totalTodos}</span>
              </div>
              <ProgressBar progress={dailyProgress} />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Workout</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                workoutCompleted 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {workoutCompleted ? 'Completed' : 'Pending'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Streak</span>
              <span className="text-purple-600 font-semibold">{user.streak} days</span>
            </div>
          </div>
        </div>

        {/* Today's Workout */}
        {todayWorkout && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Today's Workout</h2>
              <Trophy className="text-purple-600" size={24} />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Exercises</span>
                <span>{todayWorkout.exercises.length}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Estimated Time</span>
                <span>{Math.round(todayWorkout.estimatedDuration / 60)} min</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Difficulty</span>
                <span className="capitalize">{todayWorkout.difficulty}</span>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/workout')}
              className={`w-full mt-4 py-3 rounded-lg font-semibold transition-colors ${
                workoutCompleted
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {workoutCompleted ? 'Workout Complete!' : 'Start Workout'}
            </button>
          </div>
        )}

        {/* Daily Todos */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Daily Goals</h2>
            <Target className="text-purple-600" size={24} />
          </div>
          
          <div className="space-y-3">
            {dailyTodos.map(todo => (
              <div key={todo.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {todo.type === 'water' && <Droplets className="text-blue-500" size={20} />}
                  <div>
                    <h3 className="font-medium text-gray-800">{todo.title}</h3>
                    {todo.target && (
                      <p className="text-sm text-gray-600">
                        {todo.current || 0} / {todo.target} {todo.unit}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {todo.target && (
                    <>
                      <button
                        onClick={() => handleTodoProgress(todo.id, -1)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                      >
                        -
                      </button>
                      <button
                        onClick={() => handleTodoProgress(todo.id, 1)}
                        className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white hover:bg-purple-700"
                      >
                        +
                      </button>
                    </>
                  )}
                  
                  <button
                    onClick={() => handleTodoToggle(todo.id)}
                    className={`w-6 h-6 rounded-full border-2 transition-colors ${
                      todo.completed
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300 hover:border-purple-500'
                    }`}
                  >
                    {todo.completed && (
                      <div className="w-full h-full rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};