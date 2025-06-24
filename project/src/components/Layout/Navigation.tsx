import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Dumbbell, Trophy, User, Settings } from 'lucide-react';

export const Navigation: React.FC = () => {
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/workout', icon: Dumbbell, label: 'Workout' },
    { path: '/progress', icon: Trophy, label: 'Progress' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center py-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  isActive
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:text-purple-600'
                }`
              }
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};