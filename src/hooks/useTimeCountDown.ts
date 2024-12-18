import { useCallback, useEffect, useState } from 'react';

const useTimeCountDown = (expiredTime: number) => {
  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const difference = expiredTime - now;

    if (difference <= 0) {
      return null; // Time has expired
    }

    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      ),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };

    return timeLeft;
  }, [expiredTime]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [calculateTimeLeft]);

  return timeLeft;
};

export default useTimeCountDown;
