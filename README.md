# useStepper

useStepper is a react package meant for assisting the creation of stepper forms/components

## Demo

I will update playable demo once the package goes live. [See demo](https://parceljs.org) `/example`.

```ts
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

ReactDOM.render(<App />, document.getElementById('root'));
```
