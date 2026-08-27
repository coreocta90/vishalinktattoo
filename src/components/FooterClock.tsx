import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const FooterClock: React.FC = () => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formatted = new Intl.DateTimeFormat('en-IN', options).format(now);
      setTimeString(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-white/5 border border-[#D4AF37]/30 rounded-full font-mono text-xs text-[#D4AF37]">
      <Clock size={14} className="animate-spin text-[#D4AF37]" style={{ animationDuration: '10s' }} />
      <span>DHANBAD, INDIA — {timeString || '16:07:00'} IST</span>
    </div>
  );
};
