import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStepper, withStepper } from '../.';

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

export const Demo = () => {
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

ReactDOM.render(<App />, document.getElementById('root'));
