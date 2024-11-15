// Timer.tsx
import React, { useEffect, useState } from 'react';

interface TimerProps {
  onTimeout: () => void;
  reset: number;
}

const Timer: React.FC<TimerProps> = ({ onTimeout, reset }) => {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    setSeconds(30);
  }, [reset]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(interval);
        onTimeout();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onTimeout]);

  return (
    <div className="relative pt-1">
      <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
        <div style={{ width: `${(seconds / 30) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-width duration-500 ease-in-out"></div>
      </div>
      <p className="text-center text-lg mt-2">{seconds}s</p>
    </div>
  );
};

export default Timer;
