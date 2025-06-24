import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: number;
}

const defaultTracks: Track[] = [
  {
    id: '1',
    title: 'Workout Motivation',
    artist: 'FitTracker',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 180
  },
  {
    id: '2',
    title: 'High Energy Beats',
    artist: 'FitTracker',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 210
  },
  {
    id: '3',
    title: 'Cardio Boost',
    artist: 'FitTracker',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 195
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMinimized, setIsMinimized] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % defaultTracks.length);
    setCurrentTime(0);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + defaultTracks.length) % defaultTracks.length);
    setCurrentTime(0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const track = defaultTracks[currentTrack];

  return (
    <div className={`bg-white rounded-xl shadow-lg transition-all duration-300 ${
      isMinimized ? 'p-3' : 'p-4'
    }`}>
      <audio
        ref={audioRef}
        src={track.url}
        onLoadedData={() => {
          if (isPlaying) {
            audioRef.current?.play();
          }
        }}
      />

      {isMinimized ? (
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsMinimized(false)}
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{track.title}</p>
              <p className="text-xs text-gray-500 truncate">{track.artist}</p>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {formatTime(currentTime)} / {formatTime(track.duration)}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{track.title}</h3>
              <p className="text-sm text-gray-600">{track.artist}</p>
            </div>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(track.duration)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-purple-600 h-1 rounded-full transition-all duration-300"
                style={{ width: `${(currentTime / track.duration) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevTrack}
              className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <SkipBack size={20} />
            </button>
            
            <button
              onClick={togglePlay}
              className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            <button
              onClick={nextTrack}
              className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};