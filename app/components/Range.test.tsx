import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Range from './Range';

describe('Range component normal range', () => {
  beforeEach(() => {
    // Mock 'getBoundingClientRect' for slider calculation
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 500, // Adjust this for your slider's width
      left: 0, // Start position of the slider
      right: 500, // End position of the slider
      top: 0,
      bottom: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: function () {
        throw new Error('Function not implemented.');
      },
    });
  });
  it('should render slider wrapper', () => {
    render(<Range min={0} max={100} onChange={() => {}} />);
    const range = screen.getByTestId('range-wrapper');

    expect(range).toBeInTheDocument();
  });
  it('should render slider', () => {
    render(<Range min={0} max={100} onChange={() => {}} />);
    const handles = screen.getAllByRole('slider');
    expect(handles).toHaveLength(1);
  });

  it('should render labels for normal range', () => {
    render(<Range min={0} max={100} onChange={() => {}} />);
    const minLabel = screen.getByTestId('min-value-label');
    const maxLabel = screen.getByTestId('max-value-label');
    expect(minLabel).toBeInTheDocument();
    expect(maxLabel).toBeInTheDocument();

    expect(minLabel).toHaveTextContent('0');
    expect(maxLabel).toHaveTextContent('100');
  });

  it('should render correct value when dragging', async () => {
    render(<Range min={0} max={100} onChange={() => {}} />);
    const minHandle = screen.getByTestId('min-handle-value');
    const minLabel = screen.getByTestId('min-value-label');

    fireEvent.mouseDown(minHandle);
    // Move mouse to new position
    fireEvent.mouseMove(minHandle, { clientX: 250 });
    fireEvent.mouseUp(minHandle);

    // Ensure the component has re-rendered with the new styles
    await waitFor(() => {
      const minHandleStyle = minHandle.getAttribute('style');
      expect(minHandleStyle).toContain('left: 50%');
      expect(minLabel).toHaveTextContent('50');
    });
  });

  it('should prevent the handle from crossing max value when dragging to right', async () => {
    render(<Range min={0} max={100} onChange={() => {}} />);
    const minHandle = screen.getByTestId('min-handle-value');
    const minLabel = screen.getByTestId('min-value-label');

    fireEvent.mouseDown(minHandle, { clientX: 0 }); // starts dragging to the right
    fireEvent.mouseMove(minHandle, { clientX: 700 }); // simulates dragging to the right exceeding max value
    fireEvent.mouseUp(minHandle); // stop dragging

    // Ensure the component has re-rendered with the new styles
    await waitFor(() => {
      const minHandleStyle = minHandle.getAttribute('style');
      expect(minHandleStyle).toContain('left: 99%');
      expect(minLabel).toHaveTextContent('99');
    });
  });
  it('should prevent the handle from crossing min value when dragging to left', async () => {
    render(<Range min={0} max={100} onChange={() => {}} />);
    const maxHandle = screen.getByTestId('max-handle-value');
    const maxLabel = screen.getByTestId('max-value-label');

    fireEvent.mouseDown(maxHandle, { clientX: 500 }); // starts dragging to left
    fireEvent.mouseMove(maxHandle, { clientX: -100 }); // simulate dragging to left exceeding min value
    fireEvent.mouseUp(maxHandle); // stop dragging

    // Ensure the component has re-rendered with the new styles
    await waitFor(() => {
      const minHandleStyle = maxHandle.getAttribute('style');
      expect(minHandleStyle).toContain('left: 1%');
      expect(maxLabel).toHaveTextContent('1');
    });
  });
});

describe('Range component fixed values range', () => {
  const fixedValues = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];

  beforeEach(() => {
    // Mock 'getBoundingClientRect' for slider calculation
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 500, // Adjust this for your slider's width
      left: 0, // Start position of the slider
      right: 500, // End position of the slider
      top: 0,
      bottom: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    });
  });
  it('should render slider wrapper', () => {
    render(<Range values={fixedValues} onChange={() => {}} />);
    const range = screen.getByTestId('range-wrapper');
    expect(range).toBeInTheDocument();
  });
  it('should render slider', () => {
    render(<Range values={fixedValues} onChange={() => {}} />);
    const handles = screen.getAllByRole('slider');
    expect(handles).toHaveLength(1);
  });

  it('should render labels for fixed range', () => {
    render(<Range values={fixedValues} onChange={() => {}} />);
    const minLabel = screen.getByTestId('min-value-label');
    const maxLabel = screen.getByTestId('max-value-label');
    expect(minLabel).toBeInTheDocument();
    expect(maxLabel).toBeInTheDocument();

    expect(minLabel).toHaveTextContent('1.99');
    expect(maxLabel).toHaveTextContent('70.99');
  });

  it('should render correct fixed value when dragging', async () => {
    render(<Range values={fixedValues} onChange={() => {}} />);
    const minHandle = screen.getByTestId('min-handle-value');
    const minLabel = screen.getByTestId('min-value-label');

    fireEvent.mouseDown(minHandle);
    // Move mouse to new position
    fireEvent.mouseMove(minHandle, { clientX: 200 });
    fireEvent.mouseUp(minHandle);

    // Ensure the component has re-rendered with the new styles
    await waitFor(() => {
      const minHandleStyle = minHandle.getAttribute('style');
      expect(minHandleStyle).toContain('left: 40%');
      expect(minLabel).toHaveTextContent('10.99');
    });
  });

  it('should prevent the handle from crossing max fixed value when dragging to right', async () => {
    render(<Range values={fixedValues} onChange={() => {}} />);
    const minHandle = screen.getByTestId('min-handle-value');
    const minLabel = screen.getByTestId('min-value-label');

    fireEvent.mouseDown(minHandle, { clientX: 0 }); // starts dragging to right
    fireEvent.mouseMove(minHandle, { clientX: 1000 }); // simulates dragging to right exceeding max value
    fireEvent.mouseUp(minHandle); // stop dragging

    // Ensure the component has re-rendered with the new styles
    await waitFor(() => {
      const minHandleStyle = minHandle.getAttribute('style');
      expect(minHandleStyle).toContain('left: 80%');
      expect(minLabel).toHaveTextContent('50.99');
    });
  });

  it('should prevent the handle from crossing mininum fixed value when dragging to left', async () => {
    render(<Range values={fixedValues} onChange={() => {}} />);
    const maxHandle = screen.getByTestId('max-handle-value');
    const maxLabel = screen.getByTestId('max-value-label');

    fireEvent.mouseDown(maxHandle, { clientX: 500 }); // starts dragging to left
    fireEvent.mouseMove(maxHandle, { clientX: 0 }); // simulates dragging to left
    fireEvent.mouseUp(maxHandle); // stop dragging

    // Ensure the component has re-rendered with the new styles
    await waitFor(() => {
      const maxHandleStyle = maxHandle.getAttribute('style');
      expect(maxHandleStyle).toContain('left: 20%');
      expect(maxLabel).toHaveTextContent('5.99');
    });
  });
});
