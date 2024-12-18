'use client';

import React, { useEffect, useState } from 'react';
import Range from '@/app/components/Range';
import { getFixedRangeValues } from 'services/rangeService';

const Exercise2Page = () => {
  const [values, setValues] = useState<number[]>([]);
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);

  // Fetch fixed range values
  useEffect(() => {
    const fetchValues = async () => {
      const data = await getFixedRangeValues();
      setValues(data);
      if (data.length > 0) {
        setMinValue(data[0]);
        setMaxValue(data[data.length - 1]);
      }
    };

    fetchValues();
  }, []);

  const handleRangeChange = (min: number, max: number) => {
    setMinValue(min);
    setMaxValue(max);
  };

  return (
    <div className="container">
      {values.length > 0 && (
        <>
          <h1>Exercise 2: Fixed Values Range</h1>
          <Range values={values} onChange={handleRangeChange} />
          <div>
            <p className="text">
              Selected Fixed Range: {minValue} € - {maxValue} €
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Exercise2Page;
