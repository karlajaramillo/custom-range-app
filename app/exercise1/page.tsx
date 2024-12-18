'use client';
import React, { useEffect, useState } from 'react';
import Range from '@/app/components/Range';
import { getNormalRangeLimits } from 'services/rangeService';

const RangeSliderPage = () => {
  const [range, setRange] = useState<{ min: number; max: number } | null>(null);
  const [minValue, setMinValue] = useState<number>();
  const [maxValue, setMaxValue] = useState<number>();

  useEffect(() => {
    const getRange = async () => {
      const data = await getNormalRangeLimits();
      setRange(data);
      setMinValue(data.min);
      setMaxValue(data.max);
    };

    getRange();
  }, []);

  const handleRangeChange = (minValue: number, maxValue: number) => {
    setMinValue(minValue);
    setMaxValue(maxValue);
  };

  return (
    <div className="container">
      {range && (
        <>
          <h1>Exercise 1: Normal Range Slider</h1>
          <Range min={range.min} max={range.max} onChange={handleRangeChange} />
          <div>
            <p className="text">
              Selected Normal Range: {minValue} € - {maxValue} €
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default RangeSliderPage;
