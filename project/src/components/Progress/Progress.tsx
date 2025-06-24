import React from 'react';
import { TrendingUp, Calendar, Target, Award } from 'lucide-react';
import { useUser } from '../../hooks/useUser';
import { ProgressBar } from '../Common/ProgressBar';

export const Progress: React.FC = () => {
  const { user } = useUser();

  if (!user) return null;

  // Mock weekly progress data
  const weeklyProgress = [
    { day: 'Mon', completed: true, exercises: 6 },
    { day: 'Tue', completed: true, exercises: 5 },
    { day: 'Wed', completed: false, exercises: 0 },
    { day: 'Thu', completed: true, exercises: 7 },
    { day: 'Fri', completed: true, exercises: 4 },
    { day: 'Sat', completed: false, exercises: 0 },
    { day: 'Sun', completed: true, exercises: 8 }
  ];

  const weeklyCompletionRate = (weeklyProgress.filter(day => day.completed).length / 7) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Progress</h1>
          <p className="text-gray-600">Track your fitness achievements</p>
        </div>

        {/* Weekly Overview */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">This Week</h2>
            <TrendingUp className="text-purple-600" size={24} />
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Completion Rate</span>
              <span>{Math.round(weeklyCompletionRate)}%</span>
            </div>
            <ProgressBar progress={weeklyCompletionRate} />
          </div>

          <div className="grid grid-cols-7 gap-2">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="text-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mb-1 ${
                  day.completed 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {day.exercises}
                </div>
                <span className="text-xs text-gray-600">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Stats */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Achievements</h2>
            <Award className="text-purple-600" size={24} />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-800">Consistency Champion</h3>
                <p className="text-sm text-gray-600">Current streak: {user.streak} days</p>
              </div>
              <div className="text-purple-600 font-bold">
                {user.streak >= 7 ? '✅' : '⏳'}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-800">Experience Collector</h3>
                <p className="text-sm text-gray-600">{user.experience.toLocaleString()} XP earned</p>
              </div>
              <div className="text-blue-600 font-bold">
                {user.experience >= 1000 ? '✅' : '⏳'}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-800">Workout Warrior</h3>
                <p className="text-sm text-gray-600">{user.completedWorkouts} workouts completed</p>
              </div>
              <div className="text-green-600 font-bold">
                {user.completedWorkouts >= 10 ? '✅' : '⏳'}
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Goal */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Monthly Goal</h2>
            <Target className="text-purple-600" size={24} />
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Workouts Completed</span>
                <span>{user.completedWorkouts} / 20</span>
              </div>
              <ProgressBar progress={(user.completedWorkouts / 20) * 100} />
            </div>

            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Experience Points</span>
                <span>{user.experience} / 5000</span>
              </div>
              <ProgressBar progress={(user.experience / 5000) * 100} />
            </div>
          </div>
        </div>

        {/* Streak Calendar */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Activity Calendar</h2>
            <Calendar className="text-purple-600" size={24} />
          </div>
          
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🔥</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {user.streak} Day Streak
            </h3>
            <p className="text-gray-600">
              Keep it up! Don't break the chain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};