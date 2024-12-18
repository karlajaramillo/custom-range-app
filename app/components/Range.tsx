'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import styles from './Range.module.css';

interface RangeProps {
  min?: number;
  max?: number;
  values?: number[];
  width?: string;
  step?: number;
  onChange: (minValue: number, maxValue: number) => void;
}

const Range: React.FC<RangeProps> = ({
  min,
  max,
  values,
  width,
  step = 1,
  onChange,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [minValue, setMinValue] = useState(min || values?.[0] || 0);
  const [maxValue, setMaxValue] = useState(
    max || values?.[values.length - 1] || 100
  );
  const [dragging, setDragging] = useState<'min' | 'max' | null>(null);

  // Helper to calculate handles position
  const handlePosition = useMemo(() => {
    const calculatePosition = (value: number) => {
      // normal range
      if (min !== undefined && max !== undefined) {
        const test = ((value - min) / (max - min)) * 100;
        return ((value - min) / (max - min)) * 100;
      }
      // fixed range
      if (values) {
        const index = values.indexOf(value);
        return (index / (values.length - 1)) * 100;
      }
      return 0;
    };
    return {
      minPosition: calculatePosition(minValue),
      maxPosition: calculatePosition(maxValue),
    };
  }, [min, max, values, minValue, maxValue]);

  // Handle dragging
  const handleSliderPosition = useCallback(
    (clientX: number, type: 'min' | 'max') => {
      //get event position to calculate the current value
      const sliderBoundingClientRect =
        sliderRef.current?.getBoundingClientRect();
      if (!sliderBoundingClientRect) return;

      // calculate total width of slider
      const totalWidth = sliderBoundingClientRect.width;

      let posX = clientX - sliderBoundingClientRect.left; // Drag position relative to slider start

      //If posX exceeds the slider width (totalWidth), it is "clamped" to totalWidth.
      posX = Math.min(posX, totalWidth); //posX not exceed totalWidth
      // If posX is negative (e.g., dragged too far left), it is "clamped" to 0.
      posX = Math.max(0, posX); // posX does not go below 0

      let selectedValue;

      if (values) {
        // Handle fixed values range
        const index = Math.round((posX / totalWidth) * (values.length - 1));
        const clampedIndex = Math.max(0, Math.min(index, values.length - 1)); // Ensure index is within bounds
        selectedValue = values[clampedIndex];
      } else if (min !== undefined && max !== undefined) {
        // Handle normal range
        selectedValue = Math.round((posX / totalWidth) * (max - min) + min);

        selectedValue = Math.min(max, selectedValue);
        selectedValue = Math.max(min, selectedValue);
      } else {
        return; // Fallback if neither range type is defined
      }

      // Update state based on handle type
      if (type === 'min') {
        // Ensure minValue does not exceed maxValue
        if (selectedValue >= maxValue) {
          if (values) {
            // get values less than maxValue, and retrieves the last one
            selectedValue =
              values.filter((value) => value < maxValue).pop() || minValue;
          } else {
            selectedValue = maxValue - step;
          }
        }
        setMinValue(selectedValue);
      } else if (type === 'max') {
        // Ensure maxValue does not go below minValue
        if (selectedValue <= minValue) {
          if (values) {
            // get values greather than minValue, and retrieves the fist one
            selectedValue =
              values.filter((value) => value > minValue).shift() || maxValue;
          } else {
            selectedValue = minValue + step;
          }
        }
        setMaxValue(selectedValue);
      }
    },
    [min, max, values, maxValue, minValue]
  );

  //Handle event
  const handleEvent = useCallback(
    (e: MouseEvent | TouchEvent, type: 'min' | 'max') => {
      if (e instanceof TouchEvent) {
        handleSliderPosition(e.touches[0].clientX, type);
      } else if (e instanceof MouseEvent) {
        handleSliderPosition(e.clientX, type);
      }
    },
    [handleSliderPosition]
  );

  // Mouse events
  const handleMouseDown = useCallback((type: 'min' | 'max') => {
    setDragging(type);
    document.body.style.cursor = 'grabbing';
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (dragging) {
        handleEvent(e, dragging);
      }
    },
    [dragging, handleEvent]
  );

  const handleMouseUp = useCallback(() => {
    if (dragging) {
      setDragging(null);
      document.body.style.cursor = '';
    }
    onChange(minValue, maxValue);
  }, [dragging, minValue, maxValue, onChange]);

  // Touch events
  const handleTouchStart = useCallback((type: 'min' | 'max') => {
    setDragging(type);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (dragging) {
        e.preventDefault();
        handleEvent(e, dragging);
      }
    },
    [dragging, handleEvent]
  );

  const handleTouchEnd = useCallback(() => {
    setDragging(null);
    onChange(minValue, maxValue);
  }, [minValue, maxValue, onChange]);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [dragging, minValue, maxValue]);

  return (
    <div
      data-testid="range-wrapper"
      className={styles.rangeWrapper}
      style={{ width: width ? `${width}px` : '100%' }}
    >
      <div className={styles.rangeLabels}>
        <div data-testid="min-value-label" className={styles.minValue}>
          {values ? minValue.toFixed(2) : minValue} €
        </div>
        <div data-testid="max-value-label" className={styles.maxValue}>
          {values ? maxValue.toFixed(2) : maxValue} €
        </div>
      </div>
      <div className={styles.rangeContainer}>
        <div
          ref={sliderRef}
          className={styles.rangeLine}
          tabIndex={0}
          aria-valuemax={max}
          aria-valuemin={min}
          role="slider"
        >
          <div
            className={styles.rangeTrack}
            style={{
              left: `${handlePosition.minPosition}%`,
              width: `${
                handlePosition.maxPosition - handlePosition.minPosition
              }%`,
            }}
          />
          <div
            data-testid="min-handle-value"
            className={`${styles.rangeHandle} ${styles.minHandle} ${
              dragging ? styles.dragging : 'grab'
            }`}
            style={{
              left: `${handlePosition.minPosition}%`,
            }}
            onMouseDown={() => handleMouseDown('min')}
            onTouchStart={() => handleTouchStart('min')}
          />
          <div
            data-testid="max-handle-value"
            className={`${styles.rangeHandle} ${
              dragging ? styles.dragging : 'grab'
            }`}
            style={{
              left: `${handlePosition.maxPosition}%`,
            }}
            onMouseDown={() => handleMouseDown('max')}
            onTouchStart={() => handleTouchStart('max')}
          />
        </div>
      </div>
    </div>
  );
};

export default Range;
