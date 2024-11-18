/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';

export const useOtpTimer = (initialTime: number = 30) => {
  const [startTimer, setStartTimer] = useState({
    start: false, // Change to false initially to control when to start
    time: initialTime,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (startTimer.start && startTimer.time > 0) {
      timer = setInterval(() => {
        setStartTimer((prev) => ({ start: true, time: prev.time - 1 }));
      }, 1000);
    } else if (startTimer.time === 0) {
      setStartTimer(() => ({ start: false, time: initialTime }));
    }

    // Cleanup interval on component unmount or when timer stops
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [startTimer.start, startTimer.time, initialTime]);

  const resetTimer = () => {
    setStartTimer({ start: true, time: initialTime });
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return minutes > 0
      ? `${minutes} min ${seconds} seconds`
      : `${seconds} seconds`;
  };

  const formattedTime = formatTime(startTimer.time);

  return { startTimer, resetTimer, formattedTime };
};
