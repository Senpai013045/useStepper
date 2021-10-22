import * as React from 'react';
import { render } from '@testing-library/react';
import { useStepper, withStepper } from '../src';
import '@testing-library/jest-dom';

const StepOne = () => {
  return (
    <div>
      <p>Step One</p>
    </div>
  );
};

const StepTwo = () => {
  return (
    <div>
      <p>Step Two</p>
    </div>
  );
};

const StepThree = () => {
  return (
    <div>
      <p>Step Three</p>
    </div>
  );
};

const Demo = () => {
  const {
    handlePrevious,
    handleNext,
    body,
    currentStep,
    isFirstStep,
    isLastStep,
  } = useStepper({
    totalNumberOfSteps: 3,
    onStepsComplete: () => alert('All steps completed!'),
    onBack: () => alert('Back!'),
    bodyComponents: [<StepOne />, <StepTwo />, <StepThree />],
  });
  return (
    <div>
      <h1>Step {currentStep}</h1>
      {body}
      <button onClick={handlePrevious}>
        {isFirstStep ? 'Go Back' : 'Previous Step'}
      </button>
      <button onClick={handleNext}>
        {' '}
        {isLastStep ? 'Finish' : 'Next Step'}
      </button>
    </div>
  );
};

const App = withStepper(Demo);

describe('Stepper', () => {
  it('Initial should be Step 1', () => {
    const { getByText } = render(<App />);
    expect(getByText('Step 1')).toBeInTheDocument();
  });

  it('Should be Step 2 when Next Step button is clicked', () => {
    const { getByText, getByRole } = render(<App />);
    getByRole('button', { name: 'Next Step' }).click();
    expect(getByText('Step 2')).toBeInTheDocument();
  });

  it('Should revert back to Step one when it is incremented and decremented', () => {
    const { getByText, getByRole } = render(<App />);
    getByRole('button', { name: 'Next Step' }).click();
    getByRole('button', { name: 'Previous Step' }).click();
    expect(getByText('Step 1')).toBeInTheDocument();
  });
});
