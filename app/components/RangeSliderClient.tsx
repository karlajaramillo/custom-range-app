'use client';
import React, { useState } from 'react';
import Range from '@/app/components/Range';

type Range = {
  min: number;
  max: number;
};

const RangeSliderClient = ({ range }: { range: Range }) => {
  const [minValue, setMinValue] = useState<number>(range.min);
  const [maxValue, setMaxValue] = useState<number>(range.max);

  const handleRangeChange = (minValue: number, maxValue: number) => {
    setMinValue(minValue);
    setMaxValue(maxValue);
  };

  return (
    <>
      <Range min={range.min} max={range.max} onChange={handleRangeChange} />
      <div>
        <p className="text">
          Selected Normal Range: {minValue} € - {maxValue} €
        </p>
      </div>
    </>
  );
};

export default RangeSliderClient;
