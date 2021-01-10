import { useState, useEffect, useRef } from 'react';

export default function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const intervalRef = useRef(0);

  function clearIntervalRef() {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
  }

  function start() {
    if (intervalRef.current === 0) {
      setIsRunning(true);
      intervalRef.current = window.setInterval(() => setSeconds((s) => (s + 1)), 1000);
    }
  }

  function pause() {
    setIsRunning(false);
    clearIntervalRef();
  }

  function reset() {
    clearIntervalRef();
    setSeconds(0);
  }

  useEffect(() => {
    start();
    return clearIntervalRef;
  }, []);

  return {
    seconds, start, pause, reset, isRunning,
  };
}
