import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, X } from 'lucide-react';

function TimerModal({ initialTime = 60, onClose }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/notification.mp3');
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            audioRef.current.play().catch(() => {});
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(initialTime);
    setIsRunning(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-sm mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Tempo de Descanso</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="text-5xl font-bold mb-2 font-mono">
            {formatTime(timeLeft)}
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {timeLeft === 0 ? 'Tempo finalizado!' : 'Tempo restante'}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={toggleTimer}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900/30 transition-colors"
          >
            {isRunning ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={resetTimer}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {timeLeft === 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Continuar Treino
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TimerModal; 