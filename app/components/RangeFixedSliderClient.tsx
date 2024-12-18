'use client';

import React, { useState } from 'react';
import Range from '@/app/components/Range';

const RangeSliderFixedClient = ({ values }: { values: number[] }) => {
  const [minValue, setMinValue] = useState(values[0]);
  const [maxValue, setMaxValue] = useState(values[values.length - 1]);

  const handleRangeChange = (min: number, max: number) => {
    setMinValue(min);
    setMaxValue(max);
  };

  return (
    <>
      {values.length > 0 && (
        <>
          <Range values={values} onChange={handleRangeChange} />
          <div>
            <p className="text">
              Selected Fixed Range hello: {minValue} € - {maxValue} €
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default RangeSliderFixedClient;
