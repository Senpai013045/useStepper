import * as React from 'react';
import { useStepper, withStepper } from '../src';
import { render } from '@testing-library/react';
import { Demo } from '../example/index';

const Mock = withStepper(Demo);

describe('Stepper', () => {
  it('should render', () => {
    const { getByText } = render(<Mock />);
    expect(getByText('Step 1')).toBeInTheDocument();
  });
});
