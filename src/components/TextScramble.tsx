import React, { useEffect, useState, useRef } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
}

const CHARS = '!@#$%^&*()_+~:{}[]<>?/';

export const TextScramble: React.FC<TextScrambleProps> = ({ text, className = '' }) => {
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasRun.current) {
          hasRun.current = true;
          let iteration = 0;
          const maxIterations = text.length * 3;

          const interval = setInterval(() => {
            setDisplayText(
              text
                .split('')
                .map((char, index) => {
                  if (char === ' ') return ' ';
                  if (index < iteration / 3) {
                    return text[index];
                  }
                  return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
                .join('')
            );

            iteration += 1;
            if (iteration >= maxIterations) {
              setDisplayText(text);
              clearInterval(interval);
            }
          }, 30);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [text]);

  return (
    <span ref={elementRef} className={`font-mono ${className}`}>
      {displayText}
    </span>
  );
};
