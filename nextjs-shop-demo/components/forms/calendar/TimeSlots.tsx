import type { Dispatch, FC } from 'react';
import React from 'react';

import TimeSlot from './TimeSlot';

interface TimeSlotsProps {
  timeSlots: Array<{
    time: string;
    isSelected?: boolean | undefined;
    isDisabled?: boolean | undefined;
  }>;
  currentTime: string;
  setTime: Dispatch<React.SetStateAction<string>>;
}

/**
 * TimeSlots
 * @param timeSlots
 * @param currentTime
 * @param setTime
 *
 * @returns TimeSlots
 */
const TimeSlots: FC<TimeSlotsProps> = ({ timeSlots, currentTime, setTime }) => {
  return (
    <div className="mx-auto mb-5 grid max-w-[320px] grid-cols-4 grid-rows-4 gap-2.5 rounded-3xl bg-white text-base font-bold tracking-wide text-orange-500">
      {timeSlots.map((slot, index) => (
        <TimeSlot
          key={index}
          slot={slot}
          currentTime={currentTime}
          setTime={setTime}
        />
      ))}
    </div>
  );
};

export default TimeSlots;
