import React, { useState } from 'react';
import { Palette, Bell, Shield, Info, LogOut } from 'lucide-react';
import { useUser } from '../../hooks/useUser';
import { themes } from '../../data/themes';
import { rankingService } from '../../services/rankingService';

export const Settings: React.FC = () => {
  const { user, updateUser } = useUser();
  const [showThemes, setShowThemes] = useState(false);

  if (!user) return null;

  const unlockedFeatures = rankingService.getUnlockedFeatures(user.rank);
  const availableThemes = themes.filter(theme => 
    user.rank.name.toLowerCase() === 'beast' || 
    unlockedFeatures.includes(theme.requiredRank) ||
    theme.id === 'default'
  );

  const handleThemeChange = (themeId: string) => {
    updateUser({ theme: themeId });
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600">Customize your fitness experience</p>
        </div>

        {/* Theme Settings */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <button
            onClick={() => setShowThemes(!showThemes)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <Palette className="text-purple-600" size={24} />
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Themes</h3>
                <p className="text-sm text-gray-600">Customize your app appearance</p>
              </div>
            </div>
            <span className="text-gray-400">{showThemes ? '−' : '+'}</span>
          </button>
          
          {showThemes && (
            <div className="mt-4 space-y-3">
              {availableThemes.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                    user.theme === theme.id
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">{theme.name}</h4>
                      <p className="text-xs text-gray-600">
                        Requires: {theme.requiredRank}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: theme.colors.secondary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="text-purple-600" size={24} />
              <div>
                <h3 className="font-semibold text-gray-800">Notifications</h3>
                <p className="text-sm text-gray-600">Workout reminders and achievements</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <Shield className="text-purple-600" size={24} />
            <div>
              <h3 className="font-semibold text-gray-800">Privacy & Data</h3>
              <p className="text-sm text-gray-600">Your data is stored locally on your device</p>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <Info className="text-purple-600" size={24} />
            <div>
              <h3 className="font-semibold text-gray-800">About FitTracker Pro</h3>
              <p className="text-sm text-gray-600">Version 1.0.0</p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 text-red-600 hover:bg-red-50 p-3 rounded-lg transition-colors"
          >
            <LogOut size={24} />
            <span className="font-semibold">Reset App Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};