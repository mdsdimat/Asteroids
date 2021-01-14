import { useState, useEffect, useRef } from 'react';

export default function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const intervalRef = useRef(0);

  const clearIntervalRef = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
  };

  const start = () => {
    if (intervalRef.current === 0) {
      setIsRunning(true);
      intervalRef.current = window.setInterval(() => setSeconds((s) => (s + 1)), 1000);
    }
  };

  const pause = () => {
    setIsRunning(false);
    clearIntervalRef();
  };

  const reset = () => {
    clearIntervalRef();
    setSeconds(0);
  };

  useEffect(() => {
    start();
    return clearIntervalRef;
  }, []);

  return {
    seconds, start, pause, reset, isRunning,
  };
}
