# useStepper

useStepper is a react package meant for assisting the creation of stepper forms/components

## Demo

[See demo](https://codesandbox.io/s/react-usestepper-demo-95s0w?file=/src/index.tsx) `or take a look at basic example in /example`.

### Usage

First you need to wrap you component with `withStepper` . You can now use `useStepper` inside that component or any that nests inside it. Calling `useStepper` only requires you to provide `{ totalNumberOfSteps:number }` at least. You can destructure out `isFirstStep,isLastStep,currentStep,handleNext,handlePrevious,navigateStep,handleReset and body` from `useStepper` . Though keep in mind that you need to pass `bodyComponents` which should be an array of Components. The `body` always refers to current active Component and you may render it as needed.`

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
