import { useEffect, useState } from 'react';
import { calculateTimeLeft } from '../utils/helper';

const useTimeCountDown = (timestamp: number) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(timestamp));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(timestamp));
    }, 1000);

    return () => clearInterval(timer);
  }, [timestamp]);

  return timeLeft;
};

export default useTimeCountDown;
