import { useState, useCallback, useEffect } from 'react';

export const useCollatzSequence = (initialNumber: number = 27) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startNumber, setStartNumber] = useState(initialNumber);

  const generateSequence = useCallback((start: number): number[] => {
    const seq: number[] = [start];
    let current: number = start;
    while (current !== 1) {
      current = current % 2 === 0 ? current / 2 : current * 3 + 1;
      seq.push(current);
    }
    return seq;
  }, []);

  const startAnimation = useCallback((): void => {
    setIsAnimating(true);
    setCurrentIndex(0);
    const newSeq = generateSequence(startNumber);
    setSequence(newSeq);
  }, [startNumber, generateSequence]);

  useEffect(() => {
    if (isAnimating && currentIndex < sequence.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    } else if (currentIndex === sequence.length - 1) {
      setIsAnimating(false);
    }
  }, [isAnimating, currentIndex, sequence]);

  const handleNumberChange = useCallback((value: number): void => {
    setStartNumber(value);
  }, []);

  return {
    sequence,
    currentIndex,
    isAnimating,
    startNumber,
    handleNumberChange,
    startAnimation
  };
};