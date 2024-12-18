import RangeSliderFixedClient from '@/components/RangeFixedSliderClient';
import { getFixedRangeValues } from 'services/rangeService';

const RangeFixedSliderPage = async () => {
  const values = await getFixedRangeValues();

  return (
    <div className="container">
      <h1>Exercise 2: Fixed Values Range</h1>
      <RangeSliderFixedClient values={values} />
    </div>
  );
};

export default RangeFixedSliderPage;
