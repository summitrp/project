import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { MusicPlayer } from '../MusicPlayer/MusicPlayer';
import { useUser } from '../../hooks/useUser';
import { rankingService } from '../../services/rankingService';

export const Layout: React.FC = () => {
  const { user } = useUser();

  const showMusicPlayer = user && rankingService.getUnlockedFeatures(user.rank).includes('music_player');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-md mx-auto relative">
        <main className="pb-20">
          <Outlet />
        </main>
        
        {showMusicPlayer && (
          <div className="absolute bottom-16 left-0 right-0 px-4">
            <MusicPlayer />
          </div>
        )}
        
        <Navigation />
      </div>
    </div>
  );
};