import React, { useEffect, useState } from 'react';

export const LiveStudioStatus: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      // Open between 11 AM (11) and 9 PM (21)
      if (hour >= 11 && hour < 21) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold tracking-wider">
      {isOpen ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-emerald-400 font-bold uppercase tracking-widest text-[10px]">
            STUDIO OPEN NOW
          </span>
        </>
      ) : (
        <>
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="text-amber-400 font-bold uppercase tracking-widest text-[10px]">
            CLOSED — OPENS 11 AM
          </span>
        </>
      )}
    </div>
  );
};
