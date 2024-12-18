import RangeSliderClient from '@/components/RangeSliderClient';
import { getNormalRangeLimits } from 'services/rangeService';

const RangeSliderPage = async () => {
  const range = await getNormalRangeLimits();

  return (
    <div className="container">
      <h1>Exercise 1: Normal Range Slider</h1>
      <RangeSliderClient range={range} />
    </div>
  );
};

export default RangeSliderPage;
